from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Dict
import uuid

router = APIRouter()

usuarios_db: Dict[str, dict] = {}

class Usuario(BaseModel):
    nome: str
    email: EmailStr
    senha: str

class Login(BaseModel):
    email: EmailStr
    senha: str

@router.post("/usuarios", status_code=201)
def cadastrar_usuario(usuario: Usuario):
    if usuario.email in usuarios_db:
        raise HTTPException(status_code=400, detail="E-mail já cadastrado")
    user_id = str(uuid.uuid4())
    usuarios_db[usuario.email] = {**usuario.dict(), "id": user_id}
    return {"id": user_id}

@router.post("/login")
def login(dados: Login):
    usuario = usuarios_db.get(dados.email)
    if not usuario or usuario["senha"] != dados.senha:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    return {"token": "fake-token"}
