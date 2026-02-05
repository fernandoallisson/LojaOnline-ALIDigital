'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/mockData';

export default function ProductCarousel({ title, subtitle, products }: { title: string; subtitle: string; products: Product[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'prev' | 'next') => {
    const container = containerRef.current;
    if (!container) return;
    const amount = direction === 'next' ? 280 : -280;
    container.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button
            aria-label="Produtos anteriores"
            onClick={() => scrollByAmount('prev')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-slate-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Próximos produtos"
            onClick={() => scrollByAmount('next')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-slate-300"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="mt-6 flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
        <span>Arraste para ver mais</span>
      </div>
    </section>
  );
}
