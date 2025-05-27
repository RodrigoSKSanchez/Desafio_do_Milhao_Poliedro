import mysql.connector
from functools import wraps
from banco_de_dados._login_banco_de_dados import usuario, senha

class Conexao:
    banco_de_dados = {
        "host": "localhost",
        "user": usuario,
        "password": senha,
        "database": "poliedro",
        "port": "3306"
    }

    @staticmethod
    def consultar(func):
        @wraps(func)
        def criar_consulta(*args, **kwargs):
            with mysql.connector.connect(**Conexao.banco_de_dados) as acessar_banco:
                consulta = acessar_banco.cursor(dictionary=True)
                resultado = func(consulta, *args, **kwargs)
                consulta.close()
                acessar_banco.commit()
                return resultado
        return criar_consulta

    @staticmethod
    def inserir_historico(id_aluno, numero_acertos, total_perguntas, dinheiro_ganho):
        with mysql.connector.connect(**Conexao.banco_de_dados) as conexao:
            with conexao.cursor() as cursor:
                # Inserir no histórico
                query = """
                    INSERT INTO Historico (idAluno, numero_acertos, total_perguntas, dinheiro_ganho)
                    VALUES (%s, %s, %s, %s)
                """
                valores = (id_aluno, numero_acertos, total_perguntas, dinheiro_ganho)
                cursor.execute(query, valores)

                # Atualizar o dinheiro do aluno
                cursor.execute(
                    "UPDATE Aluno SET dinhero = dinhero + %s WHERE idAluno = %s",
                    (dinheiro_ganho, id_aluno)
                )

                conexao.commit()