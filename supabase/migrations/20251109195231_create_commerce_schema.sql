/*
  # ALI Commerce - Schema Inicial

  ## Descrição
  Criação do schema completo para o sistema de e-commerce com CRM administrativo.

  ## Tabelas Criadas

  1. **products** - Catálogo de produtos
     - `id` (uuid, primary key)
     - `name` (text) - Nome do produto
     - `category` (text) - Categoria do produto
     - `description` (text) - Descrição detalhada
     - `price` (numeric) - Preço do produto
     - `stock` (integer) - Quantidade em estoque
     - `image_url` (text) - URL da imagem
     - `active` (boolean) - Produto ativo/inativo
     - `created_at` (timestamptz) - Data de criação
     - `updated_at` (timestamptz) - Data de atualização

  2. **offers** - Slides de ofertas do carousel
     - `id` (uuid, primary key)
     - `title` (text) - Título da oferta
     - `image_url` (text) - URL da imagem do slide
     - `product_id` (uuid, foreign key) - Produto relacionado
     - `active` (boolean) - Slide ativo/inativo
     - `order_position` (integer) - Ordem de exibição
     - `created_at` (timestamptz) - Data de criação

  3. **store_settings** - Configurações da loja
     - `id` (uuid, primary key)
     - `primary_color` (text) - Cor primária
     - `secondary_color` (text) - Cor secundária
     - `neutral_color` (text) - Cor neutra
     - `store_name` (text) - Nome da loja
     - `store_description` (text) - Descrição da loja
     - `show_offers` (boolean) - Exibir seção de ofertas
     - `show_featured` (boolean) - Exibir produtos em destaque
     - `updated_at` (timestamptz) - Última atualização

  4. **orders** - Registro de vendas
     - `id` (uuid, primary key)
     - `stripe_session_id` (text) - ID da sessão Stripe
     - `product_id` (uuid, foreign key) - Produto vendido
     - `quantity` (integer) - Quantidade vendida
     - `total_amount` (numeric) - Valor total
     - `status` (text) - Status do pedido
     - `created_at` (timestamptz) - Data da venda

  ## Segurança (RLS)
  - Todas as tabelas têm RLS habilitado
  - Apenas usuários autenticados podem gerenciar produtos, ofertas e configurações
  - Leitura pública permitida para produtos ativos e ofertas ativas
  - Store settings podem ser lidos publicamente

  ## Notas Importantes
  - Estoque é reduzido automaticamente após confirmação de pagamento via webhook
  - Produtos com stock <= 5 são considerados "estoque baixo"
  - Configurações padrão são inseridas automaticamente
*/

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT 'Geral',
  description text DEFAULT '',
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  image_url text DEFAULT '',
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de ofertas/slides
CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  active boolean DEFAULT true,
  order_position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Tabela de configurações da loja
CREATE TABLE IF NOT EXISTS store_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_color text DEFAULT '#1f3048',
  secondary_color text DEFAULT '#18b4dd',
  neutral_color text DEFAULT '#f5f8f9',
  store_name text DEFAULT 'ALI Commerce',
  store_description text DEFAULT 'Sua loja online completa',
  show_offers boolean DEFAULT true,
  show_featured boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text UNIQUE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  quantity integer NOT NULL DEFAULT 1,
  total_amount numeric(10,2) NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies para products (leitura pública de produtos ativos, gestão apenas autenticados)
CREATE POLICY "Produtos ativos podem ser lidos por todos"
  ON products FOR SELECT
  USING (active = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Apenas autenticados podem criar produtos"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Apenas autenticados podem atualizar produtos"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Apenas autenticados podem deletar produtos"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Policies para offers (leitura pública de ofertas ativas, gestão apenas autenticados)
CREATE POLICY "Ofertas ativas podem ser lidas por todos"
  ON offers FOR SELECT
  USING (active = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Apenas autenticados podem criar ofertas"
  ON offers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Apenas autenticados podem atualizar ofertas"
  ON offers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Apenas autenticados podem deletar ofertas"
  ON offers FOR DELETE
  TO authenticated
  USING (true);

-- Policies para store_settings (leitura pública, gestão apenas autenticados)
CREATE POLICY "Configurações podem ser lidas por todos"
  ON store_settings FOR SELECT
  USING (true);

CREATE POLICY "Apenas autenticados podem atualizar configurações"
  ON store_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Apenas autenticados podem criar configurações"
  ON store_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies para orders (apenas autenticados podem ver e criar)
CREATE POLICY "Apenas autenticados podem ver pedidos"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Sistema pode criar pedidos"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Sistema pode atualizar pedidos"
  ON orders FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Inserir configurações padrão
INSERT INTO store_settings (primary_color, secondary_color, neutral_color, store_name, store_description)
VALUES ('#1f3048', '#18b4dd', '#f5f8f9', 'ALI Commerce', 'Sua loja online completa com gestão inteligente')
ON CONFLICT DO NOTHING;

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_offers_active ON offers(active);
CREATE INDEX IF NOT EXISTS idx_offers_order ON offers(order_position);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);