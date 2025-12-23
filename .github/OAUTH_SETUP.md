# 🔐 Configuração do GitHub OAuth

## Problema: Não consigo adicionar duas Authorization callback URLs

O GitHub OAuth App **permite apenas 1 callback URL por app**. A solução é criar **2 apps OAuth separados**:

- 🏠 Um para **desenvolvimento local**
- 🌐 Um para **produção**

---

## ✅ Solução: Criar 2 GitHub OAuth Apps

### 📝 Passo a Passo Completo

#### 1️⃣ Criar OAuth App para DESENVOLVIMENTO

1. **Acesse:** https://github.com/settings/developers
2. **Clique em:** "New OAuth App"
3. **Preencha:**
   ```
   Application name: Move.it (Local Development)
   Homepage URL: http://localhost:3000
   Authorization callback URL: http://localhost:3000/api/auth/callback/github
   ```
4. **Clique em:** "Register application"
5. **Copie o Client ID**
6. **Clique em:** "Generate a new client secret"
7. **Copie o Client Secret** (só aparece uma vez!)

#### 2️⃣ Configurar .env.local (Desenvolvimento)

Crie/edite o arquivo `.env.local` na raiz do projeto:

```env
# NextAuth Configuration (DESENVOLVIMENTO)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu-secret-gerado-com-openssl

# GitHub OAuth (DESENVOLVIMENTO)
GITHUB_ID=Ov23li1JifL4uSlpIRiw
GITHUB_SECRET=77bf20f960a4d5b7e31ae02d5878159517a9db34
```

**Gerar NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

#### 3️⃣ Criar OAuth App para PRODUÇÃO

1. **Acesse:** https://github.com/settings/developers
2. **Clique em:** "New OAuth App"
3. **Preencha:**
   ```
   Application name: Move.it (Production)
   Homepage URL: https://moveit-mbreno.vercel.app
   Authorization callback URL: https://moveit-mbreno.vercel.app/api/auth/callback/github
   ```
4. **Clique em:** "Register application"
5. **Copie o Client ID**
6. **Clique em:** "Generate a new client secret"
7. **Copie o Client Secret** (só aparece uma vez!)

#### 4️⃣ Configurar Variáveis de Ambiente no Vercel

1. **Acesse:** https://vercel.com/seu-usuario/moveit-mbreno/settings/environment-variables

2. **Adicione as seguintes variáveis:**

   | Nome              | Valor                              | Ambiente                         |
   | ----------------- | ---------------------------------- | -------------------------------- |
   | `NEXTAUTH_URL`    | `https://moveit-mbreno.vercel.app` | Production                       |
   | `NEXTAUTH_SECRET` | `novo-secret-diferente-do-dev`     | Production, Preview, Development |
   | `GITHUB_ID`       | `client-id-do-app-de-producao`     | Production                       |
   | `GITHUB_SECRET`   | `client-secret-do-app-de-producao` | Production                       |

3. **Gere um novo NEXTAUTH_SECRET para produção:**

   ```bash
   openssl rand -base64 32
   ```

   ⚠️ Use um secret **diferente** do desenvolvimento!

4. **Salve e faça redeploy**

---

## 📊 Resumo da Configuração

### Ambiente de Desenvolvimento (Local)

```
GitHub OAuth App: Move.it (Local Development)
Callback URL: http://localhost:3000/api/auth/callback/github

.env.local:
  NEXTAUTH_URL=http://localhost:3000
  GITHUB_ID=<dev-client-id>
  GITHUB_SECRET=<dev-client-secret>
```

### Ambiente de Produção (Vercel)

```
GitHub OAuth App: Move.it (Production)
Callback URL: https://moveit-mbreno.vercel.app/api/auth/callback/github

Vercel Environment Variables:
  NEXTAUTH_URL=https://moveit-mbreno.vercel.app
  GITHUB_ID=<prod-client-id>
  GITHUB_SECRET=<prod-client-secret>
```

---

## 🔍 Verificação

### ✅ Desenvolvimento funciona?

```bash
npm run dev
# Acesse: http://localhost:3000
# Teste o login
```

### ✅ Produção funciona?

```
# Acesse: https://moveit-mbreno.vercel.app
# Teste o login
```

---

## ⚠️ Problemas Comuns

### Erro: "redirect_uri_mismatch"

**Causa:** O callback URL não está configurado no GitHub OAuth App

**Solução:**

1. Verifique se está usando o OAuth App correto
2. Confirme que o callback URL está **exatamente** como:
   - Local: `http://localhost:3000/api/auth/callback/github`
   - Prod: `https://moveit-mbreno.vercel.app/api/auth/callback/github`
3. Não pode ter `/` no final
4. Protocolo correto: `http://` (local) ou `https://` (prod)

### Login local redireciona para produção

**Causa:** `.env.local` com `NEXTAUTH_URL` de produção

**Solução:**

```bash
# Verifique o .env.local
cat .env.local

# Deve ter:
NEXTAUTH_URL=http://localhost:3000
```

### Produção usa credenciais de desenvolvimento

**Causa:** Variáveis de ambiente não configuradas no Vercel

**Solução:**

1. Acesse: Vercel → Projeto → Settings → Environment Variables
2. Adicione as variáveis de produção
3. Redeploy

---

## 🎯 Vantagens de Apps Separados

✅ **Segurança:** Credenciais de produção separadas
✅ **Isolamento:** Problema em dev não afeta prod
✅ **Revogação:** Revogar acesso por ambiente
✅ **Auditoria:** Logs separados por ambiente
✅ **Flexibilidade:** Configurações independentes

---

## 📌 Checklist Final

- [ ] Dois GitHub OAuth Apps criados
- [ ] `.env.local` configurado com app de desenvolvimento
- [ ] Vercel configurado com app de produção
- [ ] Secrets diferentes entre dev e prod
- [ ] Login testado localmente
- [ ] Login testado em produção
- [ ] `.env.local` no `.gitignore` (nunca commitar!)

---

## 🆘 Ainda com problemas?

1. Verifique se o app do GitHub está **ativo**
2. Confirme que os callbacks estão **exatamente** corretos
3. Limpe o cache do navegador
4. Tente em uma aba anônima
5. Verifique os logs do Vercel: `vercel logs`

---

**Documentação Oficial:**

- [NextAuth.js - Providers](https://next-auth.js.org/providers/github)
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps)
