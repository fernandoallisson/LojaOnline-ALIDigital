/*
  # Criar tabela de banners para slideshow

  ## Descrição
  Tabela para gerenciar banners/promoções que aparecem como slideshow no início da página

  ## Novas Tabelas
  - `banners`
    - `id` (uuid, primary key)
    - `title` (text) - Título do banner
    - `description` (text) - Descrição/subtítulo
    - `image_url` (text) - URL da imagem do banner
    - `link_url` (text) - URL de destino ao clicar (opcional)
    - `active` (boolean) - Banner ativo/inativo
    - `order_position` (integer) - Ordem de exibição
    - `created_at` (timestamptz) - Data de criação
    - `updated_at` (timestamptz) - Data de atualização

  ## Segurança
  - RLS habilitado
  - Leitura pública para banners ativos
  - Apenas usuários autenticados podem gerenciar
*/

CREATE TABLE IF NOT EXISTS banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  image_url text NOT NULL,
  link_url text DEFAULT '',
  active boolean DEFAULT true,
  order_position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Banners ativos podem ser lidos por todos"
  ON banners FOR SELECT
  USING (active = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Apenas autenticados podem criar banners"
  ON banners FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Apenas autenticados podem atualizar banners"
  ON banners FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Apenas autenticados podem deletar banners"
  ON banners FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_banners_active ON banners(active);
CREATE INDEX IF NOT EXISTS idx_banners_order ON banners(order_position);
