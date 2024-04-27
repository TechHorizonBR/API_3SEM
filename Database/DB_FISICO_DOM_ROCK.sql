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
    email VARCHAR(50) NOT NULL, 
    usu_role VARCHAR(10) NOT NULL, 
    senha VARCHAR(64) NOT NULL, 
    CONSTRAINT verificar_usu_role 
    CHECK (usu_role IN ("ROLE_ADMIN", "ROLE_LZ", "ROLE_BRONZE", "ROLE_SILVER"))
);

CREATE TABLE metadata (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL, 
    usuario_id BIGINT NOT NULL, 
    CONSTRAINT fk_usuario_id 
    FOREIGN KEY (usuario_id)
    REFERENCES usuario(id)
);

CREATE TABLE coluna (
	id BIGINT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(50) NOT NULL, 
    descricao VARCHAR(255), 
    restricao VARCHAR(100) NOT NULL, 
    tipo VARCHAR(10) NOT NULL, 
    metadata_id BIGINT NOT NULL, 
    CONSTRAINT fk_metadata_id 
    FOREIGN KEY (metadata_id)
    REFERENCES metadata(id),
    CONSTRAINT verificar_tipo
    CHECK (tipo IN("string", "int", "float", "boolean", "char"))
)