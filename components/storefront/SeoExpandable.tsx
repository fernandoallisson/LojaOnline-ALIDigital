'use client';

import { useState } from 'react';
import { seoContent } from '@/lib/mockData';

export default function SeoExpandable() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold text-slate-900">{seoContent.title}</h2>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:border-slate-300"
            aria-expanded={expanded}
            aria-label="Exibir mais conteúdo"
          >
            {expanded ? 'Exibir menos conteúdo' : 'Exibir mais conteúdo'}
          </button>
        </div>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          {seoContent.paragraphs.map((text, index) => {
            if (!expanded && index > 0) return null;
            return <p key={text}>{text}</p>;
          })}
        </div>
      </div>
    </section>
  );
}
