create database nextschema;

/*CRIANDO USUÁRIO*/
create user 'devs'@'localhost' identified by 'password123';

/*CONCEDENDO PERMISÃO*/
grant all privileges on *.* to 'devs'@'localhost';



