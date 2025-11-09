'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { Plus, Pencil, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

type Offer = {
  id: string;
  title: string;
  image_url: string;
  product_id: string | null;
  active: boolean;
  order_position: number;
};

type Product = {
  id: string;
  name: string;
};

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    product_id: '',
    active: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [offersRes, productsRes] = await Promise.all([
      supabase.from('offers').select('*').order('order_position', { ascending: true }),
      supabase.from('products').select('id, name').eq('active', true),
    ]);
    setOffers(offersRes.data || []);
    setProducts(productsRes.data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const offerData = {
      title: formData.title,
      image_url: formData.image_url,
      product_id: formData.product_id || null,
      active: formData.active,
      order_position: editingOffer ? editingOffer.order_position : offers.length,
    };

    if (editingOffer) {
      await supabase.from('offers').update(offerData).eq('id', editingOffer.id);
    } else {
      await supabase.from('offers').insert([offerData]);
    }

    setDialogOpen(false);
    resetForm();
    loadData();
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      image_url: offer.image_url,
      product_id: offer.product_id || '',
      active: offer.active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta oferta?')) {
      await supabase.from('offers').delete().eq('id', id);
      loadData();
    }
  };

  const moveOffer = async (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === offers.length - 1)) {
      return;
    }

    const newOffers = [...offers];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newOffers[index], newOffers[targetIndex]] = [newOffers[targetIndex], newOffers[index]];

    const updates = newOffers.map((offer, i) => ({
      id: offer.id,
      order_position: i,
    }));

    for (const update of updates) {
      await supabase.from('offers').update({ order_position: update.order_position }).eq('id', update.id);
    }

    loadData();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image_url: '',
      product_id: '',
      active: true,
    });
    setEditingOffer(null);
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
            <p className="text-slate-600">Gerencie os slides do carousel de ofertas</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-[#1f3048] hover:bg-[#18b4dd] gap-2">
                <Plus className="w-4 h-4" />
                Nova Oferta
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingOffer ? 'Editar Oferta' : 'Nova Oferta'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Oferta</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">URL da Imagem</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/banner.jpg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product_id">Produto Vinculado (Opcional)</Label>
                  <Select value={formData.product_id} onValueChange={(value) => setFormData({ ...formData, product_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Nenhum produto</SelectItem>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                  <Label htmlFor="active">Oferta Ativa</Label>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 bg-[#1f3048] hover:bg-[#18b4dd]">
                    {editingOffer ? 'Atualizar' : 'Cadastrar'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {offers.map((offer, index) => (
            <Card key={offer.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-64 h-40 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={offer.image_url}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-xl text-slate-900">{offer.title}</h3>
                          <p className="text-sm text-slate-500 mt-1">
                            {offer.product_id ? `Vinculado ao produto` : 'Sem produto vinculado'}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${offer.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                          {offer.active ? 'Ativo' : 'Inativo'}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveOffer(index, 'up')}
                        disabled={index === 0}
                      >
                        <MoveUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveOffer(index, 'down')}
                        disabled={index === offers.length - 1}
                      >
                        <MoveDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(offer)}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(offer.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {offers.length === 0 && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-12 text-center">
              <p className="text-slate-500">Nenhuma oferta cadastrada ainda. Clique em "Nova Oferta" para começar.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
