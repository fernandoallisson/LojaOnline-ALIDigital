/*
  # Criar tabela de carrinho

  1. Nova Tabela
    - `cart_items`
      - `id` (uuid, primary key)
      - `session_id` (text) - ID da sessão do usuário
      - `product_id` (uuid) - Referência ao produto
      - `quantity` (integer) - Quantidade do produto
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Segurança
    - Habilitar RLS na tabela `cart_items`
    - Adicionar política para usuários lerem seu próprio carrinho
    - Adicionar políticas para gerenciar itens do carrinho
*/

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_cart_items_session_product 
  ON cart_items(session_id, product_id);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seu próprio carrinho"
  ON cart_items
  FOR SELECT
  USING (session_id = current_setting('app.session_id', true));

CREATE POLICY "Usuários podem adicionar itens ao seu carrinho"
  ON cart_items
  FOR INSERT
  WITH CHECK (session_id = current_setting('app.session_id', true));

CREATE POLICY "Usuários podem atualizar seu carrinho"
  ON cart_items
  FOR UPDATE
  USING (session_id = current_setting('app.session_id', true))
  WITH CHECK (session_id = current_setting('app.session_id', true));

CREATE POLICY "Usuários podem remover itens do seu carrinho"
  ON cart_items
  FOR DELETE
  USING (session_id = current_setting('app.session_id', true));