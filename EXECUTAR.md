# Setup da aplicação (local)

## Pré-requisito

Antes de rodar a aplicação é preciso garantir que as seguintes dependências estejam corretamente instaladas:
```
Java 21
MySQL 
```

## Preparando ambiente

É necessário a criação da base de dados relacional no Postgres

```
CREATE DATABASE "productivity-with-spring";
```

Para os testes de integração também é necessario criar uma base de dados para os testes não interferirem na base de desenvolvimento.
```
CREATE DATABASE dbnextschema;
```
## Instalação da aplicação

Primeiramente, faça o clone do repositório:
```
https://github.com/TechHorizonBR/API_3SEM.git
```
Feito isso, acesse o projeto:
```
cd Back-end
```
É preciso compilar o código e baixar as dependências do projeto:
```
mvn clean package
```
Finalizado esse passo, vamos iniciar a aplicação:
```
mvn spring-boot:run
```
Pronto. O back-end está disponível em http://localhost:8080
```
Tomcat started on port(s): 8080 (http)
```
Para o Front-end, basta ir no arquivo index.html da pasta Front-end/Pages e executar
