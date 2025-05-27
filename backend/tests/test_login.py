
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_login_valido():
    client.post("/cadastro", json={
        "usuario_aluno": "login@teste.com",
        "senha_aluno": "senha123"
    })
    response = client.post("/login", json={
        "usuario_aluno": "login@teste.com",
        "senha_aluno": "senha123"
    })
    assert response.status_code == 200
    assert "idAluno" in response.json()

def test_login_email_invalido():
    response = client.post("/login", json={
        "usuario_aluno": "naoexiste@teste.com",
        "senha_aluno": "senha123"
    })
    assert response.status_code == 401

def test_login_senha_invalida():
    client.post("/cadastro", json={
        "usuario_aluno": "senhaerrada@teste.com",
        "senha_aluno": "correta123"
    })
    response = client.post("/login", json={
        "usuario_aluno": "senhaerrada@teste.com",
        "senha_aluno": "errada123"
    })
    assert response.status_code == 401
