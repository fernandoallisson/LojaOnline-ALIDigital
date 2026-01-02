/*
  # Criar tabela de categorias

  1. Nova Tabela
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text) - Nome da categoria
      - `slug` (text) - URL amigável
      - `icon` (text) - Nome do ícone Lucide
      - `color` (text) - Cor da categoria
      - `active` (boolean) - Se está ativa
      - `order_position` (integer) - Ordem de exibição
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Segurança
    - Habilitar RLS na tabela `categories`
    - Adicionar política para leitura pública de categorias ativas
    - Adicionar políticas para usuários autenticados gerenciarem categorias
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon text DEFAULT 'Tag',
  color text DEFAULT '#1f3048',
  active boolean DEFAULT true,
  order_position integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um pode ver categorias ativas"
  ON categories
  FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Usuários autenticados podem inserir categorias"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem atualizar categorias"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem deletar categorias"
  ON categories
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(active);
CREATE INDEX IF NOT EXISTS idx_categories_order ON categories(order_position);