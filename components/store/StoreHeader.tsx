'use client';

import { useCart } from '@/context/CartContext';
import { Store, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type StoreHeaderProps = {
  storeName: string;
  storeDescription: string;
  primaryColor: string;
};

export default function StoreHeader({
  storeName,
  storeDescription,
  primaryColor,
}: StoreHeaderProps) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
                  {storeName}
                </h1>
                <p className="text-sm text-slate-600">{storeDescription}</p>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/cart">
              <Button variant="outline" size="sm" className="gap-2 relative">
                <ShoppingCart className="w-4 h-4" />
                Carrinho
                {totalItems > 0 && (
                  <span
                    className="absolute top-0 right-0 w-5 h-5 rounded-full text-xs font-bold text-white flex items-center justify-center transform translate-x-2 -translate-y-2"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/admin/login">
              <Button variant="outline" size="sm">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
