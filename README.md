# TriageFlow-API 🚀

![Google Gemini](https://img.shields.io/badge/google%20gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

## 📝 Descrição

O **TriageFlow-API** é uma solução de back-end escalável voltada para a triagem inteligente e automatizada de tickets de atendimento. Utilizando a inteligência artificial do Google Gemini, a API é capaz de ler o texto bruto de uma solicitação, interpretar o contexto e classificar automaticamente o canal responsável (SAC, Ouvidoria, Suporte Técnico, Financeiro, Fora de Escopo, Revisão Manual) e o nível de prioridade (Baixa, Média, Alta) diretamente no banco de dados.

---

## ⭐ Diferenciais Implementados (Qualidade Sênior)

Para elevar o nível do projeto técnico, foram desenvolvidos os seguintes diferenciais arquiteturais e de infraestrutura exigidos em produção:

- **🐳 Docker & Docker Compose:** Toda a aplicação (API Node + Banco PostgreSQL) roda de forma conteinerizada com apenas um comando. O banco de dados se auto-estrutura via Prisma dinamicamente no boot do container.
- **🪵 Logs Estruturados (Pino):** Substituição de consoles comuns por logs estruturados em formato JSON com níveis de severidade (`info`, `error`), integrando perfeitamente com ferramentas modernas de monitoramento.
- **📐 Arquitetura Limpa em Camadas (MSC):** Separação estrita de responsabilidades entre Rotas, Controllers, Services, Repositories e integração do Prisma Client.
- **🛡️ Tratamento de Erros e Validações:** Validação de dados de entrada nas requisições HTTP e tratamento de falhas na comunicação com a API do Gemini, garantindo a resiliência do sistema.
- **🧠 Casos Ambíguos e Revisão Manual:** O prompt da IA foi configurado para identificar mensagens confusas ou vagas e sinalizá-las para `revisao_manual`, evitando classificações errôneas.
- **⚡ Mocks Avançados no Jest:** Os testes automatizados utilizam `jest.spyOn` para interceptar e simular as respostas da IA. Isso elimina a dependência de internet, evita o consumo da cota da API (Erro 429) e reduz o tempo dos testes para pouco mais de 1 segundo.
- **🔌 REST Client Integrado (`api.http`):** Um arquivo na raiz do projeto contendo todas as requisições prontas. O avaliador consegue testar todas as rotas e fluxos da API com apenas um clique direto pelo VS Code.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** & **Express** (Ambiente de execução e Framework HTTP)
- **TypeScript** (Tipagem estática para maior segurança do código)
- **Prisma ORM** (Modelagem e consumo do banco de dados)
- **PostgreSQL** (Banco de dados relacional para persistência)
- **Google Gemini AI SDK** (Motor de inteligência artificial para triagem contextual)
- **Pino & Pino-Pretty** (Biblioteca de logging assíncrono de altíssima performance)
- **Jest** (Framework para testes automatizados)

---

## 🐳 Como Rodar a Aplicação via Docker (Recomendado)

O Docker é a forma mais rápida e prática de rodar e avaliar este projeto. Você não precisará configurar ou instalar um banco PostgreSQL na sua máquina local.

### 1. Clonar o Repositório

```bash
git clone [https://github.com/heitorsantana-hub/TriageFlow-API.git](https://github.com/heitorsantana-hub/TriageFlow-API.git)
cd TriageFlow-API
```

### 2. Configurar a Chave da IA

Crie um arquivo chamado `.env` na raiz do projeto e insira apenas a sua chave de acesso do Google AI Studio (o banco será configurado automaticamente pelo Docker):

```env
GEMINI_API_KEY="SUA_CHAVE_DE_ACESSO_DO_GOOGLE_AI_STUDIO"
```

### 3. Subir os Containers

Com o Docker Desktop aberto no seu sistema, execute o comando abaixo no terminal da raiz do projeto:

```bash
docker compose up --build
```

> 💡 _Esse comando irá baixar a imagem do Postgres, configurar o banco de dados, aplicar as tabelas (migrations do Prisma), preparar a API e iniciá-la na porta de acesso público._

A API estará online e pronta em: **`http://localhost:8989`**

---

## 🛠️ Como Rodar a Aplicação Localmente (Sem Docker)

Se preferir rodar direto no seu sistema operacional, certifique-se de ter o **Node.js (v20+)** e o **PostgreSQL** ativos localmente.

1. Instale as dependências:

```bash
npm install

```

2. Crie e configure o arquivo `.env` na raiz:

```env
PORT=8989
DATABASE_URL="postgresql://usuario:senha@localhost:5432/triageflow_db?schema=public"
GEMINI_API_KEY="SUA_CHAVE_DE_ACESSO_DO_GOOGLE_AI_STUDIO"
```

3. Execute as Migrations do Prisma para criar as tabelas:

```bash
npx prisma db push
```

4. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

A API estará online e pronta em: **`http://localhost:8989`**

---

## 🧪 Como Rodar os Testes Automatizados

Para executar a suite completa de testes unitários e de integração desenvolvidos com Jest (incluindo mock da IA e validação de todas as regras de negócio), utilize:

```bash
npm test
```

---

## 🔌 Como Testar as Rotas Usando o `api.http`

Na raiz do projeto, você encontrará o arquivo **`api.http`**. Ele funciona como uma coleção de rotas interativa de teste (alternativa ao Postman) direto no seu editor de código.

1. Abra o VS Code e vá na aba de extensões (`Ctrl+Shift+X` ou `Cmd+Shift+X`).
2. Pesquise e instale a extensão oficial **REST Client** (criada por _Huachao Mao_).
3. Abra o arquivo **`api.http`** na raiz.
4. Clique na opção cinza **`Send Request`** que aparecerá sobreposta a cada rota. A resposta detalhada em JSON aparecerá na aba direita instantaneamente!

---

## 🛣️ API Endpoints

### 🔍 Monitoramento

- **`GET /health`** - Verifica se a API está saudável e online (Retorna `200 OK`).

### 🎫 Módulo de Tickets

- **`POST /tickets`** - Cria e classifica um ticket automaticamente via IA.
- **Envio (Body JSON):**

```json
{
  "textoSolicitacao": "Quero denunciar de forma anônima uma fraude financeira em andamento no departamento de contas."
}
```

- **Resposta (IA):**

```json
{
  "id": 1,
  "textoSolicitacao": "Quero denunciar de forma anônima uma fraude financeira em andamento no departamento de contas.",
  "canal": "ouvidoria",
  "prioridade": "ALTA",
  "status": "aberto",
  "createdAt": "2026-07-15T15:52:00.000Z"
}
```

- **`GET /tickets`** - Lista todos os tickets criados.
- **`GET /tickets/:id`** - Busca detalhes de um ticket específico.
- **`PUT /tickets/:id/status`** - Atualiza exclusivamente o status do ticket (ex: para `em_atendimento` ou `resolvido`).

### 👤 Módulo de Usuários

- **`POST /users`** - Cadastro de novo usuário.
- **`GET /users`** - Listagem de todos os usuários.
- **`GET /users/:id`** - Detalhes do usuário por ID.
- **`PUT /users/:id`** - Atualização de dados.
- **`DELETE /users/:id`** - Remoção lógica/física do usuário.

---

## 📄 Licença

Este projeto está sob a licença MIT.
