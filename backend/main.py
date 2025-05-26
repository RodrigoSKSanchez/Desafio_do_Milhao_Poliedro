
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from banco_de_dados.bd import Conexao
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Adiciona o middleware de CORS
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
        return {"mensagem": "Login realizado com sucesso!"}
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



class HistoricoRequest(BaseModel):
    idAluno: int
    numero_acertos: int
    total_perguntas: int
    dinheiro_ganho: int

@app.post("/registrar_historico")
def registrar_historico(h: HistoricoRequest):
    try:
        conexao = Conexao()
        conexao.conectar()
        cursor = conexao.cursor

        cursor.execute("""
            INSERT INTO Historico (idAluno, numero_acertos, total_perguntas, dinheiro_ganho)
            VALUES (%s, %s, %s, %s)
        """, (h.idAluno, h.numero_acertos, h.total_perguntas, h.dinheiro_ganho))

        cursor.execute("""
            UPDATE Aluno SET dinheiro = dinheiro + %s WHERE idAluno = %s
        """, (h.dinheiro_ganho, h.idAluno))

        conexao.conexao.commit()
        conexao.desconectar()
        return {"mensagem": "Histórico registrado com sucesso."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
