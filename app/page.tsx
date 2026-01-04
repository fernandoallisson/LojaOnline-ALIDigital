'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import BannerSlideshow from '@/components/store/BannerSlideshow';
import OffersCarousel from '@/components/store/OffersCarousel';
import ProductCard from '@/components/store/ProductCard';
import CategoriesBar from '@/components/store/CategoriesBar';
import StoreHeader from '@/components/store/StoreHeader';
import { Store } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
};

type StoreSettings = {
  primary_color: string;
  secondary_color: string;
  neutral_color: string;
  store_name: string;
  store_description: string;
  show_offers: boolean;
  show_featured: boolean;
};

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [productsRes, settingsRes] = await Promise.all([
      supabase.from('products').select('*').eq('active', true).order('created_at', { ascending: false }),
      supabase.from('store_settings').select('*').limit(1).single(),
    ]);

    setProducts(productsRes.data || []);
    setSettings(settingsRes.data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f3048]"></div>
      </div>
    );
  }

  const primaryColor = settings?.primary_color || '#1f3048';
  const secondaryColor = settings?.secondary_color || '#18b4dd';
  const neutralColor = settings?.neutral_color || '#f5f8f9';
  const storeName = settings?.store_name || 'ALI Commerce';
  const storeDescription = settings?.store_description || 'Sua loja online completa';

  return (
    <div className="min-h-screen" style={{ backgroundColor: neutralColor }}>
      <StoreHeader
        storeName={storeName}
        storeDescription={storeDescription}
        primaryColor={primaryColor}
      />

      <CategoriesBar />

      <main className="space-y-12">
        <section className="px-4 lg:px-8 pt-8 lg:pt-12">
          <BannerSlideshow />
        </section>

        {settings?.show_offers && (
          <section className="py-8 lg:py-12">
            <OffersCarousel />
          </section>
        )}

        <section className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              Nossos Produtos
            </h2>
            <p className="text-slate-600">Encontre os melhores produtos com os melhores preços</p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">Nenhum produto disponível no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: primaryColor }}
              >
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold" style={{ color: primaryColor }}>
                  {storeName}
                </p>
                <p className="text-xs text-slate-500">E-commerce com gestão inteligente</p>
              </div>
            </div>
            <p className="text-sm text-slate-500">
              2025 {storeName}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
