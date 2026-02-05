'use client';

import { Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Product } from '@/lib/mockData';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  const formattedOldPrice = product.oldPrice
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.oldPrice)
    : null;

  return (
    <div className="group relative flex min-w-[220px] flex-col rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <button
        aria-label={isFavorite(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        onClick={() => toggleFavorite(product.id)}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-[#f05695] hover:text-[#f05695]"
      >
        <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-[#f05695] text-[#f05695]' : ''}`} />
      </button>
      <div className="flex items-center justify-center rounded-2xl bg-slate-50 p-4">
        <img src={product.image} alt={product.name} className="h-36 w-full object-contain" />
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs uppercase text-slate-400">{product.category}</p>
        <h3 className="text-sm font-medium text-slate-700">{product.name}</h3>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-base font-semibold text-slate-900">{formattedPrice}</span>
          {formattedOldPrice && (
            <span className="text-xs text-[#d0021b] line-through">{formattedOldPrice}</span>
          )}
        </div>
        <button
          onClick={() => addItem(product.id, product.name, product.image, product.price, 1)}
          className="mt-4 rounded-full bg-[#f05695] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#e04386]"
          aria-label={`Adicionar ${product.name} ao carrinho`}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
