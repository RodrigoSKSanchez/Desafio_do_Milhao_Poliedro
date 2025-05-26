
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
