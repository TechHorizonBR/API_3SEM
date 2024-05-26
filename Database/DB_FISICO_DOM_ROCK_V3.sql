CREATE SCHEMA dbnextschema;
USE dbnextschema;

CREATE TABLE empresa (
    id BIGINT PRIMARY KEY AUTO_INCREMENT, 
    cnpj varchar(14) NOT NULL,
    nome varchar(50) NOT NULL,
    CONSTRAINT unique_key_cnpj
    UNIQUE KEY (cnpj)
);

CREATE TABLE usuario (
    id BIGINT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL, 
    senha VARCHAR(64) NOT NULL
);
CREATE TABLE usuarioEmpresa(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empresa_id BIGINT, 
    usuario_id BIGINT,
    CONSTRAINT fk_empresa_id
    FOREIGN KEY (empresa_id)
    REFERENCES empresa(id),
    CONSTRAINT fk_usuario_id
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id)
);

CREATE TABLE role(
     id BIGINT AUTO_INCREMENT PRIMARY KEY,
     usuario_id BIGINT NOT NULL, 
     role_usu VARCHAR(10) NOT NULL, 
     CONSTRAINT fk_usuario_id
     FOREIGN KEY (usuario_id)
     REFERENCES usuario (id)
);

CREATE TABLE metadata (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL, 
    empresa_id BIGINT NOT NULL, 
    CONSTRAINT fk_empresa_id 
    FOREIGN KEY (empresa_id)
    REFERENCES empresa (id)
);

CREATE TABLE coluna (
    id BIGINT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(50) NOT NULL, 
    descricao VARCHAR(255), 
    restricao VARCHAR(100) NOT NULL, 
    tipo VARCHAR(10) NOT NULL, 
    metadata_id BIGINT NOT NULL, 
    validacao VARCHAR(10),
    chavePrimaria BOOLEAN,
    comentario VARCHAR(255),
    ativo BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_metadata_id 
    FOREIGN KEY (metadata_id)
    REFERENCES metadata(id),
    CONSTRAINT verificar_tipo
    CHECK (tipo IN("string", "int", "float", "boolean", "char"))
);


CREATE TABLE DePara (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sinal VARCHAR(255),
    valorPadrao VARCHAR(255),
    valorResultado VARCHAR(255),
    fk_Coluna_id INT,
    CONSTRAINT fk_Coluna_id FOREIGN KEY (fk_Coluna_id) REFERENCES Coluna(id) ON DELETE CASCADE
);