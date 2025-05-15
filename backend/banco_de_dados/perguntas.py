from banco_de_dados.bd import Conexao

class Perguntas:
    def __init__(self):
        pass

    @Conexao.consultar
    def obter_perguntas(self, consulta):
        return "teste"