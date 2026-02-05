'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroBanners } from '@/lib/mockData';

export default function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % heroBanners.length;
      const container = containerRef.current;
      if (container) {
        container.scrollTo({
          left: container.clientWidth * nextIndex,
          behavior: 'smooth',
        });
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    setActiveIndex(index);
  };

  const scrollBySlide = (direction: 'prev' | 'next') => {
    const container = containerRef.current;
    if (!container) return;
    const next = direction === 'next' ? 1 : -1;
    container.scrollBy({ left: container.clientWidth * next, behavior: 'smooth' });
  };

  return (
    <section className="relative">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {heroBanners.map((banner) => (
          <div
            key={banner.id}
            className="relative min-w-full snap-center overflow-hidden rounded-2xl"
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="h-[480px] w-full object-cover md:h-[560px]"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute left-6 top-1/2 w-[85%] -translate-y-1/2 space-y-4 text-white md:left-12 md:w-1/2">
              {banner.badge && (
                <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#111]">
                  {banner.badge}
                </span>
              )}
              <h2 className="text-3xl font-semibold md:text-5xl">{banner.title}</h2>
              <p className="text-base text-white/90 md:text-lg">{banner.subtitle}</p>
              <Link
                href={banner.link}
                className="inline-flex items-center justify-center rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black"
              >
                {banner.cta}
              </Link>
            </div>
            <div className="absolute bottom-4 right-6 text-xs text-white/70">ALI Commerce</div>
          </div>
        ))}
      </div>

      <button
        aria-label="Slide anterior"
        onClick={() => scrollBySlide('prev')}
        className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-md transition hover:bg-white md:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Próximo slide"
        onClick={() => scrollBySlide('next')}
        className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-md transition hover:bg-white md:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="mt-4 flex items-center justify-center gap-2">
        {heroBanners.map((banner, index) => (
          <button
            key={banner.id}
            aria-label={`Ir para slide ${index + 1}`}
            onClick={() => {
              const container = containerRef.current;
              if (!container) return;
              container.scrollTo({ left: container.clientWidth * index, behavior: 'smooth' });
            }}
            className={`h-2 w-2 rounded-full transition ${
              index === activeIndex ? 'bg-[#111]' : 'bg-slate-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
