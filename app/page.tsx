'use client';

import Header from '@/components/storefront/Header';
import HeroCarousel from '@/components/storefront/HeroCarousel';
import BenefitsBar from '@/components/storefront/BenefitsBar';
import CategoryGrid from '@/components/storefront/CategoryGrid';
import OpportunityGrid from '@/components/storefront/OpportunityGrid';
import SecondaryCategoriesCarousel from '@/components/storefront/SecondaryCategoriesCarousel';
import ProductCarousel from '@/components/storefront/ProductCarousel';
import CampaignBanners from '@/components/storefront/CampaignBanners';
import ComboOffersCarousel from '@/components/storefront/ComboOffersCarousel';
import Newsletter from '@/components/storefront/Newsletter';
import SeoExpandable from '@/components/storefront/SeoExpandable';
import Footer from '@/components/storefront/Footer';
import BackToTop from '@/components/storefront/BackToTop';
import { products } from '@/lib/mockData';

export default function StorePage() {
  const novidades = products.slice(0, 8);
  const recomendados = products.slice(8, 16);

  return (
    <div className="min-h-screen bg-white text-[#333]">
      <Header />

      <main className="space-y-16 pb-16">
        <section className="px-4 pt-8">
          <HeroCarousel />
        </section>

        <BenefitsBar />

        <CategoryGrid />

        <OpportunityGrid />

        <SecondaryCategoriesCarousel />

        <ProductCarousel
          title="Novidades"
          subtitle="Chegou agora: peças que estão em alta"
          products={novidades}
        />

        <CampaignBanners />

        <ProductCarousel
          title="Recomendados para você"
          subtitle="Seleção com base nas tendências do momento"
          products={recomendados}
        />

        <ComboOffersCarousel />

        <Newsletter />

        <SeoExpandable />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
