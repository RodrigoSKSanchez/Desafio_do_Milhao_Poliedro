USE defaultdb ;

DROP TABLE IF EXISTS Pergunta CASCADE ;

CREATE TABLE Pergunta (
  idPergunta INT NOT NULL AUTO_INCREMENT,
  texto_enunciado VARCHAR(700) NOT NULL,
  ano INT NOT NULL,
  dica VARCHAR(700) NOT NULL,
  alternativa_A VARCHAR(700) NOT NULL,
  alternativa_B VARCHAR(700) NOT NULL,
  alternativa_C VARCHAR(700) NOT NULL,
  alternativa_CORRETA VARCHAR(700) NOT NULL,
  PRIMARY KEY (idPergunta))
ENGINE = InnoDB;

INSERT INTO Pergunta (texto_enunciado, ano, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA)
VALUES
  ('(1) Pergunta 8 ano', 8, 'dica (1)', '(1) Alternativa A', '(1) Alternativa B', '(1) Alternativa C', '(1) Alternativa CORRETA'),
  ('(2) Pergunta 8 ano', 8, 'dica (2)', '(2) Alternativa A', '(2) Alternativa B', '(2) Alternativa C', '(2) Alternativa CORRETA'),
  ('(3) Pergunta 8 ano', 8, 'dica (3)', '(3) Alternativa A', '(3) Alternativa B', '(3) Alternativa C', '(3) Alternativa CORRETA'),
  ('(4) Pergunta 8 ano', 8, 'dica (4)', '(4) Alternativa A', '(4) Alternativa B', '(4) Alternativa C', '(4) Alternativa CORRETA'),
  ('(5) Pergunta 8 ano', 8, 'dica (5)', '(5) Alternativa A', '(5) Alternativa B', '(5) Alternativa C', '(5) Alternativa CORRETA'),
  ('(6) Pergunta 8 ano', 8, 'dica (6)', '(6) Alternativa A', '(6) Alternativa B', '(6) Alternativa C', '(6) Alternativa CORRETA'),
  ('(7) Pergunta 8 ano', 8, 'dica (7)', '(7) Alternativa A', '(7) Alternativa B', '(7) Alternativa C', '(7) Alternativa CORRETA'),
  ('(8) Pergunta 8 ano', 8, 'dica (8)', '(8) Alternativa A', '(8) Alternativa B', '(8) Alternativa C', '(8) Alternativa CORRETA'),
  ('(9) Pergunta 8 ano', 8, 'dica (9)', '(9) Alternativa A', '(9) Alternativa B', '(9) Alternativa C', '(9) Alternativa CORRETA'),
  ('(10) Pergunta 8 ano', 8, 'dica (10)', '(10) Alternativa A', '(10) Alternativa B', '(10) Alternativa C', '(10) Alternativa CORRETA');

INSERT INTO Pergunta (texto_enunciado, ano, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA)
VALUES
  ('(1) Pergunta 9 ano', 9, 'dica (1)', '(1) Alternativa A', '(1) Alternativa B', '(1) Alternativa C', '(1) Alternativa CORRETA'),
  ('(2) Pergunta 9 ano', 9, 'dica (2)', '(2) Alternativa A', '(2) Alternativa B', '(2) Alternativa C', '(2) Alternativa CORRETA'),
  ('(3) Pergunta 9 ano', 9, 'dica (3)', '(3) Alternativa A', '(3) Alternativa B', '(3) Alternativa C', '(3) Alternativa CORRETA'),
  ('(4) Pergunta 9 ano', 9, 'dica (4)', '(4) Alternativa A', '(4) Alternativa B', '(4) Alternativa C', '(4) Alternativa CORRETA'),
  ('(5) Pergunta 9 ano', 9, 'dica (5)', '(5) Alternativa A', '(5) Alternativa B', '(5) Alternativa C', '(5) Alternativa CORRETA'),
  ('(6) Pergunta 9 ano', 9, 'dica (6)', '(6) Alternativa A', '(6) Alternativa B', '(6) Alternativa C', '(6) Alternativa CORRETA'),
  ('(7) Pergunta 9 ano', 9, 'dica (7)', '(7) Alternativa A', '(7) Alternativa B', '(7) Alternativa C', '(7) Alternativa CORRETA'),
  ('(8) Pergunta 9 ano', 9, 'dica (8)', '(8) Alternativa A', '(8) Alternativa B', '(8) Alternativa C', '(8) Alternativa CORRETA'),
  ('(9) Pergunta 9 ano', 9, 'dica (9)', '(9) Alternativa A', '(9) Alternativa B', '(9) Alternativa C', '(9) Alternativa CORRETA'),
  ('(10) Pergunta 9 ano', 9, 'dica (10)', '(10) Alternativa A', '(10) Alternativa B', '(10) Alternativa C', '(10) Alternativa CORRETA');

INSERT INTO Pergunta (texto_enunciado, ano, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA)
VALUES
  ('(1) Pergunta 1 ano medio', 10, 'dica (1)', '(1) Alternativa A', '(1) Alternativa B', '(1) Alternativa C', '(1) Alternativa CORRETA'),
  ('(2) Pergunta 1 ano medio', 10, 'dica (2)', '(2) Alternativa A', '(2) Alternativa B', '(2) Alternativa C', '(2) Alternativa CORRETA'),
  ('(3) Pergunta 1 ano medio', 10, 'dica (3)', '(3) Alternativa A', '(3) Alternativa B', '(3) Alternativa C', '(3) Alternativa CORRETA'),
  ('(4) Pergunta 1 ano medio', 10, 'dica (4)', '(4) Alternativa A', '(4) Alternativa B', '(4) Alternativa C', '(4) Alternativa CORRETA'),
  ('(5) Pergunta 1 ano medio', 10, 'dica (5)', '(5) Alternativa A', '(5) Alternativa B', '(5) Alternativa C', '(5) Alternativa CORRETA'),
  ('(6) Pergunta 1 ano medio', 10, 'dica (6)', '(6) Alternativa A', '(6) Alternativa B', '(6) Alternativa C', '(6) Alternativa CORRETA'),
  ('(7) Pergunta 1 ano medio', 10, 'dica (7)', '(7) Alternativa A', '(7) Alternativa B', '(7) Alternativa C', '(7) Alternativa CORRETA'),
  ('(8) Pergunta 1 ano medio', 10, 'dica (8)', '(8) Alternativa A', '(8) Alternativa B', '(8) Alternativa C', '(8) Alternativa CORRETA'),
  ('(9) Pergunta 1 ano medio', 10, 'dica (9)', '(9) Alternativa A', '(9) Alternativa B', '(9) Alternativa C', '(9) Alternativa CORRETA'),
  ('(10) Pergunta 1 ano medio', 10, 'dica (10)', '(10) Alternativa A', '(10) Alternativa B', '(10) Alternativa C', '(10) Alternativa CORRETA');

INSERT INTO Pergunta (texto_enunciado, ano, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA)
VALUES
  ('(1) Pergunta 2 ano medio', 11, 'dica (1)', '(1) Alternativa A', '(1) Alternativa B', '(1) Alternativa C', '(1) Alternativa CORRETA'),
  ('(2) Pergunta 2 ano medio', 11, 'dica (2)', '(2) Alternativa A', '(2) Alternativa B', '(2) Alternativa C', '(2) Alternativa CORRETA'),
  ('(3) Pergunta 2 ano medio', 11, 'dica (3)', '(3) Alternativa A', '(3) Alternativa B', '(3) Alternativa C', '(3) Alternativa CORRETA'),
  ('(4) Pergunta 2 ano medio', 11, 'dica (4)', '(4) Alternativa A', '(4) Alternativa B', '(4) Alternativa C', '(4) Alternativa CORRETA'),
  ('(5) Pergunta 2 ano medio', 11, 'dica (5)', '(5) Alternativa A', '(5) Alternativa B', '(5) Alternativa C', '(5) Alternativa CORRETA'),
  ('(6) Pergunta 2 ano medio', 11, 'dica (6)', '(6) Alternativa A', '(6) Alternativa B', '(6) Alternativa C', '(6) Alternativa CORRETA'),
  ('(7) Pergunta 2 ano medio', 11, 'dica (7)', '(7) Alternativa A', '(7) Alternativa B', '(7) Alternativa C', '(7) Alternativa CORRETA'),
  ('(8) Pergunta 2 ano medio', 11, 'dica (8)', '(8) Alternativa A', '(8) Alternativa B', '(8) Alternativa C', '(8) Alternativa CORRETA'),
  ('(9) Pergunta 2 ano medio', 11, 'dica (9)', '(9) Alternativa A', '(9) Alternativa B', '(9) Alternativa C', '(9) Alternativa CORRETA'),
  ('(10) Pergunta 2 ano medio', 11, 'dica (10)', '(10) Alternativa A', '(10) Alternativa B', '(10) Alternativa C', '(10) Alternativa CORRETA');

INSERT INTO Pergunta (texto_enunciado, ano, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA)
VALUES
  ('(1) Pergunta 3 ano medio', 12, 'dica (1)', '(1) Alternativa A', '(1) Alternativa B', '(1) Alternativa C', '(1) Alternativa CORRETA'),
  ('(2) Pergunta 3 ano medio', 12, 'dica (2)', '(2) Alternativa A', '(2) Alternativa B', '(2) Alternativa C', '(2) Alternativa CORRETA'),
  ('(3) Pergunta 3 ano medio', 12, 'dica (3)', '(3) Alternativa A', '(3) Alternativa B', '(3) Alternativa C', '(3) Alternativa CORRETA'),
  ('(4) Pergunta 3 ano medio', 12, 'dica (4)', '(4) Alternativa A', '(4) Alternativa B', '(4) Alternativa C', '(4) Alternativa CORRETA'),
  ('(5) Pergunta 3 ano medio', 12, 'dica (5)', '(5) Alternativa A', '(5) Alternativa B', '(5) Alternativa C', '(5) Alternativa CORRETA'),
  ('(6) Pergunta 3 ano medio', 12, 'dica (6)', '(6) Alternativa A', '(6) Alternativa B', '(6) Alternativa C', '(6) Alternativa CORRETA'),
  ('(7) Pergunta 3 ano medio', 12, 'dica (7)', '(7) Alternativa A', '(7) Alternativa B', '(7) Alternativa C', '(7) Alternativa CORRETA'),
  ('(8) Pergunta 3 ano medio', 12, 'dica (8)', '(8) Alternativa A', '(8) Alternativa B', '(8) Alternativa C', '(8) Alternativa CORRETA'),
  ('(9) Pergunta 3 ano medio', 12, 'dica (9)', '(9) Alternativa A', '(9) Alternativa B', '(9) Alternativa C', '(9) Alternativa CORRETA'),
  ('(10) Pergunta 3 ano medio', 12, 'dica (10)', '(10) Alternativa A', '(10) Alternativa B', '(10) Alternativa C', '(10) Alternativa CORRETA');
