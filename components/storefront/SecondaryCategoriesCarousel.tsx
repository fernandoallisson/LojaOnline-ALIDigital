'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { secondaryCategories } from '@/lib/mockData';

export default function SecondaryCategoriesCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'prev' | 'next') => {
    const container = containerRef.current;
    if (!container) return;
    const amount = direction === 'next' ? 320 : -320;
    container.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Categorias para explorar</h2>
          <p className="text-sm text-slate-500">Inspiração para todos os estilos</p>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button
            aria-label="Categoria anterior"
            onClick={() => scrollByAmount('prev')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-slate-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Próxima categoria"
            onClick={() => scrollByAmount('next')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-slate-300"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="mt-6 flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {secondaryCategories.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="group relative min-w-[260px] overflow-hidden rounded-3xl"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-lg font-semibold">{item.title}</p>
              <p className="text-sm opacity-80">{item.subtitle}</p>
              <span className="text-xs uppercase tracking-widest">Confira</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
