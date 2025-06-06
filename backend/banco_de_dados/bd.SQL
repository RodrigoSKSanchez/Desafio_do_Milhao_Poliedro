CREATE SCHEMA IF NOT EXISTS defaultdb DEFAULT CHARACTER SET utf8 ;
USE defaultdb ;

DROP TABLE IF EXISTS Aluno CASCADE ;
CREATE TABLE Aluno (
  idAluno INT NOT NULL AUTO_INCREMENT,
  usuario_aluno VARCHAR(45) NOT NULL UNIQUE,
  senha_aluno VARCHAR(45) NOT NULL,
  dinhero INT NOT NULL DEFAULT 0,
  dica INT NOT NULL DEFAULT 0,
  pula INT NOT NULL DEFAULT 0,
  elimina INT NOT NULL DEFAULT 0,
  PRIMARY KEY (idAluno))
ENGINE = InnoDB;


DROP TABLE IF EXISTS Professor CASCADE ;
CREATE TABLE Professor (
  idProfessor INT NOT NULL AUTO_INCREMENT,
  usuario_professor VARCHAR(45) NOT NULL UNIQUE,
  senha_professor VARCHAR(45) NOT NULL,
  PRIMARY KEY (idProfessor))
ENGINE = InnoDB;

INSERT INTO professor (usuario_professor, senha_professor)
VALUES ('adm', 'adm');




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


DROP TABLE IF EXISTS Historico CASCADE ;
CREATE TABLE Historico (
  idHistorico INT NOT NULL AUTO_INCREMENT,
  idAluno INT NOT NULL,
  numero_acertos INT NOT NULL DEFAULT 0,
  total_perguntas INT NOT NULL DEFAULT 0,
  dinheiro_ganho INT NOT NULL DEFAULT 0,
  PRIMARY KEY (idHistorico, idAluno),
  FOREIGN KEY (idAluno) REFERENCES Aluno (idAluno) ON DELETE NO ACTION ON UPDATE NO ACTION
  )
ENGINE = InnoDB;

