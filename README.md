# Conexao Tocantins - Admin

## Dependências

- É necessário instalar o docker e o docker-compose para rodar o projeto.
- Instalar o node 4.x (LTS) (https://nodejs.org/en/download/package-manager/)
- Instalar modulos globais:

```
sudo npm install -g gulp bower jshint nodemon
```

## Rodando o projeto

Na primeira vez é necessário instalar as libs do bower e do npm:

```
npm install
bower install
```

Depois é só subir os containers:

```
docker-compose up
```

## Login

```
email: admin@conexaoto.com.br
password: 123456
```

## Plugins para o Atom

- atom-beautify
- language-pug
- jshint
- file-icons
