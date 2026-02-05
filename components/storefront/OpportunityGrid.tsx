import { opportunities } from '@/lib/mockData';

export default function OpportunityGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Oportunidades imperdíveis</h2>
        <p className="text-sm text-slate-500">Ofertas com o toque fashion da ALI Commerce</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {opportunities.map((item) => (
          <div
            key={item.id}
            className={`relative overflow-hidden rounded-3xl p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${item.accent}`}
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-slate-500">Promo</p>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
            <img
              src={item.image}
              alt={item.title}
              className="absolute -right-6 bottom-0 h-32 w-32 rounded-2xl object-cover shadow-lg"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
