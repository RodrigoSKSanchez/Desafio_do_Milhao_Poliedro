
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_cadastro_usuario_valido():
    response = client.post("/cadastro", json={
        "usuario_aluno": "teste@exemplo.com",
        "senha_aluno": "senha123"
    })
    assert response.status_code == 200 or response.status_code == 201
    assert "idAluno" in response.json()

def test_cadastro_usuario_email_duplicado():
    client.post("/cadastro", json={
        "usuario_aluno": "duplicado@exemplo.com",
        "senha_aluno": "senha123"
    })
    response = client.post("/cadastro", json={
        "usuario_aluno": "duplicado@exemplo.com",
        "senha_aluno": "senha456"
    })
    assert response.status_code == 400
    assert "já existe" in response.text
