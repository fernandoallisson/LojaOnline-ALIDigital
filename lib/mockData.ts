export type HeroBanner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  link: string;
  badge?: string;
};

export type CategoryCard = {
  id: string;
  title: string;
  image: string;
  link: string;
};

export type Opportunity = {
  id: string;
  title: string;
  description: string;
  image: string;
  accent: string;
};

export type SecondaryCategory = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  tags?: string[];
  stock: number;
};

export type CampaignBanner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  link: string;
  layout: 'split' | 'full';
};

export type ComboOffer = {
  id: string;
  title: string;
  description: string;
  price: string;
};

export const heroBanners: HeroBanner[] = [
  {
    id: 'hero-1',
    title: 'Novidades de meia-estação',
    subtitle: 'Looks leves com descontos especiais no app e na loja online.',
    cta: 'Conferir',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80',
    link: 'https://www.instagram.com',
    badge: 'Cupom AMEITEVER',
  },
  {
    id: 'hero-2',
    title: 'Jeans que acompanha seu ritmo',
    subtitle: 'Modelagens confortáveis e tons clássicos para todos os dias.',
    cta: 'Comprar',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
    link: 'https://www.instagram.com',
    badge: 'Cupom AMANDOTODOS',
  },
  {
    id: 'hero-3',
    title: 'Essenciais com toque fashion',
    subtitle: 'Camisetas, blusas e básicos que combinam com tudo.',
    cta: 'Ver coleção',
    image:
      'https://images.unsplash.com/photo-1463107971871-fbac9ddb920f?auto=format&fit=crop&w=1600&q=80',
    link: 'https://www.instagram.com',
    badge: 'Frete grátis acima de R$199',
  },
  {
    id: 'hero-4',
    title: 'Calçados que elevam o look',
    subtitle: 'Tênis, sandálias e botas com descontos exclusivos.',
    cta: 'Conferir',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80',
    link: 'https://www.instagram.com',
  },
];

export const benefits = [
  { id: 'benefit-1', title: 'Frete grátis', description: 'Em compras acima de R$199' },
  { id: 'benefit-2', title: 'Parcelamento sem juros', description: 'Até 10x no cartão' },
  { id: 'benefit-3', title: 'Cupons ativos', description: 'Descontos para o seu look' },
  { id: 'benefit-4', title: 'Tendências', description: 'Curadoria semanal' },
  { id: 'benefit-5', title: 'WhatsApp', description: 'Atendimento rápido' },
];

export const mainCategories: CategoryCard[] = [
  {
    id: 'cat-main-1',
    title: 'Feminino',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
    link: '/categories/feminino',
  },
  {
    id: 'cat-main-2',
    title: 'Masculino',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
    link: '/categories/masculino',
  },
  {
    id: 'cat-main-3',
    title: 'Infantil',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    link: '/categories/infantil',
  },
];

export const opportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: '2 peças com 35% OFF',
    description: 'Básicos selecionados',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    accent: 'bg-[#FFE8D6]',
  },
  {
    id: 'opp-2',
    title: '2º par por R$59,99',
    description: 'Tênis e slides',
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    accent: 'bg-[#FFF1E6]',
  },
  {
    id: 'opp-3',
    title: 'Jeans a partir de R$129',
    description: 'Modelagens modernas',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
    accent: 'bg-[#FFEFE0]',
  },
  {
    id: 'opp-4',
    title: '3ª peça com 50% OFF',
    description: 'Coleção casual',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    accent: 'bg-[#FFE4D6]',
  },
];

export const secondaryCategories: SecondaryCategory[] = [
  {
    id: 'sec-1',
    title: 'Leves de verão',
    subtitle: 'Tecidos frescos',
    image:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
    link: '/categories/leves',
  },
  {
    id: 'sec-2',
    title: 'Essenciais',
    subtitle: 'Para todos os dias',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80',
    link: '/categories/essenciais',
  },
  {
    id: 'sec-3',
    title: 'Básicos',
    subtitle: 'Cores neutras',
    image:
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1000&q=80',
    link: '/categories/basicos',
  },
  {
    id: 'sec-4',
    title: 'Workwear',
    subtitle: 'Alfaiataria leve',
    image:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1000&q=80',
    link: '/categories/workwear',
  },
  {
    id: 'sec-5',
    title: 'Street',
    subtitle: 'Mood urbano',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    link: '/categories/street',
  },
  {
    id: 'sec-6',
    title: 'Conforto',
    subtitle: 'Toque macio',
    image:
      'https://images.unsplash.com/photo-1484329087565-b38701ea0fd3?auto=format&fit=crop&w=1000&q=80',
    link: '/categories/conforto',
  },
  {
    id: 'sec-7',
    title: 'Tricot',
    subtitle: 'Camadas quentinhas',
    image:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
    link: '/categories/tricot',
  },
  {
    id: 'sec-8',
    title: 'Fitness',
    subtitle: 'Movimente-se',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80',
    link: '/categories/fitness',
  },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Camiseta Básica Soft Touch',
    category: 'Feminino',
    price: 59.9,
    oldPrice: 79.9,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    tags: ['Básicos', 'Algodão'],
    stock: 22,
  },
  {
    id: 'prod-2',
    name: 'Calça Jeans Slim Fit',
    category: 'Masculino',
    price: 149.9,
    oldPrice: 189.9,
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    tags: ['Jeans'],
    stock: 18,
  },
  {
    id: 'prod-3',
    name: 'Vestido Midi Floral',
    category: 'Feminino',
    price: 169.9,
    oldPrice: 219.9,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    tags: ['Novidades'],
    stock: 12,
  },
  {
    id: 'prod-4',
    name: 'Tênis Urban Knit',
    category: 'Calçados',
    price: 229.9,
    image:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
    tags: ['Esportivo'],
    stock: 20,
  },
  {
    id: 'prod-5',
    name: 'Blusa Tricot Gola Alta',
    category: 'Feminino',
    price: 129.9,
    oldPrice: 159.9,
    image:
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80',
    tags: ['Tricot'],
    stock: 14,
  },
  {
    id: 'prod-6',
    name: 'Camisa Linho Relaxed',
    category: 'Masculino',
    price: 179.9,
    image:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=900&q=80',
    tags: ['Workwear'],
    stock: 9,
  },
  {
    id: 'prod-7',
    name: 'Jaqueta Bomber Essential',
    category: 'Masculino',
    price: 219.9,
    oldPrice: 259.9,
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
    tags: ['Novidades'],
    stock: 11,
  },
  {
    id: 'prod-8',
    name: 'Shorts Alfaiataria Leve',
    category: 'Feminino',
    price: 89.9,
    image:
      'https://images.unsplash.com/photo-1463107971871-fbac9ddb920f?auto=format&fit=crop&w=900&q=80',
    tags: ['Workwear'],
    stock: 16,
  },
  {
    id: 'prod-9',
    name: 'Vestido Malha Conforto',
    category: 'Feminino',
    price: 139.9,
    oldPrice: 179.9,
    image:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
    tags: ['Conforto'],
    stock: 13,
  },
  {
    id: 'prod-10',
    name: 'Calça Cargo Utility',
    category: 'Masculino',
    price: 159.9,
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
    tags: ['Street'],
    stock: 19,
  },
  {
    id: 'prod-11',
    name: 'Blazer Alongado Leve',
    category: 'Feminino',
    price: 259.9,
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    tags: ['Workwear'],
    stock: 7,
  },
  {
    id: 'prod-12',
    name: 'Tênis Running Flex',
    category: 'Esportivo',
    price: 199.9,
    oldPrice: 229.9,
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    tags: ['Esportivo'],
    stock: 21,
  },
  {
    id: 'prod-13',
    name: 'Conjunto Infantil Cozy',
    category: 'Infantil',
    price: 99.9,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    tags: ['Infantil'],
    stock: 25,
  },
  {
    id: 'prod-14',
    name: 'Saia Midi Plissada',
    category: 'Feminino',
    price: 149.9,
    oldPrice: 179.9,
    image:
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80',
    tags: ['Novidades'],
    stock: 17,
  },
  {
    id: 'prod-15',
    name: 'Camiseta Oversized Street',
    category: 'Masculino',
    price: 79.9,
    image:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
    tags: ['Street'],
    stock: 28,
  },
  {
    id: 'prod-16',
    name: 'Macacão Linen Mix',
    category: 'Feminino',
    price: 219.9,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    tags: ['Essenciais'],
    stock: 8,
  },
];

export const campaignBanners: CampaignBanner[] = [
  {
    id: 'camp-1',
    title: 'Coleção urbana',
    subtitle: 'Peças essenciais com toque premium',
    cta: 'Ver campanha',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80',
    link: '/categories/street',
    layout: 'split',
  },
  {
    id: 'camp-2',
    title: 'Alfaiataria leve',
    subtitle: 'Elegância descontraída para o dia a dia',
    cta: 'Conferir',
    image:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1400&q=80',
    link: '/categories/workwear',
    layout: 'split',
  },
  {
    id: 'camp-3',
    title: 'Nova estação, novos tons',
    subtitle: 'Looks pensados para transição de clima',
    cta: 'Descobrir',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=80',
    link: '/categories/novidades',
    layout: 'full',
  },
];

export const comboOffers: ComboOffer[] = [
  {
    id: 'combo-1',
    title: 'Combo Essenciais',
    description: '2 peças por',
    price: 'R$199',
  },
  {
    id: 'combo-2',
    title: 'Kit Street',
    description: '3 peças por',
    price: 'R$299',
  },
  {
    id: 'combo-3',
    title: 'Look Office',
    description: '2 peças por',
    price: 'R$249',
  },
  {
    id: 'combo-4',
    title: 'Verão Leve',
    description: '3 peças por',
    price: 'R$219',
  },
  {
    id: 'combo-5',
    title: 'Fitness Mix',
    description: '2 peças por',
    price: 'R$189',
  },
  {
    id: 'combo-6',
    title: 'Básicos',
    description: '3 peças por',
    price: 'R$159',
  },
];

export const footerLinks = [
  {
    title: 'Feminino',
    links: ['Roupas', 'Calçados', 'Acessórios', 'Jeans', 'Plus Size'],
  },
  {
    title: 'Masculino',
    links: ['Camisas', 'Bermudas', 'Jeans', 'Calçados', 'Esportivo'],
  },
  {
    title: 'Infantil',
    links: ['Menina', 'Menino', 'Bebê', 'Calçados', 'Acessórios'],
  },
  {
    title: 'Calçados',
    links: ['Tênis', 'Botas', 'Sandálias', 'Casual', 'Esportivo'],
  },
  {
    title: 'Plus Size',
    links: ['Feminino', 'Masculino', 'Jeans', 'Básicos', 'Fitness'],
  },
  {
    title: 'Beleza',
    links: ['Skincare', 'Maquiagem', 'Perfumes', 'Kits', 'Acessórios'],
  },
];

export const seoContent = {
  title: 'ALI Commerce: moda acessível com curadoria inteligente',
  paragraphs: [
    'A ALI Commerce nasceu para facilitar a rotina de quem ama moda e praticidade. Nosso propósito é oferecer coleções democráticas, sempre atualizadas com as tendências e com preços que cabem no seu bolso.',
    'Aqui você encontra peças essenciais para todos os momentos: do trabalho ao fim de semana, do básico ao fashion. Nossa seleção é pensada para toda a família, com foco em conforto, qualidade e versatilidade.',
    'Siga nossas campanhas e aproveite cupons exclusivos no app e no site. A cada semana, novas oportunidades imperdíveis chegam para renovar seu guarda-roupa com o toque moderno que só a ALI Commerce tem.',
  ],
};
