'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import { Plus, Pencil, Trash2, MoveUp, MoveDown, Tag } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import * as Icons from 'lucide-react';

type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  active: boolean;
  order_position: number;
};

const popularIcons = [
  'Tag', 'Shirt', 'Smartphone', 'Laptop', 'Home', 'Utensils',
  'Book', 'Gamepad', 'Music', 'Camera', 'Watch', 'Sparkles',
  'Heart', 'Star', 'ShoppingBag', 'Gift', 'Zap', 'Crown'
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: 'Tag',
    color: '#1f3048',
    active: true,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('order_position', { ascending: true });
    setCategories(data || []);
    setLoading(false);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoryData = {
      name: formData.name,
      slug: formData.slug || generateSlug(formData.name),
      icon: formData.icon,
      color: formData.color,
      active: formData.active,
      order_position: editingCategory ? editingCategory.order_position : categories.length,
    };

    if (editingCategory) {
      await supabase
        .from('categories')
        .update(categoryData)
        .eq('id', editingCategory.id);
    } else {
      await supabase.from('categories').insert([categoryData]);
    }

    setDialogOpen(false);
    resetForm();
    loadCategories();
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      icon: category.icon,
      color: category.color,
      active: category.active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      await supabase.from('categories').delete().eq('id', id);
      loadCategories();
    }
  };

  const moveCategory = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === categories.length - 1)
    ) {
      return;
    }

    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newCategories[index], newCategories[targetIndex]] = [
      newCategories[targetIndex],
      newCategories[index],
    ];

    const updates = newCategories.map((category, i) => ({
      id: category.id,
      order_position: i,
    }));

    for (const update of updates) {
      await supabase
        .from('categories')
        .update({ order_position: update.order_position })
        .eq('id', update.id);
    }

    loadCategories();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      icon: 'Tag',
      color: '#1f3048',
      active: true,
    });
    setEditingCategory(null);
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Tag;
    return IconComponent;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f3048]"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-600">Gerencie as categorias exibidas na loja</p>
          </div>
          <Dialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-[#1f3048] hover:bg-[#18b4dd] gap-2">
                <Plus className="w-4 h-4" />
                Nova Categoria
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Categoria</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setFormData({
                        ...formData,
                        name,
                        slug: generateSlug(name),
                      });
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL amigável)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="ex: eletronicos"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon">Ícone</Label>
                    <select
                      id="icon"
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                      className="w-full h-10 px-3 py-2 border border-slate-200 rounded-md"
                    >
                      {popularIcons.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Cor</Label>
                    <div className="flex gap-2">
                      <Input
                        id="color"
                        type="color"
                        value={formData.color}
                        onChange={(e) =>
                          setFormData({ ...formData, color: e.target.value })
                        }
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={formData.color}
                        onChange={(e) =>
                          setFormData({ ...formData, color: e.target.value })
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, active: checked })
                    }
                  />
                  <Label htmlFor="active">Categoria Ativa</Label>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-[#1f3048] hover:bg-[#18b4dd]"
                  >
                    {editingCategory ? 'Atualizar' : 'Cadastrar'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => {
            const IconComponent = getIconComponent(category.icon);
            return (
              <Card
                key={category.id}
                className="border-0 shadow-md hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: category.color }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">
                          {category.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          /{category.slug}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        category.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {category.active ? 'Ativa' : 'Inativa'}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveCategory(index, 'up')}
                      disabled={index === 0}
                    >
                      <MoveUp className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveCategory(index, 'down')}
                      disabled={index === categories.length - 1}
                    >
                      <MoveDown className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(category)}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {categories.length === 0 && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-12 text-center">
              <p className="text-slate-500">
                Nenhuma categoria cadastrada ainda. Clique em "Nova Categoria"
                para começar.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
