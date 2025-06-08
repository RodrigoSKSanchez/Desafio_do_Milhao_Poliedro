USE defaultdb;

DROP TABLE IF EXISTS Pergunta CASCADE;


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


-- ANO 8

INSERT INTO Pergunta (texto_enunciado, ano, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA) VALUES

  ('(1) Pergunta ano 8', 8, 'dica (1)', '(1) Alternativa A', '(1) Alternativa B', '(1) Alternativa C', '(1) Alternativa CORRETA'),
  ('(2) Pergunta ano 8', 8, 'dica (2)', '(2) Alternativa A', '(2) Alternativa B', '(2) Alternativa C', '(2) Alternativa CORRETA'),
  ('(3) Pergunta ano 8', 8, 'dica (3)', '(3) Alternativa A', '(3) Alternativa B', '(3) Alternativa C', '(3) Alternativa CORRETA'),
  ('(4) Pergunta ano 8', 8, 'dica (4)', '(4) Alternativa A', '(4) Alternativa B', '(4) Alternativa C', '(4) Alternativa CORRETA'),
  ('(5) Pergunta ano 8', 8, 'dica (5)', '(5) Alternativa A', '(5) Alternativa B', '(5) Alternativa C', '(5) Alternativa CORRETA'),
  ('(6) Pergunta ano 8', 8, 'dica (6)', '(6) Alternativa A', '(6) Alternativa B', '(6) Alternativa C', '(6) Alternativa CORRETA'),
  ('(7) Pergunta ano 8', 8, 'dica (7)', '(7) Alternativa A', '(7) Alternativa B', '(7) Alternativa C', '(7) Alternativa CORRETA'),
  ('(8) Pergunta ano 8', 8, 'dica (8)', '(8) Alternativa A', '(8) Alternativa B', '(8) Alternativa C', '(8) Alternativa CORRETA'),
  ('(9) Pergunta ano 8', 8, 'dica (9)', '(9) Alternativa A', '(9) Alternativa B', '(9) Alternativa C', '(9) Alternativa CORRETA'),
  ('(10) Pergunta ano 8', 8, 'dica (10)', '(10) Alternativa A', '(10) Alternativa B', '(10) Alternativa C', '(10) Alternativa CORRETA'),
  ('(11) Pergunta ano 8', 8, 'dica (11)', '(11) Alternativa A', '(11) Alternativa B', '(11) Alternativa C', '(11) Alternativa CORRETA'),
  ('(12) Pergunta ano 8', 8, 'dica (12)', '(12) Alternativa A', '(12) Alternativa B', '(12) Alternativa C', '(12) Alternativa CORRETA'),
  ('(13) Pergunta ano 8', 8, 'dica (13)', '(13) Alternativa A', '(13) Alternativa B', '(13) Alternativa C', '(13) Alternativa CORRETA'),
  ('(14) Pergunta ano 8', 8, 'dica (14)', '(14) Alternativa A', '(14) Alternativa B', '(14) Alternativa C', '(14) Alternativa CORRETA'),
  ('(15) Pergunta ano 8', 8, 'dica (15)', '(15) Alternativa A', '(15) Alternativa B', '(15) Alternativa C', '(15) Alternativa CORRETA'),
  ('(16) Pergunta ano 8', 8, 'dica (16)', '(16) Alternativa A', '(16) Alternativa B', '(16) Alternativa C', '(16) Alternativa CORRETA'),
  ('(17) Pergunta ano 8', 8, 'dica (17)', '(17) Alternativa A', '(17) Alternativa B', '(17) Alternativa C', '(17) Alternativa CORRETA'),
  ('(18) Pergunta ano 8', 8, 'dica (18)', '(18) Alternativa A', '(18) Alternativa B', '(18) Alternativa C', '(18) Alternativa CORRETA'),
  ('(19) Pergunta ano 8', 8, 'dica (19)', '(19) Alternativa A', '(19) Alternativa B', '(19) Alternativa C', '(19) Alternativa CORRETA'),
  ('(20) Pergunta ano 8', 8, 'dica (20)', '(20) Alternativa A', '(20) Alternativa B', '(20) Alternativa C', '(20) Alternativa CORRETA');


-- ANO 9

INSERT INTO Pergunta (texto_enunciado, ano, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA) VALUES

  ('(1) Pergunta ano 9', 9, 'dica (1)', '(1) Alternativa A', '(1) Alternativa B', '(1) Alternativa C', '(1) Alternativa CORRETA'),
  ('(2) Pergunta ano 9', 9, 'dica (2)', '(2) Alternativa A', '(2) Alternativa B', '(2) Alternativa C', '(2) Alternativa CORRETA'),
  ('(3) Pergunta ano 9', 9, 'dica (3)', '(3) Alternativa A', '(3) Alternativa B', '(3) Alternativa C', '(3) Alternativa CORRETA'),
  ('(4) Pergunta ano 9', 9, 'dica (4)', '(4) Alternativa A', '(4) Alternativa B', '(4) Alternativa C', '(4) Alternativa CORRETA'),
  ('(5) Pergunta ano 9', 9, 'dica (5)', '(5) Alternativa A', '(5) Alternativa B', '(5) Alternativa C', '(5) Alternativa CORRETA'),
  ('(6) Pergunta ano 9', 9, 'dica (6)', '(6) Alternativa A', '(6) Alternativa B', '(6) Alternativa C', '(6) Alternativa CORRETA'),
  ('(7) Pergunta ano 9', 9, 'dica (7)', '(7) Alternativa A', '(7) Alternativa B', '(7) Alternativa C', '(7) Alternativa CORRETA'),
  ('(8) Pergunta ano 9', 9, 'dica (8)', '(8) Alternativa A', '(8) Alternativa B', '(8) Alternativa C', '(8) Alternativa CORRETA'),
  ('(9) Pergunta ano 9', 9, 'dica (9)', '(9) Alternativa A', '(9) Alternativa B', '(9) Alternativa C', '(9) Alternativa CORRETA'),
  ('(10) Pergunta ano 9', 9, 'dica (10)', '(10) Alternativa A', '(10) Alternativa B', '(10) Alternativa C', '(10) Alternativa CORRETA'),
  ('(11) Pergunta ano 9', 9, 'dica (11)', '(11) Alternativa A', '(11) Alternativa B', '(11) Alternativa C', '(11) Alternativa CORRETA'),
  ('(12) Pergunta ano 9', 9, 'dica (12)', '(12) Alternativa A', '(12) Alternativa B', '(12) Alternativa C', '(12) Alternativa CORRETA'),
  ('(13) Pergunta ano 9', 9, 'dica (13)', '(13) Alternativa A', '(13) Alternativa B', '(13) Alternativa C', '(13) Alternativa CORRETA'),
  ('(14) Pergunta ano 9', 9, 'dica (14)', '(14) Alternativa A', '(14) Alternativa B', '(14) Alternativa C', '(14) Alternativa CORRETA'),
  ('(15) Pergunta ano 9', 9, 'dica (15)', '(15) Alternativa A', '(15) Alternativa B', '(15) Alternativa C', '(15) Alternativa CORRETA'),
  ('(16) Pergunta ano 9', 9, 'dica (16)', '(16) Alternativa A', '(16) Alternativa B', '(16) Alternativa C', '(16) Alternativa CORRETA'),
  ('(17) Pergunta ano 9', 9, 'dica (17)', '(17) Alternativa A', '(17) Alternativa B', '(17) Alternativa C', '(17) Alternativa CORRETA'),
  ('(18) Pergunta ano 9', 9, 'dica (18)', '(18) Alternativa A', '(18) Alternativa B', '(18) Alternativa C', '(18) Alternativa CORRETA'),
  ('(19) Pergunta ano 9', 9, 'dica (19)', '(19) Alternativa A', '(19) Alternativa B', '(19) Alternativa C', '(19) Alternativa CORRETA'),
  ('(20) Pergunta ano 9', 9, 'dica (20)', '(20) Alternativa A', '(20) Alternativa B', '(20) Alternativa C', '(20) Alternativa CORRETA');


-- ANO 10

INSERT INTO Pergunta (texto_enunciado, ano, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA) VALUES

  ('(1) Pergunta ano 10', 10, 'dica (1)', '(1) Alternativa A', '(1) Alternativa B', '(1) Alternativa C', '(1) Alternativa CORRETA'),
  ('(2) Pergunta ano 10', 10, 'dica (2)', '(2) Alternativa A', '(2) Alternativa B', '(2) Alternativa C', '(2) Alternativa CORRETA'),
  ('(3) Pergunta ano 10', 10, 'dica (3)', '(3) Alternativa A', '(3) Alternativa B', '(3) Alternativa C', '(3) Alternativa CORRETA'),
  ('(4) Pergunta ano 10', 10, 'dica (4)', '(4) Alternativa A', '(4) Alternativa B', '(4) Alternativa C', '(4) Alternativa CORRETA'),
  ('(5) Pergunta ano 10', 10, 'dica (5)', '(5) Alternativa A', '(5) Alternativa B', '(5) Alternativa C', '(5) Alternativa CORRETA'),
  ('(6) Pergunta ano 10', 10, 'dica (6)', '(6) Alternativa A', '(6) Alternativa B', '(6) Alternativa C', '(6) Alternativa CORRETA'),
  ('(7) Pergunta ano 10', 10, 'dica (7)', '(7) Alternativa A', '(7) Alternativa B', '(7) Alternativa C', '(7) Alternativa CORRETA'),
  ('(8) Pergunta ano 10', 10, 'dica (8)', '(8) Alternativa A', '(8) Alternativa B', '(8) Alternativa C', '(8) Alternativa CORRETA'),
  ('(9) Pergunta ano 10', 10, 'dica (9)', '(9) Alternativa A', '(9) Alternativa B', '(9) Alternativa C', '(9) Alternativa CORRETA'),
  ('(10) Pergunta ano 10', 10, 'dica (10)', '(10) Alternativa A', '(10) Alternativa B', '(10) Alternativa C', '(10) Alternativa CORRETA'),
  ('(11) Pergunta ano 10', 10, 'dica (11)', '(11) Alternativa A', '(11) Alternativa B', '(11) Alternativa C', '(11) Alternativa CORRETA'),
  ('(12) Pergunta ano 10', 10, 'dica (12)', '(12) Alternativa A', '(12) Alternativa B', '(12) Alternativa C', '(12) Alternativa CORRETA'),
  ('(13) Pergunta ano 10', 10, 'dica (13)', '(13) Alternativa A', '(13) Alternativa B', '(13) Alternativa C', '(13) Alternativa CORRETA'),
  ('(14) Pergunta ano 10', 10, 'dica (14)', '(14) Alternativa A', '(14) Alternativa B', '(14) Alternativa C', '(14) Alternativa CORRETA'),
  ('(15) Pergunta ano 10', 10, 'dica (15)', '(15) Alternativa A', '(15) Alternativa B', '(15) Alternativa C', '(15) Alternativa CORRETA'),
  ('(16) Pergunta ano 10', 10, 'dica (16)', '(16) Alternativa A', '(16) Alternativa B', '(16) Alternativa C', '(16) Alternativa CORRETA'),
  ('(17) Pergunta ano 10', 10, 'dica (17)', '(17) Alternativa A', '(17) Alternativa B', '(17) Alternativa C', '(17) Alternativa CORRETA'),
  ('(18) Pergunta ano 10', 10, 'dica (18)', '(18) Alternativa A', '(18) Alternativa B', '(18) Alternativa C', '(18) Alternativa CORRETA'),
  ('(19) Pergunta ano 10', 10, 'dica (19)', '(19) Alternativa A', '(19) Alternativa B', '(19) Alternativa C', '(19) Alternativa CORRETA'),
  ('(20) Pergunta ano 10', 10, 'dica (20)', '(20) Alternativa A', '(20) Alternativa B', '(20) Alternativa C', '(20) Alternativa CORRETA');


-- ANO 11

INSERT INTO Pergunta (texto_enunciado, ano, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA) VALUES

  ('(1) Pergunta ano 11', 11, 'dica (1)', '(1) Alternativa A', '(1) Alternativa B', '(1) Alternativa C', '(1) Alternativa CORRETA'),
  ('(2) Pergunta ano 11', 11, 'dica (2)', '(2) Alternativa A', '(2) Alternativa B', '(2) Alternativa C', '(2) Alternativa CORRETA'),
  ('(3) Pergunta ano 11', 11, 'dica (3)', '(3) Alternativa A', '(3) Alternativa B', '(3) Alternativa C', '(3) Alternativa CORRETA'),
  ('(4) Pergunta ano 11', 11, 'dica (4)', '(4) Alternativa A', '(4) Alternativa B', '(4) Alternativa C', '(4) Alternativa CORRETA'),
  ('(5) Pergunta ano 11', 11, 'dica (5)', '(5) Alternativa A', '(5) Alternativa B', '(5) Alternativa C', '(5) Alternativa CORRETA'),
  ('(6) Pergunta ano 11', 11, 'dica (6)', '(6) Alternativa A', '(6) Alternativa B', '(6) Alternativa C', '(6) Alternativa CORRETA'),
  ('(7) Pergunta ano 11', 11, 'dica (7)', '(7) Alternativa A', '(7) Alternativa B', '(7) Alternativa C', '(7) Alternativa CORRETA'),
  ('(8) Pergunta ano 11', 11, 'dica (8)', '(8) Alternativa A', '(8) Alternativa B', '(8) Alternativa C', '(8) Alternativa CORRETA'),
  ('(9) Pergunta ano 11', 11, 'dica (9)', '(9) Alternativa A', '(9) Alternativa B', '(9) Alternativa C', '(9) Alternativa CORRETA'),
  ('(10) Pergunta ano 11', 11, 'dica (10)', '(10) Alternativa A', '(10) Alternativa B', '(10) Alternativa C', '(10) Alternativa CORRETA'),
  ('(11) Pergunta ano 11', 11, 'dica (11)', '(11) Alternativa A', '(11) Alternativa B', '(11) Alternativa C', '(11) Alternativa CORRETA'),
  ('(12) Pergunta ano 11', 11, 'dica (12)', '(12) Alternativa A', '(12) Alternativa B', '(12) Alternativa C', '(12) Alternativa CORRETA'),
  ('(13) Pergunta ano 11', 11, 'dica (13)', '(13) Alternativa A', '(13) Alternativa B', '(13) Alternativa C', '(13) Alternativa CORRETA'),
  ('(14) Pergunta ano 11', 11, 'dica (14)', '(14) Alternativa A', '(14) Alternativa B', '(14) Alternativa C', '(14) Alternativa CORRETA'),
  ('(15) Pergunta ano 11', 11, 'dica (15)', '(15) Alternativa A', '(15) Alternativa B', '(15) Alternativa C', '(15) Alternativa CORRETA'),
  ('(16) Pergunta ano 11', 11, 'dica (16)', '(16) Alternativa A', '(16) Alternativa B', '(16) Alternativa C', '(16) Alternativa CORRETA'),
  ('(17) Pergunta ano 11', 11, 'dica (17)', '(17) Alternativa A', '(17) Alternativa B', '(17) Alternativa C', '(17) Alternativa CORRETA'),
  ('(18) Pergunta ano 11', 11, 'dica (18)', '(18) Alternativa A', '(18) Alternativa B', '(18) Alternativa C', '(18) Alternativa CORRETA'),
  ('(19) Pergunta ano 11', 11, 'dica (19)', '(19) Alternativa A', '(19) Alternativa B', '(19) Alternativa C', '(19) Alternativa CORRETA'),
  ('(20) Pergunta ano 11', 11, 'dica (20)', '(20) Alternativa A', '(20) Alternativa B', '(20) Alternativa C', '(20) Alternativa CORRETA');


-- ANO 12

INSERT INTO Pergunta (texto_enunciado, ano, dica, alternativa_A, alternativa_B, alternativa_C, alternativa_CORRETA) VALUES

  ('(1) Pergunta ano 12', 12, 'dica (1)', '(1) Alternativa A', '(1) Alternativa B', '(1) Alternativa C', '(1) Alternativa CORRETA'),
  ('(2) Pergunta ano 12', 12, 'dica (2)', '(2) Alternativa A', '(2) Alternativa B', '(2) Alternativa C', '(2) Alternativa CORRETA'),
  ('(3) Pergunta ano 12', 12, 'dica (3)', '(3) Alternativa A', '(3) Alternativa B', '(3) Alternativa C', '(3) Alternativa CORRETA'),
  ('(4) Pergunta ano 12', 12, 'dica (4)', '(4) Alternativa A', '(4) Alternativa B', '(4) Alternativa C', '(4) Alternativa CORRETA'),
  ('(5) Pergunta ano 12', 12, 'dica (5)', '(5) Alternativa A', '(5) Alternativa B', '(5) Alternativa C', '(5) Alternativa CORRETA'),
  ('(6) Pergunta ano 12', 12, 'dica (6)', '(6) Alternativa A', '(6) Alternativa B', '(6) Alternativa C', '(6) Alternativa CORRETA'),
  ('(7) Pergunta ano 12', 12, 'dica (7)', '(7) Alternativa A', '(7) Alternativa B', '(7) Alternativa C', '(7) Alternativa CORRETA'),
  ('(8) Pergunta ano 12', 12, 'dica (8)', '(8) Alternativa A', '(8) Alternativa B', '(8) Alternativa C', '(8) Alternativa CORRETA'),
  ('(9) Pergunta ano 12', 12, 'dica (9)', '(9) Alternativa A', '(9) Alternativa B', '(9) Alternativa C', '(9) Alternativa CORRETA'),
  ('(10) Pergunta ano 12', 12, 'dica (10)', '(10) Alternativa A', '(10) Alternativa B', '(10) Alternativa C', '(10) Alternativa CORRETA'),
  ('(11) Pergunta ano 12', 12, 'dica (11)', '(11) Alternativa A', '(11) Alternativa B', '(11) Alternativa C', '(11) Alternativa CORRETA'),
  ('(12) Pergunta ano 12', 12, 'dica (12)', '(12) Alternativa A', '(12) Alternativa B', '(12) Alternativa C', '(12) Alternativa CORRETA'),
  ('(13) Pergunta ano 12', 12, 'dica (13)', '(13) Alternativa A', '(13) Alternativa B', '(13) Alternativa C', '(13) Alternativa CORRETA'),
  ('(14) Pergunta ano 12', 12, 'dica (14)', '(14) Alternativa A', '(14) Alternativa B', '(14) Alternativa C', '(14) Alternativa CORRETA'),
  ('(15) Pergunta ano 12', 12, 'dica (15)', '(15) Alternativa A', '(15) Alternativa B', '(15) Alternativa C', '(15) Alternativa CORRETA'),
  ('(16) Pergunta ano 12', 12, 'dica (16)', '(16) Alternativa A', '(16) Alternativa B', '(16) Alternativa C', '(16) Alternativa CORRETA'),
  ('(17) Pergunta ano 12', 12, 'dica (17)', '(17) Alternativa A', '(17) Alternativa B', '(17) Alternativa C', '(17) Alternativa CORRETA'),
  ('(18) Pergunta ano 12', 12, 'dica (18)', '(18) Alternativa A', '(18) Alternativa B', '(18) Alternativa C', '(18) Alternativa CORRETA'),
  ('(19) Pergunta ano 12', 12, 'dica (19)', '(19) Alternativa A', '(19) Alternativa B', '(19) Alternativa C', '(19) Alternativa CORRETA'),
  ('(20) Pergunta ano 12', 12, 'dica (20)', '(20) Alternativa A', '(20) Alternativa B', '(20) Alternativa C', '(20) Alternativa CORRETA');
