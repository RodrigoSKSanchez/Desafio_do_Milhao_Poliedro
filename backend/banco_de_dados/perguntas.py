
from banco_de_dados.bd import Conexao
import random

class Perguntas:
    def __init__(self):
        pass

    @staticmethod
    @Conexao.consultar
    def buscar_pergunta_por_ano(cursor, ano, excluidos=None):
        if excluidos:
            placeholders = ",".join(["%s"] * len(excluidos))
            query = f"""
                SELECT idPergunta, texto_enunciado, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA
                FROM Pergunta
                WHERE ano = %s AND idPergunta NOT IN ({placeholders})
                ORDER BY RAND()
                LIMIT 1
            """
            params = [ano] + excluidos
            cursor.execute(query, tuple(params))
        else:
            cursor.execute(
                "SELECT idPergunta, texto_enunciado, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA FROM Pergunta WHERE ano = %s ORDER BY RAND() LIMIT 1",
                (ano,)
            )

        pergunta = cursor.fetchone()
        if not pergunta:
            return None

        alternativas = [
            {"letra": "A", "texto": pergunta["alternativa_A"], "correta": False},
            {"letra": "B", "texto": pergunta["alternativa_B"], "correta": False},
            {"letra": "C", "texto": pergunta["alternativa_C"], "correta": False},
            {"letra": "D", "texto": pergunta["alternativa_CORRETA"], "correta": True}
        ]
        random.shuffle(alternativas)

        return {
            "id": pergunta["idPergunta"],
            "enunciado": pergunta["texto_enunciado"],
            "dica": pergunta["dica"],
            "alternativas": alternativas
        }


    @staticmethod
    @Conexao.consultar
    def buscar_todas_perguntas(cursor):
        cursor.execute("""
            SELECT idPergunta, texto_enunciado, ano, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA
            FROM Pergunta
            ORDER BY idPergunta DESC
        """)
        return cursor.fetchall()


    @staticmethod
    @Conexao.consultar
    def deletar_pergunta(cursor, idPergunta: int):
        cursor.execute("DELETE FROM Pergunta WHERE idPergunta = %s", (idPergunta,))


    @staticmethod
    @Conexao.consultar
    def criar_pergunta(cursor, texto_enunciado, ano, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA):
        if not all([texto_enunciado, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA]):
            raise ValueError("Todos os campos devem ser preenchidos.")
        if not (8 <= ano <= 12):
            raise ValueError("Ano deve estar entre 8 e 12.")
        cursor.execute("""
            INSERT INTO Pergunta (texto_enunciado, ano, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (texto_enunciado, ano, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA))
