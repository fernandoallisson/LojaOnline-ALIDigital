'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Store, ArrowLeft, Trash2, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CategoriesBar from '@/components/store/CategoriesBar';
import StoreHeader from '@/components/store/StoreHeader';

type StoreSettings = {
  primary_color: string;
  secondary_color: string;
  neutral_color: string;
  store_name: string;
  store_description: string;
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data } = await supabase
      .from('store_settings')
      .select('*')
      .limit(1)
      .maybeSingle();
    setSettings(data);
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

      <main className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Continuar Comprando
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900">Carrinho de Compras</h1>
        </div>

        {items.length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="p-12 text-center">
              <p className="text-slate-500 text-lg mb-6">Seu carrinho está vazio</p>
              <Link href="/">
                <Button className="gap-2" style={{ backgroundColor: primaryColor }}>
                  Voltar para a Loja
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.product_id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {item.product_image_url && (
                        <div className="w-32 h-32 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.product_image_url}
                            alt={item.product_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">
                              {item.product_name}
                            </h3>
                            <p
                              className="text-2xl font-bold mt-2"
                              style={{ color: primaryColor }}
                            >
                              R$ {item.price.toFixed(2)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => removeItem(item.product_id)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 border border-slate-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                              className="p-2 hover:bg-slate-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-medium min-w-12 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                              className="p-2 hover:bg-slate-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-lg font-bold text-slate-600">
                            Subtotal: R${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card className="border-0 shadow-md sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Resumo</h3>
                    <div className="space-y-3 pb-4 border-b border-slate-200">
                      <div className="flex justify-between text-slate-600">
                        <span>Subtotal:</span>
                        <span>R$ {totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Frete:</span>
                        <span className="text-green-600 font-medium">Grátis</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-900">Total:</span>
                    <span
                      className="text-3xl font-bold"
                      style={{ color: primaryColor }}
                    >
                      R$ {totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    className="w-full h-12 text-base font-medium"
                    style={{ backgroundColor: primaryColor }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = secondaryColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = primaryColor;
                    }}
                  >
                    Finalizar Compra
                  </Button>
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Continuar Comprando
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
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
