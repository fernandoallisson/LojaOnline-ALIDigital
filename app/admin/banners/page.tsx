'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, Edit2, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Banner = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link_url: string;
  active: boolean;
  order_position: number;
};

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    link_url: '',
    active: true,
  });

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('order_position', { ascending: true });

    if (!error && data) {
      setBanners(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.image_url) {
      toast.error('Preencha título e URL da imagem');
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from('banners')
        .update(formData)
        .eq('id', editingId);

      if (error) {
        toast.error('Erro ao atualizar banner');
      } else {
        toast.success('Banner atualizado com sucesso');
        setEditingId(null);
        setShowForm(false);
        loadBanners();
      }
    } else {
      const { error } = await supabase
        .from('banners')
        .insert([
          {
            ...formData,
            order_position: banners.length,
          },
        ]);

      if (error) {
        toast.error('Erro ao criar banner');
      } else {
        toast.success('Banner criado com sucesso');
        setShowForm(false);
        loadBanners();
      }
    }

    resetForm();
  };

  const handleEdit = (banner: Banner) => {
    setFormData({
      title: banner.title,
      description: banner.description,
      image_url: banner.image_url,
      link_url: banner.link_url,
      active: banner.active,
    });
    setEditingId(banner.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este banner?')) {
      const { error } = await supabase.from('banners').delete().eq('id', id);

      if (error) {
        toast.error('Erro ao deletar banner');
      } else {
        toast.success('Banner deletado com sucesso');
        loadBanners();
      }
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;

    const updatedBanners = [...banners];
    [updatedBanners[index - 1].order_position, updatedBanners[index].order_position] = [
      updatedBanners[index].order_position,
      updatedBanners[index - 1].order_position,
    ];

    await Promise.all([
      supabase
        .from('banners')
        .update({ order_position: updatedBanners[index - 1].order_position })
        .eq('id', updatedBanners[index - 1].id),
      supabase
        .from('banners')
        .update({ order_position: updatedBanners[index].order_position })
        .eq('id', updatedBanners[index].id),
    ]);

    loadBanners();
  };

  const handleMoveDown = async (index: number) => {
    if (index === banners.length - 1) return;

    const updatedBanners = [...banners];
    [updatedBanners[index + 1].order_position, updatedBanners[index].order_position] = [
      updatedBanners[index].order_position,
      updatedBanners[index + 1].order_position,
    ];

    await Promise.all([
      supabase
        .from('banners')
        .update({ order_position: updatedBanners[index + 1].order_position })
        .eq('id', updatedBanners[index + 1].id),
      supabase
        .from('banners')
        .update({ order_position: updatedBanners[index].order_position })
        .eq('id', updatedBanners[index].id),
    ]);

    loadBanners();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      link_url: '',
      active: true,
    });
    setEditingId(null);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Banners</h1>
          <p className="text-slate-600 mt-1">Gerencie os banners do slideshow da página inicial</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-[#18b4dd] hover:bg-[#1f3048]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Banner
        </Button>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Banner' : 'Novo Banner'}</DialogTitle>
            <DialogDescription>
              Preencha os dados do banner para exibir no slideshow
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título*</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Grande Promoção"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição do banner"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL da Imagem*</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link_url">URL de Destino (opcional)</Label>
              <Input
                id="link_url"
                value={formData.link_url}
                onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <Label htmlFor="active" className="cursor-pointer">
                Ativo
              </Label>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#18b4dd] hover:bg-[#1f3048]">
                {editingId ? 'Atualizar' : 'Criar'} Banner
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {banners.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-slate-500 text-lg">Nenhum banner criado</p>
            <p className="text-slate-400 text-sm mt-2">Clique no botão acima para criar o primeiro banner</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {banners.map((banner, index) => (
            <Card key={banner.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {banner.image_url && (
                    <img
                      src={banner.image_url}
                      alt={banner.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-slate-900">{banner.title}</h3>
                        <p className="text-sm text-slate-600">{banner.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2 ${
                        banner.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {banner.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>

                    {banner.link_url && (
                      <p className="text-xs text-slate-500 truncate mb-2">
                        Link: {banner.link_url}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === banners.length - 1}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(banner)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(banner.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      </div>
    </AdminLayout>
  );
}
