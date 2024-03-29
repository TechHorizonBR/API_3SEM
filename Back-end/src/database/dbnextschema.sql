create database dbnextschema;

/*CRIANDO USUÁRIO*/
create user 'devs'@'localhost' identified by 'password123';

/*CONCEDENDO PERMISÃO*/
grant all privileges on *.* to 'devs'@'localhost';
GRANT CREATE, UPDATE, DROP, DELETE, INSERT, SELECT ON dbnextschema.* TO 'devs'@'localhost';

