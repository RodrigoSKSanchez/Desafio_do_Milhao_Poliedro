
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from banco_de_dados.bd import Conexao

app = FastAPI()

class AlunoCadastro(BaseModel):
    usuario_aluno: str
    senha_aluno: str

class AlunoLogin(BaseModel):
    usuario_aluno: str
    senha_aluno: str

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
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
