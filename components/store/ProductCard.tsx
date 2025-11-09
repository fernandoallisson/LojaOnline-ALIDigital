'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
};

type ProductCardProps = {
  product: Product;
  primaryColor: string;
  secondaryColor: string;
};

export default function ProductCard({ product, primaryColor, secondaryColor }: ProductCardProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: product.price,
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Erro ao criar checkout:', error);
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <div className="relative w-full h-64 bg-slate-100 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            Sem imagem
          </div>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600">
            Últimas unidades
          </Badge>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge className="bg-red-600 hover:bg-red-700 text-lg px-4 py-2">
              Esgotado
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h3 className="font-bold text-xl text-slate-900 line-clamp-1">{product.name}</h3>
            {product.description && (
              <p className="text-sm text-slate-600 line-clamp-2 mt-2">{product.description}</p>
            )}
          </div>
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-3xl font-bold" style={{ color: primaryColor }}>
                R$ {product.price.toFixed(2)}
              </p>
              <p className="text-sm text-slate-500">Em estoque: {product.stock}</p>
            </div>
          </div>
          <Button
            className="w-full h-12 text-base font-medium transition-colors"
            style={{
              backgroundColor: primaryColor,
            }}
            onClick={handleCheckout}
            disabled={product.stock === 0 || loading}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = secondaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
            }}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {loading ? 'Processando...' : product.stock === 0 ? 'Esgotado' : 'Comprar Agora'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
