'use client';

import { benefits } from '@/lib/mockData';
import { BadgeCheck, BadgePercent, CreditCard, Headphones, Truck } from 'lucide-react';

const icons = [Truck, CreditCard, BadgePercent, BadgeCheck, Headphones];

export default function BenefitsBar() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide md:grid md:grid-cols-5">
          {benefits.map((benefit, index) => {
            const Icon = icons[index] || BadgeCheck;
            return (
              <div
                key={benefit.id}
                className="flex min-w-[220px] items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:min-w-0"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <Icon className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{benefit.title}</p>
                  <p className="text-xs text-slate-500">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
