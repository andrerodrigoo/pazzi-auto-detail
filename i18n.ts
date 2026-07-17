# Pazzi Auto Detail — Website Premium

Site institucional + agendamento via chat próprio para a Pazzi Auto Detail
(Mobile Auto Detailing, Flórida). Construído com Next.js 14 (App Router),
TypeScript, Tailwind CSS, Framer Motion, Supabase, Resend e React Hook Form + Zod.

## Stack

- **Next.js 14 / React 18 / TypeScript**
- **Tailwind CSS** — design system próprio (ver `tailwind.config.ts`)
- **Framer Motion** — animações de entrada e transições
- **Supabase** — banco de dados (conversas, mensagens, serviços) + Auth do painel admin
- **Resend** — e-mail de notificação de nova conversa
- **React Hook Form + Zod** — validação do formulário do chat
- **Lucide Icons**

## Estrutura do projeto

```
pazzi-auto-detail/
├── app/
│   ├── layout.tsx          # fontes, metadata, provider de idioma
│   ├── page.tsx            # monta todas as seções da home
│   ├── globals.css         # tokens visuais (cores, tipografia)
│   ├── admin/page.tsx      # painel administrativo protegido
│   └── api/chat/route.ts   # recebe agendamentos do chat
├── components/             # Hero, Services, Gallery, ChatWidget, etc.
├── lib/
│   ├── i18n.ts             # dicionário EN/PT
│   ├── language-context.tsx
│   ├── supabase.ts         # clientes browser/admin
│   └── whatsapp.ts         # notificação de novo agendamento
├── public/images/          # fotos reais dos veículos
├── supabase/schema.sql     # schema + RLS
└── .env.example
```

## 1. Execução local

```bash
npm install
cp .env.example .env.local
# preencha as variáveis (ver seções abaixo)
npm run dev
```

Acesse `http://localhost:3000`. O painel admin fica em `http://localhost:3000/admin`.

## 2. Configuração do Supabase

1. Crie um projeto em [supabase.com](https://supabase.com) (plano gratuito é suficiente para começar).
2. Vá em **SQL Editor** e execute o conteúdo de `supabase/schema.sql`. Isso cria as tabelas
   `conversations`, `messages`, `services` e as políticas de RLS (o site só pode *inserir*
   conversas; leitura/gestão completa é feita pelo painel admin).
3. Em **Authentication > Users**, crie manualmente o usuário da equipe (email + senha) que
   vai logar em `/admin`.
4. Em **Project Settings > API**, copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (nunca exponha no client)

## 3. Configuração do Resend (e-mail)

1. Crie conta gratuita em [resend.com](https://resend.com).
2. Gere uma API key em **API Keys** e coloque em `RESEND_API_KEY`.
3. Para produção, verifique um domínio próprio em **Domains** e troque o
   remetente `from` em `app/api/chat/route.ts` (por padrão usa
   `onboarding@resend.dev`, que funciona para testes mas tem limitações).
4. O e-mail de notificação é enviado para `leonpazinatti94@gmail.com` — para
   alterar o destinatário, edite `app/api/chat/route.ts`.

## 4. Configuração da notificação por WhatsApp

Toda a conversa acontece dentro do painel do site — o WhatsApp é usado **apenas**
para avisar a equipe que uma nova conversa chegou. Veja `lib/whatsapp.ts` para
os comentários completos. Resumo:

**Opção padrão (gratuita, recomendada para começar): CallMeBot**
1. No WhatsApp do número **+1 (561) 402-2903** (o que deve *receber* os avisos),
   adicione o contato `+34 644 51 95 23`.
2. Envie a mensagem `I allow callmebot to send me messages`.
3. O CallMeBot responde com uma API key.
4. Configure no `.env.local`:
   ```
   WHATSAPP_PROVIDER=callmebot
   WHATSAPP_PHONE=15614022903
   WHATSAPP_APIKEY=<key recebida>
   ```

**Opção avançada (não usada por padrão): whatsapp-web.js**
Biblioteca open-source que controla o WhatsApp Web via Puppeteer/Chromium.
Funciona bem, mas precisa de um processo Node.js rodando 24/7 com uma sessão
de navegador ativa — **não roda em funções serverless da Vercel**. Só faça
sentido migrar para isso se você tiver um VPS dedicado. Nesse caso, crie um
pequeno serviço separado (ex.: em um Droplet da DigitalOcean) que exponha um
endpoint `/notify` e troque a implementação em `lib/whatsapp.ts`.

**Migração futura: WhatsApp Business Cloud API (Meta)**
Quando o volume de clientes justificar, é só trocar `WHATSAPP_PROVIDER=cloud-api`
e preencher `WHATSAPP_CLOUD_PHONE_ID` / `WHATSAPP_CLOUD_TOKEN` (gerados no
[Meta for Developers](https://developers.facebook.com/)). A lógica de negócio
em `app/api/chat/route.ts` não precisa mudar — a troca de provider é isolada
em `lib/whatsapp.ts`.

## 5. Deploy na Vercel

1. Suba este projeto para um repositório no GitHub.
2. Em [vercel.com](https://vercel.com), clique em **New Project** e importe o repositório.
3. Em **Environment Variables**, adicione todas as variáveis do `.env.example`
   preenchidas com os valores reais.
4. Clique em **Deploy**. A Vercel detecta o Next.js automaticamente.
5. Configure seu domínio próprio em **Settings > Domains**.

## 6. Painel administrativo (`/admin`)

- Login via Supabase Auth (email/senha criados no passo 2.3).
- **Conversas**: lista agendamentos em aberto, permite responder o cliente
  (a resposta fica salva no histórico da conversa) e marcar como concluído.
- **Serviços**: instruções para editar os textos de serviços (hoje em
  `lib/i18n.ts`; o schema já inclui uma tabela `services` pronta para uma
  futura versão editável via painel, sem precisar de novo deploy).
- **Galeria**: instruções para trocar as fotos em `public/images`.
- **Histórico**: conversas já concluídas.

## 7. Imagens

As fotos reais dos veículos já detalhados pela Pazzi estão em `public/images/`
(Cybertruck, Ferrari Portofino, Land Rover Discovery Sport, Chevrolet Silverado,
BMW X3). Para adicionar novas fotos, salve-as em `public/images/` e referencie
o caminho em `components/Gallery.tsx` e/ou `components/Hero.tsx`.

## 8. SEO

O `metadata` em `app/layout.tsx` já está otimizado para os termos:
*Mobile Car Detailing Florida*, *Car Detailing Near Me*, *Luxury Car Detailing*,
*Interior Car Cleaning*, *Exterior Car Wash*. Ajuste conforme sua estratégia de
conteúdo (ex.: adicionar um blog para SEO de cauda longa).

## 9. Custos (resumo)

| Serviço | Plano gratuito cobre |
|---|---|
| Vercel | Sim, para tráfego inicial |
| Supabase | Sim (500MB DB, 50k usuários auth/mês) |
| Resend | Sim (3.000 e-mails/mês) |
| CallMeBot | Sim, sempre gratuito |

Tudo foi montado priorizando soluções gratuitas — a única troca paga futura
seria a WhatsApp Business Cloud API em alto volume, e um domínio próprio
verificado no Resend para remetente personalizado.
