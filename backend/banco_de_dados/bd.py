import mysql.connector
from functools import wraps
from banco_de_dados._login_banco_de_dados import usuario, senha

class Conexao:
    banco_de_dados = {
        "host": "localhost",
        "user": usuario,
        "password": senha,
        "database": "defaultdb",
        "port": "3306"
    }

    @staticmethod
    def consultar(func):
        from functools import wraps
        @wraps(func)
        def criar_consulta(*args, **kwargs):
            with mysql.connector.connect(**Conexao.banco_de_dados) as acessar_banco:
                consulta = acessar_banco.cursor()
                resultado = func(consulta, *args, **kwargs)
                consulta.close()
                acessar_banco.commit()
                return resultado
        return criar_consulta
