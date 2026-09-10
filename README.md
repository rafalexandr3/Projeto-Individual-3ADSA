# 🍽️ Projeto Individual — Sistema de Cadastro de Produtos

Projeto individual desenvolvido para integração entre as disciplinas de **Front-end** e **Programação Web** da **São Paulo Tech School (SPTech)**.

A aplicação consiste em um sistema para **cadastro, consulta e gerenciamento de produtos**, desenvolvido com React no Front-end e uma API REST em Java com Spring Boot no Back-end.

---

## 🎯 Objetivo

O projeto tem como objetivo desenvolver uma aplicação Front-end em **React** integrada a uma **API REST**, permitindo que o usuário cadastre e visualize informações de produtos.

Os dados informados pelo usuário são enviados para a API, validados pelo Back-end e persistidos em um banco de dados relacional.

A consulta dos produtos também é realizada através da API, garantindo que as informações apresentadas na aplicação sejam provenientes dos dados persistidos.

---

# 🛠️ Tecnologias utilizadas

## Front-end

* React
* JavaScript
* JSX
* Vite
* CSS Modules
* Fetch API

## Back-end

* Java 21
* Spring Boot
* Spring Web MVC
* JdbcTemplate
* Maven

## Banco de dados

* MySQL

## Versionamento

* Git
* GitHub

---

# 🍔 Funcionalidades

A aplicação possui um fluxo voltado para o cadastro, consulta e gerenciamento de produtos.

## 📝 Cadastro de produtos

O usuário pode cadastrar um produto informando os seguintes campos:

| Campo           | Descrição                           |
| --------------- | ----------------------------------- |
| Nome            | Nome do produto                     |
| Descrição       | Descrição do produto                |
| Preço           | Valor do produto                    |
| Disponibilidade | Indica se o produto está disponível |
| Tipo            | Categoria do produto                |

### Tipos de produtos

Os tipos disponíveis atualmente são:

* 🍔 Lanche
* 🥤 Bebida
* 🍰 Sobremesa
* 🍛 Refeição

---

## 🔎 Consulta de produtos

A aplicação permite consultar os produtos cadastrados através da API.

Os produtos são apresentados em cards contendo:

* Nome
* Descrição
* Preço
* Tipo
* Disponibilidade

O preço é apresentado no formato monetário brasileiro, com duas casas decimais.

---

## 🗑️ Exclusão de produtos

A aplicação também possui uma funcionalidade para exclusão de produtos cadastrados.

A exclusão é realizada através de uma requisição HTTP para a API utilizando o identificador do produto.

---

# ⚛️ Front-end

O Front-end foi desenvolvido utilizando **React**, com componentes separados de acordo com suas responsabilidades.

## `Produto.jsx`

Responsável pelo formulário de cadastro de novos produtos.

O componente utiliza `useState` para controlar os valores dos campos:

```text
nome
descricao
preco
disponibilidade
tipo
mensagem
```

Após o preenchimento do formulário, os dados são enviados para a API através de uma requisição `POST`.

---

## `ListarProdutos.jsx`

Responsável por consultar e apresentar os produtos cadastrados.

A consulta é realizada através de uma requisição:

```http
GET /produtos
```

O componente também utiliza estados para controlar:

* Carregamento;
* Erros;
* Dados retornados pela API.

---

# 🎨 CSS Modules

A aplicação utiliza **CSS Modules** para a estilização dos componentes.

Os estilos são separados de acordo com cada componente:

```text
Produto.jsx
Produto.module.css

ListarProdutos.jsx
ListarProdutos.module.css
```

Dessa forma, os estilos ficam associados aos seus respectivos componentes, evitando conflitos entre classes.

---

# 🔗 API REST

A API foi desenvolvida utilizando:

* Java 21
* Spring Boot
* Spring Web MVC
* JdbcTemplate

Durante o desenvolvimento, a API é executada localmente na porta `8080`.

**URL base:**

```text
http://localhost:8080
```

---

## 📌 GET — Listar produtos

### Endpoint

```http
GET /produtos
```

Retorna todos os produtos cadastrados.

### Resposta

**Status:** `200 OK`

### Exemplo

```json
[
    {
        "id": 1,
        "nome": "Cheeseburger",
        "descricao": "Hambúrguer com queijo",
        "preco": 20.50,
        "disponibilidade": true,
        "tipo": "lanche"
    }
]
```

---

## 📌 POST — Cadastrar produto

### Endpoint

```http
POST /produtos
```

Responsável por receber os dados de um novo produto e realizar sua persistência no banco de dados.

### Corpo da requisição

```json
{
    "nome": "Cheeseburger",
    "descricao": "Hambúrguer com queijo",
    "preco": 20.50,
    "disponibilidade": true,
    "tipo": "lanche"
}
```

### Validações

O Back-end verifica se:

* O nome foi informado;
* A descrição foi informada;
* O preço foi informado e é maior que zero;
* A disponibilidade foi informada;
* O tipo foi informado.

### Respostas

Caso os dados sejam inválidos:

```http
400 Bad Request
```

Caso o cadastro seja realizado com sucesso:

```http
201 Created
```

---

## 📌 DELETE — Excluir produto

### Endpoint

```http
DELETE /produtos/{id}
```

Remove um produto utilizando seu identificador.

### Produto inexistente

Caso não exista um produto com o ID informado:

```http
404 Not Found
```

### Exclusão realizada

Quando o produto é excluído com sucesso:

```http
204 No Content
```

---

# 🗄️ Banco de dados

O projeto utiliza um banco de dados relacional para realizar a persistência dos produtos.

A tabela principal utilizada pela aplicação é `produto`.

## Estrutura da tabela

```sql
CREATE TABLE produto
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(100),
    preco DECIMAL(10,2),
    disponibilidade BOOLEAN,
    tipo VARCHAR(100)
);
```

### Campos

| Campo             | Tipo          | Descrição                  |
| ----------------- | ------------- | -------------------------- |
| `id`              | INT           | Identificador único        |
| `nome`            | VARCHAR(255)  | Nome do produto            |
| `descricao`       | VARCHAR(100)  | Descrição do produto       |
| `preco`           | DECIMAL(10,2) | Preço do produto           |
| `disponibilidade` | BOOLEAN       | Disponibilidade do produto |
| `tipo`            | VARCHAR(100)  | Tipo/categoria do produto  |

O script de criação da tabela está localizado em:

```text
Backend/src/main/resources/schema.sql
```

---

# 🔄 Fluxo da aplicação

## 📝 Cadastro

```text
Usuário
   ↓
Formulário React
   ↓
POST /produtos
   ↓
Spring Boot
   ↓
Validação
   ↓
JdbcTemplate
   ↓
Banco de dados
```

---

## 🔎 Consulta

```text
Usuário
   ↓
Listar produtos
   ↓
GET /produtos
   ↓
Spring Boot
   ↓
JdbcTemplate
   ↓
Banco de dados
   ↓
JSON
   ↓
React
   ↓
Cards dos produtos
```

---

## 🗑️ Exclusão

```text
Usuário
   ↓
Botão de excluir
   ↓
DELETE /produtos/{id}
   ↓
Spring Boot
   ↓
JdbcTemplate
   ↓
Banco de dados
```

---

# 🚀 Como executar

## 1. Clonar o repositório

```bash
git clone https://github.com/rafalexandr3/Projeto-Individual-3ADSA.git
```

Entre na pasta do projeto:

```bash
cd Projeto-Individual-3ADSA
```

---

## 2. Configurar o banco de dados

Certifique-se de possuir um banco de dados **MySQL** em execução.

Configure as informações de conexão no arquivo:

```text
Backend/src/main/resources/application.properties
```

Depois, execute o script:

```text
Backend/src/main/resources/schema.sql
```

para criar a tabela `produto`.

---

# ▶️ Executando o Back-end

Entre na pasta:

```bash
cd Backend
```

Execute a aplicação utilizando o Maven:

```bash
./mvnw spring-boot:run
```

No Windows:

```bash
mvnw.cmd spring-boot:run
```

A API ficará disponível em:

```text
http://localhost:8080
```

---

# ▶️ Executando o Front-end

Em outro terminal, entre na pasta:

```bash
cd Frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O Vite disponibilizará a aplicação no endereço apresentado no terminal, normalmente:

```text
http://localhost:5173
```

---

# 🌐 CORS

Como o Front-end e o Back-end são executados em portas diferentes durante o desenvolvimento, a API possui uma configuração de **CORS** permitindo a comunicação entre as aplicações.

A configuração atual permite requisições provenientes de:

```text
http://localhost:5173
```

---

# 🎓 Projeto acadêmico

Projeto desenvolvido individualmente para as disciplinas de **Front-end** e **Programação Web** da **São Paulo Tech School (SPTech)**.

**Aluno:** Rafael Alexandre

**Curso:** Análise de Desenvolvimento de Sistemas

**Projeto:** Projeto Individual — 3º Semestre

**Ano:** 2026
