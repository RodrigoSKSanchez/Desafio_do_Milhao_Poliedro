from fastapi import FastAPI, HTTPException, Request, HTTPException, Query
from pydantic import BaseModel
from banco_de_dados.bd import Conexao
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AlunoCadastro(BaseModel):
    usuario_aluno: str
    senha_aluno: str

class AlunoLogin(BaseModel):
    usuario_aluno: str
    senha_aluno: str

class TrocarSenha(BaseModel):
    usuario_aluno: str
    senha_atual: str
    nova_senha: str

@Conexao.consultar
def inserir_aluno(cursor, aluno: AlunoCadastro):
    cursor.execute(
        "INSERT INTO Aluno (usuario_aluno, senha_aluno) VALUES (%s, %s)",
        (aluno.usuario_aluno, aluno.senha_aluno)
    )

@Conexao.consultar
def verificar_login(cursor, aluno: AlunoLogin):
    cursor.execute(
        "SELECT * FROM Aluno WHERE usuario_aluno = %s AND senha_aluno = %s",
        (aluno.usuario_aluno, aluno.senha_aluno)
    )
    return cursor.fetchone()

@Conexao.consultar
def verificar_senha_atual(cursor, usuario: str, senha: str):
    cursor.execute(
        "SELECT * FROM Aluno WHERE usuario_aluno = %s AND senha_aluno = %s",
        (usuario, senha)
    )
    return cursor.fetchone()

@Conexao.consultar
def atualizar_senha(cursor, usuario: str, nova_senha: str):
    cursor.execute(
        "UPDATE Aluno SET senha_aluno = %s WHERE usuario_aluno = %s",
        (nova_senha, usuario)
    )

@app.post("/cadastro")
def cadastrar_aluno(aluno: AlunoCadastro):
    try:
        inserir_aluno(aluno)
        return {"mensagem": "Aluno cadastrado com sucesso!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Erro ao cadastrar: " + str(e))

@app.post("/login")
def login_aluno(aluno: AlunoLogin):
    resultado = verificar_login(aluno)
    if resultado:
        idAluno = resultado["idAluno"] if isinstance(resultado, dict) else resultado[0]
        return {
            "mensagem": "Login realizado com sucesso!",
            "idAluno": idAluno
        }
    else:
        raise HTTPException(status_code=401, detail="Usuário ou senha incorretos.")

@app.post("/trocar_senha")
def trocar_senha(dados: TrocarSenha):
    usuario = dados.usuario_aluno
    senha_atual = dados.senha_atual
    nova_senha = dados.nova_senha

    if not verificar_senha_atual(usuario, senha_atual):
        raise HTTPException(status_code=401, detail="Senha atual incorreta.")

    try:
        atualizar_senha(usuario, nova_senha)
        return {"mensagem": "Senha alterada com sucesso!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Erro ao atualizar senha: " + str(e))

from banco_de_dados.perguntas import Perguntas

@app.get("/pergunta")
def obter_pergunta(ano: int, excluidos: str = Query("", alias="excluidos")):
    ids_excluidos = [int(i) for i in excluidos.split(",") if i.strip().isdigit()] if excluidos else []
    pergunta = Perguntas.buscar_pergunta_por_ano(ano, ids_excluidos if ids_excluidos else None)
    if not pergunta:
        raise HTTPException(status_code=404, detail="Nenhuma pergunta encontrada para o ano especificado.")
    return pergunta

# Histórico de jogo
class HistoricoEntrada(BaseModel):
    idAluno: int
    numero_acertos: int
    total_perguntas: int
    dinheiro_ganho: int

@app.post("/registrar_historico")
def registrar_historico(dados: HistoricoEntrada):
    try:
        Conexao.inserir_historico(
            dados.idAluno,
            dados.numero_acertos,
            dados.total_perguntas,
            dados.dinheiro_ganho
        )
        return {"mensagem": "Histórico registrado com sucesso"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class RequisicaoPerfil(BaseModel):
    idAluno: int

@app.get("/perfil_aluno")
def rota_perfil_aluno(idAluno: int):
    resultado = obter_perfil(idAluno)
    if not resultado:
        raise HTTPException(status_code=404, detail="Aluno não encontrado.")
    
    if isinstance(resultado, dict):
        return {
        "email": resultado.get("usuario_aluno"),
        "dinheiro": resultado.get("dinhero", 0),
        "acertos": resultado.get("acertos", 0),
        "total": resultado.get("total", 0),
        "dica": resultado.get("dica", 0),
        "pula": resultado.get("pula", 0),
        "elimina": resultado.get("elimina", 0)
    }

    return {
        "email": resultado[0],
        "dinheiro": resultado[1] or 0,
        "acertos": resultado[2] or 0,
        "total": resultado[3] or 0
    }

@Conexao.consultar
def obter_historico(cursor, idAluno: int):
    cursor.execute(
        "SELECT numero_acertos, total_perguntas, dinheiro_ganho FROM Historico WHERE idAluno = %s ORDER BY idHistorico DESC LIMIT 10",
        (idAluno,)
    )
    return cursor.fetchall()

@app.get("/historico_aluno")
def rota_historico_aluno(idAluno: int):
    return obter_historico(idAluno)

class Compra(BaseModel):
    idAluno: int
    tipo: str

@Conexao.consultar
def processar_compra(cursor, idAluno: int, tipo: str):
    precos = {
        "dica": 20000,
        "elimina": 50000,
        "pula": 80000
    }

    if tipo not in precos:
        raise HTTPException(status_code=400, detail="Tipo de power-up inválido")

    preco = precos[tipo]
    cursor.execute("SELECT dinhero FROM Aluno WHERE idAluno = %s", (idAluno,))
    resultado = cursor.fetchone()

    if not resultado:
        raise HTTPException(status_code=404, detail="Aluno não encontrado")

    dinhero_atual = resultado["dinhero"]
    if dinhero_atual < preco:
        raise HTTPException(status_code=400, detail="Saldo insuficiente")

    cursor.execute(f"""
        UPDATE Aluno SET dinhero = dinhero - %s, {tipo} = {tipo} + 1 WHERE idAluno = %s
    """, (preco, idAluno))

@app.post("/comprar_powerup")
def comprar_powerup(compra: Compra):
    processar_compra(compra.idAluno, compra.tipo)
    return {"mensagem": f"{compra.tipo} comprado com sucesso"}

@Conexao.consultar
def obter_perfil(cursor, idAluno: int):
    cursor.execute("""
        SELECT usuario_aluno, dinhero, dica, pula, elimina, (
            SELECT SUM(numero_acertos) FROM Historico WHERE idAluno = %s
        ) as acertos, (
            SELECT SUM(total_perguntas) FROM Historico WHERE idAluno = %s
        ) as total
        FROM Aluno
        WHERE idAluno = %s
    """, (idAluno, idAluno, idAluno))
    return cursor.fetchone()

class UsoPowerup(BaseModel):
    idAluno: int
    tipo: str

@Conexao.consultar
def usar_powerup(cursor, dados: UsoPowerup):
    if dados.tipo not in ["dica", "pula", "elimina"]:
        raise HTTPException(status_code=400, detail="Tipo inválido.")

    coluna = dados.tipo
    cursor.execute(f"SELECT {coluna} FROM Aluno WHERE idAluno = %s", (dados.idAluno,))
    resultado = cursor.fetchone()
    valor = resultado[coluna] if isinstance(resultado, dict) else resultado[0]

    if not resultado or valor <= 0:
        raise HTTPException(status_code=400, detail="Power-up indisponível.")

    cursor.execute(f"UPDATE Aluno SET {coluna} = {coluna} - 1 WHERE idAluno = %s", (dados.idAluno,))

@app.post("/usar_powerup")
def rota_usar_powerup(dados: UsoPowerup):
    usar_powerup(dados)
    return {"mensagem": f"{dados.tipo} usado com sucesso"}

class ProfessorLogin(BaseModel):
    usuario_professor: str
    senha_professor: str

@Conexao.consultar
def verificar_login_professor(cursor, professor: ProfessorLogin):
    cursor.execute(
        "SELECT * FROM Professor WHERE usuario_professor = %s AND senha_professor = %s",
        (professor.usuario_professor, professor.senha_professor)
    )
    return cursor.fetchone()

@app.post("/login_professor")
def login_professor(professor: ProfessorLogin):
    try:
        resultado = verificar_login_professor(professor)
        if resultado:
            return {"mensagem": "Login do professor bem-sucedido", "usuario": professor.usuario_professor}
        else:
            raise HTTPException(status_code=401, detail="Credenciais inválidas")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/perguntas")
def listar_perguntas():
    try:
        return Perguntas.buscar_todas_perguntas()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/perguntas/{idPergunta}")
def deletar_pergunta(idPergunta: int):
    sucesso = Perguntas.deletar_pergunta(idPergunta)
    if sucesso:
        return {"mensagem": "Pergunta deletada com sucesso"}
    else:
        raise HTTPException(status_code=404, detail="Pergunta não encontrada")


@app.post("/perguntas")
def criar_pergunta(pergunta: dict):
    try:
        Perguntas.criar_pergunta(
            pergunta["texto_enunciado"],
            pergunta["ano"],
            pergunta["dica"],
            pergunta["alternativa_A"],
            pergunta["alternativa_B"],
            pergunta["alternativa_C"],
            pergunta["alternativa_CORRETA"]
        )
        return {"mensagem": "Pergunta criada com sucesso"}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception:
        raise HTTPException(status_code=500, detail="Erro ao criar pergunta")


from pydantic import Field

class PerguntaEdicao(BaseModel):
    texto_enunciado: str = Field(..., min_length=1)
    dica: str = Field(..., min_length=1)
    ano: int = Field(..., ge=8, le=12)
    alternativa_A: str = Field(..., min_length=1)
    alternativa_B: str = Field(..., min_length=1)
    alternativa_C: str = Field(..., min_length=1)
    alternativa_CORRETA: str = Field(..., min_length=1)

@Conexao.consultar
def atualizar_pergunta(cursor, idPergunta: int, pergunta: PerguntaEdicao):
    cursor.execute(
        "SELECT 1 FROM Pergunta WHERE idPergunta = %s", (idPergunta,)
    )
    if not cursor.fetchone():
        raise HTTPException(status_code=404, detail="Pergunta não encontrada")

    cursor.execute("""
        UPDATE Pergunta SET
            texto_enunciado = %s,
            dica = %s,
            ano = %s,
            alternativa_A = %s,
            alternativa_B = %s,
            alternativa_C = %s,
            alternativa_CORRETA = %s
        WHERE idPergunta = %s
    """, (
        pergunta.texto_enunciado,
        pergunta.dica,
        pergunta.ano,
        pergunta.alternativa_A,
        pergunta.alternativa_B,
        pergunta.alternativa_C,
        pergunta.alternativa_CORRETA,
        idPergunta
    ))

@app.put("/perguntas/{idPergunta}")
def editar_pergunta(idPergunta: int, pergunta: PerguntaEdicao):
    try:
        atualizar_pergunta(idPergunta, pergunta)
        return {"mensagem": "Pergunta atualizada com sucesso"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro ao atualizar pergunta: " + str(e))
