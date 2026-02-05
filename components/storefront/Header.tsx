'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Copy, Heart, Search, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const categories = [
  'Feminino',
  'Masculino',
  'Infantil',
  'Beleza',
  'Calçados',
  'Esportivo',
  'Jeans',
  'Novidades',
  'Liquida',
];

const placeholders = ['Estou pensando em camiseta', 'vestidos', 'calça', 'tênis', 'jeans'];

export default function Header() {
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showToast) return;
    const timeout = setTimeout(() => setShowToast(false), 2400);
    return () => clearTimeout(timeout);
  }, [showToast]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('AMEITEVER');
      setToastMessage('Cupom copiado!');
      setShowToast(true);
    } catch {
      setToastMessage('Não foi possível copiar.');
      setShowToast(true);
    }
  };

  const menuItems = useMemo(
    () =>
      categories.map((item) => ({
        label: item,
        highlight: item === 'Liquida',
      })),
    []
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-[#1f1f1f] text-white text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-center md:text-left">
            Promoção por tempo limitado <span className="text-[#ffccd5]">|</span> use o cupom
            <span className="ml-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#1f1f1f]">
              AMEITEVER
              <button
                onClick={handleCopy}
                aria-label="Copiar cupom"
                className="text-[#1f1f1f] hover:text-[#d0021b] transition"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </span>
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-xs underline underline-offset-4 hover:text-white/80">
                Ver regras
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Regras da promoção</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-slate-600">
                Cupom válido para produtos selecionados, por tempo limitado, sujeito à disponibilidade de estoque.
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f05695] text-white">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-[#111]">ALI Commerce</p>
              <p className="text-xs text-slate-500">Moda com gestão inteligente</p>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                aria-label="Buscar produtos"
                type="search"
                placeholder={placeholders[placeholderIndex]}
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:border-slate-300"
                  aria-label="Abrir menu de conta"
                >
                  <User className="h-4 w-4" />
                  Conta
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem>
                  <Link href="/admin/login" className="w-full">
                    Admin
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button className="w-full text-left">Entrar</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:border-slate-300"
              aria-label="Favoritos"
            >
              <Heart className="h-5 w-5" />
              {totalFavorites > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d0021b] text-xs text-white">
                  {totalFavorites}
                </span>
              )}
            </button>

            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:border-slate-300"
              aria-label="Carrinho"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d0021b] text-xs text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        <nav className="mt-4 hidden items-center gap-6 overflow-x-auto text-sm font-medium text-slate-700 lg:flex">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href="#"
              className={`flex items-center gap-1 transition hover:text-[#d0021b] ${
                item.highlight ? 'text-[#d0021b]' : ''
              }`}
            >
              {item.label}
              {item.highlight && <span className="h-2 w-2 rounded-full bg-[#d0021b]" />}
            </Link>
          ))}
        </nav>

        <nav className="mt-4 flex gap-4 overflow-x-auto text-sm font-medium text-slate-700 lg:hidden">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href="#"
              className={`whitespace-nowrap rounded-full border px-4 py-2 ${
                item.highlight
                  ? 'border-[#d0021b] text-[#d0021b]'
                  : 'border-slate-200 text-slate-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-full bg-[#111] px-5 py-2 text-sm text-white shadow-lg">
          {toastMessage}
        </div>
      )}
    </header>
  );
}
