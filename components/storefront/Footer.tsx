import { footerLinks } from '@/lib/mockData';
import { Facebook, Instagram, Pin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-6 border-b border-slate-100 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-900">
              Sua loja online completa com gestão inteligente
            </p>
            <p className="text-sm text-slate-500">ALI Commerce</p>
          </div>
          <div className="flex items-center gap-4">
            <button aria-label="Instagram" className="rounded-full border border-slate-200 p-2 text-slate-600">
              <Instagram className="h-4 w-4" />
            </button>
            <button aria-label="TikTok" className="rounded-full border border-slate-200 p-2 text-slate-600">
              <span className="text-xs font-bold">TikTok</span>
            </button>
            <button aria-label="Pinterest" className="rounded-full border border-slate-200 p-2 text-slate-600">
              <Pin className="h-4 w-4" />
            </button>
            <button aria-label="X" className="rounded-full border border-slate-200 p-2 text-slate-600">
              <Twitter className="h-4 w-4" />
            </button>
            <button aria-label="Facebook" className="rounded-full border border-slate-200 p-2 text-slate-600">
              <Facebook className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold text-slate-900">{group.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="hover:text-slate-800">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 border-t border-slate-100 pt-8 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-900">Pagamento e segurança</p>
            <div className="flex flex-wrap gap-2">
              {['Pix', 'Mastercard', 'Visa', 'Elo', 'Segurança SSL'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2 text-sm text-slate-500">
            <p>ALI Commerce LTDA • CNPJ 00.000.000/0001-00</p>
            <p>Rua Exemplo, 123 - São Paulo / SP</p>
            <div className="flex gap-4 text-xs">
              <Link href="#" className="underline">
                Termos de uso
              </Link>
              <Link href="#" className="underline">
                Política de privacidade
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-400">© 2025 ALI Commerce. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
