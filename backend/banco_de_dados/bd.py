import mysql.connector
from functools import wraps
from banco_de_dados._login_banco_de_dados import usuario, senha

class Conexao:
    banco_de_dados = {
        "host": "localhost",
        "user": usuario,
        "password": senha,
        "database": "defaultdb",
        "port": "3306",
    }

    def consultar(func):
        """Todas as funções que utilizam uma conexão com o banco de dados devem ter essa função como decorator.
        @consultar é responsável por abrir e fechar uma conexão com o banco de dados."""
        @wraps(func)
        def criar_consulta(self, *args):        
            with mysql.connector.connect(**Conexao.banco_de_dados) as acessar_banco:
                consulta = acessar_banco.cursor()
                if len(args) == 0:
                    resultado = func(self, consulta)   
                else:
                    resultado = func(self, consulta, args)
                consulta.close()
                acessar_banco.commit()
                return resultado
        return criar_consulta