'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/storefront/Header';
import Footer from '@/components/storefront/Footer';

const coupons = {
  AMEITEVER: 0.1,
  AMANDOTODOS: 0.15,
};

type CouponKey = keyof typeof coupons;

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponKey | null>(null);
  const [message, setMessage] = useState('');

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return totalPrice * coupons[appliedCoupon];
  }, [appliedCoupon, totalPrice]);

  const total = totalPrice - discount;

  const handleApplyCoupon = () => {
    const normalized = couponInput.trim().toUpperCase() as CouponKey;
    if (normalized in coupons) {
      setAppliedCoupon(normalized);
      setMessage(`Cupom ${normalized} aplicado!`);
    } else {
      setAppliedCoupon(null);
      setMessage('Cupom inválido.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#333]">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:border-slate-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Continuar comprando
          </Link>
          <h1 className="mt-6 text-3xl font-semibold text-slate-900">Carrinho de compras</h1>
          <p className="text-sm text-slate-500">Revise seus itens antes de finalizar.</p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center">
            <p className="text-lg text-slate-500">Seu carrinho está vazio.</p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white"
            >
              Voltar para a loja
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product_id}
                  className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:flex-row"
                >
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-slate-50">
                    <img
                      src={item.product_image_url}
                      alt={item.product_name}
                      className="h-20 w-20 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-slate-400">ALI Commerce</p>
                        <h3 className="text-lg font-semibold text-slate-900">{item.product_name}</h3>
                      </div>
                      <button
                        aria-label="Remover item"
                        onClick={() => removeItem(item.product_id)}
                        className="rounded-full border border-slate-200 p-2 text-slate-500 hover:border-red-300 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1">
                        <button
                          aria-label="Diminuir quantidade"
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="p-1 text-slate-600 hover:text-slate-900"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[24px] text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          aria-label="Aumentar quantidade"
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="p-1 text-slate-600 hover:text-slate-900"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Subtotal</p>
                        <p className="text-lg font-semibold text-slate-900">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Resumo</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(totalPrice)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-[#d0021b]">
                      <span>Desconto</span>
                      <span>
                        -{' '}
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span>Frete</span>
                    <span className="text-green-600">Grátis</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-base font-semibold text-slate-900">Total</span>
                  <span className="text-2xl font-semibold text-slate-900">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(total)}
                  </span>
                </div>
                <button className="mt-6 w-full rounded-full bg-[#111] py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                  Finalizar compra
                </button>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">Cupom de desconto</h3>
                <div className="mt-4 flex gap-2">
                  <input
                    value={couponInput}
                    onChange={(event) => setCouponInput(event.target.value)}
                    placeholder="Digite seu cupom"
                    aria-label="Digite seu cupom"
                    className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
                  >
                    Aplicar
                  </button>
                </div>
                {message && <p className="mt-3 text-xs text-slate-500">{message}</p>}
                <p className="mt-3 text-xs text-slate-400">
                  Cupons ativos: <span className="font-semibold">AMEITEVER</span> e{' '}
                  <span className="font-semibold">AMANDOTODOS</span>.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-[#fdf2f4] p-6">
                <p className="text-sm text-slate-700">
                  Precisa de ajuda? Fale com nosso time pelo WhatsApp e receba suporte rápido.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
