'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { comboOffers } from '@/lib/mockData';

export default function ComboOffersCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const index = Math.round(container.scrollLeft / 260);
    setActiveIndex(index);
  };

  const scrollByAmount = (direction: 'prev' | 'next') => {
    const container = containerRef.current;
    if (!container) return;
    const amount = direction === 'next' ? 260 : -260;
    container.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Combos & ofertas</h2>
          <p className="text-sm text-slate-500">Aproveite condições especiais em kits selecionados</p>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button
            aria-label="Combo anterior"
            onClick={() => scrollByAmount('prev')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-slate-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Próximo combo"
            onClick={() => scrollByAmount('next')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-slate-300"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="mt-6 flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {comboOffers.map((combo) => (
          <div
            key={combo.id}
            className="min-w-[240px] rounded-3xl bg-[#fdf2f4] p-5 shadow-sm"
          >
            <p className="text-xs uppercase tracking-widest text-[#d0021b]">Combo</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{combo.title}</h3>
            <p className="text-sm text-slate-500">{combo.description}</p>
            <p className="mt-4 text-2xl font-semibold text-[#d0021b]">{combo.price}</p>
            <button className="mt-4 rounded-full bg-[#111] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              Comprar
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        {comboOffers.map((combo, index) => (
          <span
            key={combo.id}
            className={`h-2 w-2 rounded-full ${index === activeIndex ? 'bg-[#111]' : 'bg-slate-300'}`}
          />
        ))}
      </div>
    </section>
  );
}
