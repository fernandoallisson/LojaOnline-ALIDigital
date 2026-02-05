import Link from 'next/link';
import { campaignBanners } from '@/lib/mockData';

export default function CampaignBanners() {
  const splitBanners = campaignBanners.filter((banner) => banner.layout === 'split');
  const fullBanner = campaignBanners.find((banner) => banner.layout === 'full');

  return (
    <section className="mx-auto max-w-7xl px-4 space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {splitBanners.map((banner) => (
          <Link key={banner.id} href={banner.link} className="group relative overflow-hidden rounded-3xl">
            <img
              src={banner.image}
              alt={banner.title}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-semibold">{banner.title}</h3>
              <p className="text-sm text-white/90">{banner.subtitle}</p>
              <span className="mt-3 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900">
                {banner.cta}
              </span>
            </div>
          </Link>
        ))}
      </div>
      {fullBanner && (
        <Link href={fullBanner.link} className="group relative block overflow-hidden rounded-3xl">
          <img
            src={fullBanner.image}
            alt={fullBanner.title}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-3xl font-semibold">{fullBanner.title}</h3>
            <p className="text-sm text-white/90">{fullBanner.subtitle}</p>
            <span className="mt-3 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900">
              {fullBanner.cta}
            </span>
          </div>
        </Link>
      )}
    </section>
  );
}
