'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import * as Icons from 'lucide-react';
import Link from 'next/link';

type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
};

export default function CategoriesBar() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('active', true)
      .order('order_position', { ascending: true });
    setCategories(data || []);
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Tag;
    return IconComponent;
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border-y border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4">
          <Link href="/">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all bg-slate-100 text-slate-700 hover:bg-slate-200">
              <Icons.Grid3x3 className="w-5 h-5" />
              Todas
            </button>
          </Link>
          {categories.map((category) => {
            const IconComponent = getIconComponent(category.icon);
            return (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all text-white shadow-md hover:shadow-lg"
                  style={{ backgroundColor: category.color }}
                >
                  <IconComponent className="w-5 h-5" />
                  {category.name}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
