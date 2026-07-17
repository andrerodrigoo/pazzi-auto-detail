-- PAZZI AUTO DETAIL — Schema Supabase
-- Execute este arquivo no SQL Editor do seu projeto Supabase.

create extension if not exists "uuid-ossp";

-- ==========================================================
-- Tabela: conversations
-- Um registro por agendamento/conversa iniciada pelo cliente.
-- ==========================================================
create table if not exists conversations (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  status text not null default 'novo' check (status in ('novo', 'em_andamento', 'concluido')),
  customer_name text,
  vehicle text,
  service text,
  city text,
  zip_code text,
  preferred_date text,
  preferred_time text,
  notes text
);

-- ==========================================================
-- Tabela: messages
-- Histórico de mensagens de cada conversa (cliente/equipe/bot).
-- ==========================================================
create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  created_at timestamptz not null default now(),
  sender text not null check (sender in ('cliente', 'equipe', 'bot')),
  content text not null
);

-- ==========================================================
-- Tabela: services (opcional — permite editar serviços sem deploy)
-- ==========================================================
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  name_en text not null,
  name_pt text not null,
  description_en text,
  description_pt text,
  active boolean not null default true,
  sort_order int not null default 0
);

-- ==========================================================
-- Row Level Security
-- ==========================================================
alter table conversations enable row level security;
alter table messages enable row level security;
alter table services enable row level security;

-- Qualquer visitante (chave anon) pode CRIAR uma conversa e mensagens
-- (isso é o que o chat público faz), mas não pode ler dados de outros
-- clientes. Leitura/gestão completa é feita pelo painel admin usando a
-- service role key (que ignora RLS) nas API routes do servidor.
create policy "Public can insert conversations"
  on conversations for insert
  to anon
  with check (true);

create policy "Public can insert messages"
  on messages for insert
  to anon
  with check (true);

-- Serviços são públicos para leitura (usados no site), gestão só via admin.
create policy "Public can read active services"
  on services for select
  to anon
  using (active = true);

-- Usuários autenticados (equipe, via Supabase Auth) têm acesso total.
create policy "Authenticated full access conversations"
  on conversations for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated full access messages"
  on messages for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated full access services"
  on services for all
  to authenticated
  using (true)
  with check (true);

-- ==========================================================
-- Seed inicial de serviços (opcional)
-- ==========================================================
insert into services (name_en, name_pt, description_en, description_pt, sort_order) values
  ('Exterior Detail', 'Detalhamento Externo', 'Foam wash, clay bar, machine polish, and sealant.', 'Lavagem em espuma, clay bar, polimento e selante.', 1),
  ('Interior Restoration', 'Restauração de Interior', 'Deep steam cleaning, leather conditioning, odor elimination.', 'Limpeza a vapor, hidratação de couro, eliminação de odores.', 2),
  ('Ceramic Coating', 'Vitrificação Cerâmica', 'Multi-year paint protection.', 'Proteção de pintura de longa duração.', 3),
  ('Paint Correction', 'Correção de Pintura', 'Swirl and scratch removal.', 'Remoção de riscos e marcas de redemoinho.', 4),
  ('Engine Bay Detail', 'Detalhamento de Motor', 'Safe degreasing and dressing.', 'Desengraxe seguro e acabamento.', 5),
  ('Fleet & Business', 'Frotas e Empresas', 'Recurring detailing packages.', 'Pacotes recorrentes de detalhamento.', 6)
on conflict do nothing;
