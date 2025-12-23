<h1 align="center">
  <img alt="move.it" title="move.it" src=".github/logo.png" />
</h1>

<p align="center">
  <a href="#-next-level-week-04">Next Level Week 04</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000">
  <img src="https://img.shields.io/static/v1?label=NLW&message=04&color=8257E5&labelColor=000000" alt="NLW 04" />
  <img src="https://github.com/mbrenodev/nlw-mode.it/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
</p>

<br>

## 💡 Next Level Week 04

A **Next Level Week #04 (NLW)** é uma semana prática promovida pela [Rocketseat](https://rocketseat.com.br/formacao/fullstack) com muito código, desafios, networking e aprendizado intensivo.

Durante o evento, desenvolvemos o **move.it**, uma aplicação web que une a técnica de Pomodoro com a prática de exercícios físicos — ideal para quem passa muitas horas sentado na frente do computador.

Este projeto foi conduzido pelo instrutor [Diego Fernandes](https://github.com/diego3g).

---

## ✨ Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org)
- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [NextAuth.js](https://next-auth.js.org) - Autenticação com GitHub OAuth
- [js-cookie](https://github.com/js-cookie/js-cookie)
- PWA - Progressive Web App
- Notifications API - Sistema de notificações do navegador
- Vibration API - Feedback tátil em dispositivos móveis

---

## 📱 Projeto

O **move.it** é um app de produtividade com gamificação que:

- ⏱️ Utiliza a técnica de Pomodoro para dividir o tempo em ciclos de foco
- 🏃 Estimula pausas ativas com desafios físicos e mentais
- 🎮 Traz elementos de XP e níveis para manter o usuário engajado
- 🔔 Sistema de notificações desktop com sons personalizáveis
- 📱 Suporte completo a PWA (instalável em dispositivos móveis)
- 📳 Vibração em dispositivos móveis para feedback tátil
- 🔐 Autenticação via GitHub OAuth
- 🌓 Tema dark mode

### ✨ Funcionalidades Extras:

- **Sistema de Notificações Configurável:**
  - 4 opções de sons de notificação
  - Notificações de progresso (50%, 75%, 90%)
  - Controle de vibração para dispositivos móveis
  - Teste de som e notificações antes de salvar

- **PWA (Progressive Web App):**
  - Instalável em Android e iOS
  - Funciona offline após primeiro carregamento
  - Ícone na tela inicial
  - Experiência mobile otimizada

### 🎥 Demonstração:

https://github.com/mbrenodev/nlw-mode.it/assets/46978490/3904be3e-4b56-492d-8aee-1284334749fc

---

## 🚀 Como executar

### Pré-requisitos

- Node.js (recomendado: v18 ou superior)
- Gerenciador de pacotes: `npm` ou `yarn`
- Conta no GitHub (para autenticação OAuth)

### Passos para rodar localmente:

```bash
# Clone o repositório
git clone https://github.com/mbrenodev/moveit-next.git

# Acesse a pasta do projeto
cd moveit-next

# Instale as dependências
npm install
# ou
yarn
```

### ⚙️ Configuração de Variáveis de Ambiente

1. **Crie um arquivo `.env.local` na raiz do projeto:**

```bash
cp .env.exemple .env.local
```

2. **Configure as variáveis de ambiente:**

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu-secret-aqui

# GitHub OAuth
GITHUB_ID=seu-github-client-id
GITHUB_SECRET=seu-github-client-secret
```

3. **Gere um secret seguro:**

```bash
openssl rand -base64 32
```

4. **Configure o GitHub OAuth App:**
   - Acesse: https://github.com/settings/developers
   - Clique em "New OAuth App"
   - Preencha:
     - **Application name:** Move.it Local
     - **Homepage URL:** `http://localhost:3000`
     - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
   - Copie o **Client ID** e gere um **Client Secret**
   - Cole os valores no arquivo `.env.local`

5. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em: **http://localhost:3000**

### 🌐 Deploy para Produção (Vercel)

1. **Configure as variáveis de ambiente no Vercel:**
   - `NEXTAUTH_URL=https://seu-dominio.vercel.app`
   - `NEXTAUTH_SECRET=seu-secret-de-producao`
   - `GITHUB_ID=seu-github-client-id`
   - `GITHUB_SECRET=seu-github-client-secret`

2. **Adicione o callback de produção no GitHub OAuth App:**
   - `https://seu-dominio.vercel.app/api/auth/callback/github`

3. **Deploy:**
   - O Vercel faz deploy automático ao fazer push no repositório

---

### 📦 Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor Next.js em modo desenvolvimento |
| `npm run build` | Cria o build de produção |
| `npm start` | Inicia o servidor Next.js com o build de produção |
| `npm run lint` | Executa o ESLint para verificar problemas no código |
| `npm run lint:fix` | Executa o ESLint e corrige problemas automaticamente |
| `npm run format` | Formata o código usando Prettier |
| `npm run format:check` | Verifica se o código está formatado corretamente |

### 🔄 CI/CD

O projeto possui integração contínua configurada com GitHub Actions que:

- ✅ Executa ESLint em cada push/PR
- ✅ Verifica formatação do código com Prettier
- ✅ Valida tipos TypeScript
- ✅ Testa o build de produção
- ✅ Armazena artefatos do build por 7 dias

O workflow é executado automaticamente em:
- Push nas branches `main` e `develop`
- Pull requests para `main` e `develop`

---

### 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais informações.

Feito com ♥ por Márcio Breno 👋🏻
[LinkedIn](https://www.linkedin.com/in/mbrenodev/)
