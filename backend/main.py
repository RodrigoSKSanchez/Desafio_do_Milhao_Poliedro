from fastapi import FastAPI
from banco_de_dados.perguntas import Perguntas

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/perguntas")
async def obter_perguntas():
    perguntas = Perguntas()
    return perguntas.obter_perguntas()