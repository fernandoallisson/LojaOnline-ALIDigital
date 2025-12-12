'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Banner = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link_url: string;
};

export default function BannerSlideshow() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    const { data } = await supabase
      .from('banners')
      .select('*')
      .eq('active', true)
      .order('order_position', { ascending: true });

    if (data && data.length > 0) {
      setBanners(data);
    }
  };

  useEffect(() => {
    if (!isAutoPlay || banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, banners.length]);

  if (banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  return (
    <div className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden rounded-lg shadow-lg">
      {banners.map((banner, index) => (
        <a
          key={banner.id}
          href={banner.link_url || '#'}
          onClick={(e) => {
            if (!banner.link_url) e.preventDefault();
          }}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={banner.image_url}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12 text-white">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
              {banner.title}
            </h2>
            {banner.description && (
              <p className="text-sm md:text-lg lg:text-xl text-gray-100 max-w-2xl">
                {banner.description}
              </p>
            )}
          </div>
        </a>
      ))}

      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 backdrop-blur transition-colors rounded-full p-2 md:p-3 text-white"
            aria-label="Banner anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 backdrop-blur transition-colors rounded-full p-2 md:p-3 text-white"
            aria-label="Próximo banner"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-6 md:w-8'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Ir para banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
