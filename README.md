# Sistema Just in Time

## Sobre o projeto

O **Sistema Just in Time** é uma aplicação web desenvolvida para auxiliar no gerenciamento da produção e do estoque de uma empresa fabricante de produtos em MDF.

O sistema permite realizar o login de usuários, cadastrar e gerenciar produtos, controlar o estoque e registrar movimentações de fabricação e pedidos, mantendo um histórico das operações realizadas.

## Objetivo

Desenvolver um sistema web simples e funcional para auxiliar no controle da produção e do estoque de produtos em MDF, utilizando o conceito **Just in Time**.

O sistema facilita o acompanhamento do estoque e a identificação de produtos que atingiram ou ficaram abaixo da quantidade mínima definida.

## Tecnologias utilizadas

### Front-end

- HTML5
- CSS3
- JavaScript

### Back-end

- Node.js
- Express.js
- JavaScript
- CORS

### Banco de dados

- MySQL
- mysql2

### Ferramentas

- Visual Studio Code
- Git
- GitHub
- Google Chrome

## Funcionalidades

### Autenticação

- Login de usuários cadastrados.
- Validação de e-mail e senha.
- Bloqueio do acesso quando as credenciais são inválidas.
- Controle de acesso às páginas do sistema.

### Gerenciamento de produtos

- Cadastro de produtos.
- Listagem de produtos.
- Busca de produtos.
- Edição de produtos.
- Exclusão de produtos.
- Validação dos dados dos produtos.
- Controle da quantidade em estoque.
- Definição do estoque mínimo.
- Listagem dos produtos em ordem alfabética.

### Controle de produção

- Registro de produtos fabricados.
- Registro de pedidos.
- Atualização automática do estoque.
- Entrada de produtos no estoque através de fabricação.
- Saída de produtos do estoque através de pedidos.
- Validação para impedir pedidos com quantidade superior ao estoque disponível.
- Controle do estoque mínimo.
- Alerta visual quando o estoque atinge ou fica abaixo do mínimo.

### Movimentações

- Registro das movimentações realizadas.
- Identificação do produto movimentado.
- Identificação do usuário responsável.
- Registro da quantidade movimentada.
- Registro do tipo de movimentação.
- Registro da data da movimentação.
- Consulta do histórico de movimentações.

## Estrutura do projeto

```text
preparacao/
│
├── src/
│   ├── controllers/
│   │   ├── movimentacao.controller.js
│   │   ├── produto.controller.js
│   │   └── usuarios.controller.js
│   │
│   ├── data/
│   │   └── database.js
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js
│   │
│   └── routes/
│       ├── movimentacao.routes.js
│       ├── produto.routes.js
│       └── usuarios.routes.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   │
│   ├── principal.html
│   ├── principal.css
│   ├── principal.js
│   │
│   ├── produtos.html
│   ├── produtos.css
│   ├── produtos.js
│   │
│   ├── producao.html
│   ├── producao.css
│   ├── producao.js
│   │
│   ├── movimentacoes.html
│   ├── movimentacoes.css
│   └── movimentacoes.js
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Banco de dados

O sistema utiliza o banco de dados:

```text
preparacao_db
```

## Instalação

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

Depois entre na pasta do projeto:

```bash
cd nome-do-projeto
```

> Substitua `URL_DO_REPOSITORIO` pela URL do seu repositório no GitHub.

### 2. Instalar as dependências

Dentro da pasta do projeto:

```bash
npm install
```

## Configuração do banco de dados

Abra o MySQL e execute o script SQL responsável pela criação e população do banco.

O banco utilizado pelo sistema é:

```text
preparacao_db
```

A configuração da conexão está localizada em:

```text
src/data/database.js
```

## Executando o back-end

Localize a pasta api:
```bash
cd api
```

Execute o servidor com:

```bash
node server.js
```

Quando estiver funcionando, o servidor ficará disponível em:

```text
http://localhost:3000
```

## Executando o front-end

Abra a pasta:

```text
web
```

e execute o arquivo:

```text
web/index.html
```

no navegador.

O front-end realiza as requisições para a API:

```text
http://localhost:3000
```


## Rotas da API

### Usuários

Login:

```http
POST /usuarios/login
```

### Produtos

Listar produtos:

```http
GET /produtos
```

Buscar produtos:

```http
GET /produtos/buscar
```

Cadastrar produto:

```http
POST /produtos
```

Editar produto:

```http
PUT /produtos/:id
```

Excluir produto:

```http
DELETE /produtos/:id
```

### Movimentações

Listar movimentações:

```http
GET /movimentacoes
```

Registrar movimentação:

```http
POST /movimentacoes
```

## Validações

O sistema possui validações para evitar informações incorretas.

## Testes

Foram realizados testes para verificar as principais funcionalidades do sistema.

Os casos de teste possuem procedimentos, resultados esperados, resultados obtidos e status de aprovação.


## Documentação

O projeto possui os seguintes documentos:

- Lista de requisitos funcionais;
- Diagrama Entidade-Relacionamento (DER);
- Script de criação e população do banco de dados;
- Interfaces do sistema;
- Descritivo de casos de teste;
- Lista de requisitos de infraestrutura.


## Comunicação com a API

A comunicação entre o front-end e o back-end é realizada por requisições HTTP.

Métodos utilizados:

```text
GET
POST
PUT
DELETE
```

Os dados são enviados e recebidos no formato JSON.

## Finalidade acadêmica

Este projeto foi desenvolvido como atividade acadêmica do **SENAI 2026**, com foco no desenvolvimento Full Stack e na aplicação prática de conceitos de banco de dados, desenvolvimento web, APIs e controle de estoque.

---

**Sistema Just in Time — Controle de Produção e Estoque**

**Projeto acadêmico — SENAI 2026**
