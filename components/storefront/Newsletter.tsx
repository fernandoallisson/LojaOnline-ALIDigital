'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [selected, setSelected] = useState<'Feminino' | 'Masculino'>('Feminino');

  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 md:flex md:items-center md:justify-between">
        <div className="space-y-2 md:max-w-md">
          <h2 className="text-2xl font-semibold text-slate-900">Fique por dentro das tendências</h2>
          <p className="text-sm text-slate-500">
            Receba novidades, cupons e campanhas especiais da ALI Commerce.
          </p>
          <div className="flex gap-2 pt-2">
            {(['Feminino', 'Masculino'] as const).map((item) => (
              <button
                key={item}
                onClick={() => setSelected(item)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  selected === item
                    ? 'border-[#111] bg-[#111] text-white'
                    : 'border-slate-200 text-slate-600'
                }`}
                aria-label={`Selecionar ${item}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 flex w-full max-w-md flex-col gap-3 md:mt-0">
          <input
            type="email"
            aria-label="Digite seu e-mail"
            placeholder="Digite seu e-mail"
            className="w-full rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
          <div className="flex items-center gap-3">
            <button className="flex-1 rounded-full bg-[#111] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              Enviar
            </button>
            <a href="#" className="text-xs text-slate-500 underline">
              termos de uso
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
