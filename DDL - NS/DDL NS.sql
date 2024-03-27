create database NS;

use NS; 

create table historico
(
data_hora timestamp,
log varchar (30),
id integer not null,
fk_usuario_id integer,
fk_metadata_id integer);

create table usuario 
(
nome varchar (60),
usuario_role varchar (30),
e_mail varchar (60),
senha varchar (60),
id integer not null
);

create table metadata
(
nome_arquivo varchar (30),
id integer not null,
fk_usuario_id integer,
fk_empresa_cnpj varchar (14)
);

alter table metadata
drop fk_empresa_cnpj,
add fk_empresa_cnpj varchar (14);

create table esta
(
fk_empresa_cnpj varchar (14),
fk_usuario_id integer
);

create table coluna_est1
(
nome varchar (60),
tipo varchar (60),
restrição varchar (60),
descrição varchar (60),
id integer,
fk_metadata_id integer
);

