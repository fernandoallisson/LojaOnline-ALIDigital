'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import * as Icons from 'lucide-react';

type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
};

export default function CategoriesBar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedCategory === null
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Icons.Grid3x3 className="w-5 h-5" />
            Todas
          </button>
          {categories.map((category) => {
            const IconComponent = getIconComponent(category.icon);
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                style={
                  isSelected
                    ? { backgroundColor: category.color }
                    : undefined
                }
              >
                <IconComponent className="w-5 h-5" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
