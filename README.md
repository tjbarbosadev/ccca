# CCCA

Projeto de aprendizado do curso **Clean Code e Clean Architecture** do [Rodrigo Branas](https://www.youtube.com/@codigoavista).

Repositório para construir, passo a passo, uma aplicação backend com TypeScript, testes, banco de dados e boas práticas de desenvolvimento.

## Stack atual

| Área | Tecnologia |
|------|------------|
| Linguagem | TypeScript 6 (ESM / `nodenext`) |
| Runtime | Node.js |
| HTTP | Express 5 |
| Banco | PostgreSQL 14 (Docker) + pg-promise |
| HTTP client | Axios |
| Testes | Jest 30 + ts-jest |
| Dev server | nodemon + ts-node |
| Lint | ESLint 10 + typescript-eslint |
| Formatação | Prettier |
| Git hooks | Husky 9 |
| Commits | Commitlint + Commitizen (Conventional Commits) |
| Containers | Docker Compose |

## Pré-requisitos

- Node.js 20+
- npm
- Docker e Docker Compose
- Git

## Montar do zero (ordem de criação)

Siga esta ordem para reproduzir o que foi configurado no projeto.

### 1. Projeto Node + TypeScript

```bash
mkdir ccca && cd ccca
npm init -y
```

No `package.json`, defina `"type": "module"` para usar ESM.

Instale TypeScript e tipos:

```bash
npm install typescript ts-node @types/node --save-dev
npx tsc --init
```

Ajuste o `tsconfig.json` para `module: nodenext`, `strict: true` e `include: ["src", "test"]`.

Crie o código inicial em `src/main.ts`.

### 2. Testes com Jest (ESM)

```bash
npm install jest ts-jest @types/jest --save-dev
```

Crie `jest.config.js` com o preset ESM do ts-jest e `moduleNameMapper` para imports `.js` em arquivos `.ts`.

No `package.json`:

```json
"test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
```

Crie testes em `test/`. Use `npm test` (não `npx jest` direto — o flag `--experimental-vm-modules` é necessário).

### 3. Ambiente de desenvolvimento

```bash
npm install nodemon --save-dev
```

Script `dev` com nodemon + ts-node:

```json
"dev": "nodemon --watch src --ext ts --exec ts-node src/main.ts"
```

### 4. Banco de dados (Docker)

Crie `database/create.sql` com o schema inicial e `docker/docker-compose.yaml` com PostgreSQL.

```bash
npm pkg set scripts.compose:up="docker compose -f docker/docker-compose.yaml up -d"
npm pkg set scripts.compose:down="docker compose -f docker/docker-compose.yaml down -v"
```

Suba o banco:

```bash
npm run compose:up
```

Conexão local: `postgres://postgres:123456@localhost:5432/app`

### 5. Dependências da aplicação

```bash
npm install express axios pg-promise
npm install @types/express --save-dev
```

### 6. Husky (git hooks)

```bash
npm install husky --save-dev
npm pkg set scripts.prepare=husky
npx husky init
```

Crie os hooks em `.husky/` (a pasta `_/` interna é gerada automaticamente e **não** vai pro Git).

### 7. Commitlint (padrão de mensagens)

```bash
npm install @commitlint/cli @commitlint/config-conventional --save-dev
```

Crie `commitlint.config.js`:

```js
export default {
  extends: ["@commitlint/config-conventional"],
};
```

Crie `.husky/commit-msg`:

```sh
npx --no -- commitlint --edit $1
```

### 8. Commitizen (commits interativos)

```bash
npm install commitizen cz-conventional-changelog --save-dev --save-exact
npx commitizen init cz-conventional-changelog --npm --dev --exact
```

Adicione o script:

```json
"commit": "cz"
```

Use `npm run commit` para gerar mensagens no formato `feat:`, `fix:`, etc.

### 9. ESLint + Prettier

```bash
npm install -D eslint typescript-eslint prettier eslint-config-prettier eslint-plugin-jest globals @eslint/js
```

Crie `eslint.config.js` (flat config), `.prettierrc` e `.prettierignore`.

Scripts:

```json
"lint": "eslint .",
"lint:fix": "eslint . --fix",
"format": "prettier --write .",
"format:check": "prettier --check ."
```

### 10. Pre-commit (lint + testes)

Edite `.husky/pre-commit`:

```sh
npm run lint
npm test
```

## Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Sobe a aplicação com hot reload |
| `npm test` | Roda os testes |
| `npm run lint` | Verifica o código com ESLint |
| `npm run lint:fix` | Corrige problemas de lint automaticamente |
| `npm run format` | Formata o código com Prettier |
| `npm run format:check` | Verifica formatação sem alterar arquivos |
| `npm run commit` | Commit interativo (Commitizen) |
| `npm run compose:up` | Sobe o PostgreSQL no Docker |
| `npm run compose:down` | Para e remove o container/volume do banco |

## Fluxo de commit

```
git add .
npm run commit          # ou git commit -m "feat: ..."
        │
        ├─► pre-commit  → lint + testes
        └─► commit-msg  → commitlint valida a mensagem
```

Mensagens devem seguir [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona caso de uso de signup
fix: corrige validação de documento
chore: atualiza dependências
```

## Estrutura do projeto

```
ccca/
├── database/
│   └── create.sql          # Schema inicial (ccca.account)
├── docker/
│   └── docker-compose.yaml # PostgreSQL local
├── src/
│   └── main.ts             # Código da aplicação
├── test/
│   └── main.test.ts        # Testes
├── .husky/
│   ├── pre-commit          # lint + testes
│   └── commit-msg          # commitlint
├── commitlint.config.js
├── eslint.config.js
├── jest.config.js
├── tsconfig.json
└── package.json
```

## Documentação local

A pasta `docs/` contém anotações pessoais de aprendizado (PRD, SDD e skills). Ela é **ignorada pelo Git** e fica apenas na sua máquina.

## Referências

- [Curso Clean Code e Clean Architecture — Rodrigo Branas](https://www.youtube.com/@codigoavista)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Husky](https://typicode.github.io/husky/)
- [typescript-eslint](https://typescript-eslint.io/)
