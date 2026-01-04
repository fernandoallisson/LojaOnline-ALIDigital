'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import { Store, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/store/ProductCard';
import CategoriesBar from '@/components/store/CategoriesBar';

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
};

type StoreSettings = {
  primary_color: string;
  secondary_color: string;
  neutral_color: string;
  store_name: string;
  store_description: string;
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [slug]);

  const loadData = async () => {
    const [categoryRes, productsRes, settingsRes] = await Promise.all([
      supabase.from('categories').select('*').eq('slug', slug).maybeSingle(),
      supabase.from('products').select('*').eq('active', true).order('created_at', { ascending: false }),
      supabase.from('store_settings').select('*').limit(1).maybeSingle(),
    ]);

    if (categoryRes.data) {
      setCategory(categoryRes.data);
      const categoryProducts = (productsRes.data || []).filter(
        (product) => product.category === categoryRes.data.name
      );
      setProducts(categoryProducts);
    }

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

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Categoria não encontrada</p>
          <Link href="/">
            <Button className="bg-[#1f3048] hover:bg-[#18b4dd] gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar para a loja
            </Button>
          </Link>
        </div>
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
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
                    {storeName}
                  </h1>
                  <p className="text-sm text-slate-600">{storeDescription}</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/login">
              <Button variant="outline" size="sm">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <CategoriesBar />

      <main className="space-y-12">
        <section className="max-w-7xl mx-auto px-4 pt-12 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: category.color }}
            >
              {/* Icon rendering would require accessing the Icons dynamically */}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">{category.name}</h1>
              <p className="text-slate-600 mt-2">
                {products.length} {products.length === 1 ? 'produto' : 'produtos'} disponível(is)
              </p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg mb-6">Nenhum produto nesta categoria.</p>
              <Link href="/">
                <Button className="bg-[#1f3048] hover:bg-[#18b4dd] gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para a loja
                </Button>
              </Link>
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
