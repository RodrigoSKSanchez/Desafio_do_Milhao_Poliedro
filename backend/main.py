from fastapi import FastAPI, HTTPException, Query
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
    
    # Se vier como dicionário:
    if isinstance(resultado, dict):
        return {
            "email": resultado.get("usuario_aluno"),
            "dinheiro": resultado.get("dinhero", 0),
            "acertos": resultado.get("acertos", 0),
            "total": resultado.get("total", 0)
        }

    # Se vier como tupla:
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
    tipo: str  # 'dica', 'pula' ou 'elimina'

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
        UPDATE Aluno
        SET dinhero = dinhero - %s, {tipo} = {tipo} + 1
        WHERE idAluno = %s
    """, (preco, idAluno))

@app.post("/comprar_powerup")
def comprar_powerup(compra: Compra):
    processar_compra(compra.idAluno, compra.tipo)
    return {"mensagem": f"{compra.tipo} comprado com sucesso"}


@Conexao.consultar
def obter_perfil(cursor, idAluno: int):
    cursor.execute("""
        SELECT usuario_aluno, dinhero, (
            SELECT SUM(numero_acertos) FROM Historico WHERE idAluno = %s
        ) as acertos, (
            SELECT SUM(total_perguntas) FROM Historico WHERE idAluno = %s
        ) as total
        FROM Aluno
        WHERE idAluno = %s
    """, (idAluno, idAluno, idAluno))
    return cursor.fetchone()
