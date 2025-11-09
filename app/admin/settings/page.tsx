'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { Switch } from '@/components/ui/switch';
import { Palette, Save } from 'lucide-react';

type StoreSettings = {
  id: string;
  primary_color: string;
  secondary_color: string;
  neutral_color: string;
  store_name: string;
  store_description: string;
  show_offers: boolean;
  show_featured: boolean;
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data } = await supabase.from('store_settings').select('*').limit(1).single();
    if (data) {
      setSettings(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    await supabase.from('store_settings').update({
      primary_color: settings.primary_color,
      secondary_color: settings.secondary_color,
      neutral_color: settings.neutral_color,
      store_name: settings.store_name,
      store_description: settings.store_description,
      show_offers: settings.show_offers,
      show_featured: settings.show_featured,
    }).eq('id', settings.id);

    setSaving(false);
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

  if (!settings) {
    return (
      <AdminLayout>
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-slate-500">Erro ao carregar configurações.</p>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Informações da Loja
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="store_name">Nome da Loja</Label>
                <Input
                  id="store_name"
                  value={settings.store_name}
                  onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="store_description">Descrição da Loja</Label>
              <Textarea
                id="store_description"
                value={settings.store_description}
                onChange={(e) => setSettings({ ...settings, store_description: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Cores do Tema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary_color">Cor Primária</Label>
                <div className="flex gap-2">
                  <Input
                    id="primary_color"
                    type="color"
                    value={settings.primary_color}
                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                    className="w-16 h-11 p-1"
                  />
                  <Input
                    type="text"
                    value={settings.primary_color}
                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary_color">Cor Secundária</Label>
                <div className="flex gap-2">
                  <Input
                    id="secondary_color"
                    type="color"
                    value={settings.secondary_color}
                    onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                    className="w-16 h-11 p-1"
                  />
                  <Input
                    type="text"
                    value={settings.secondary_color}
                    onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="neutral_color">Cor Neutra</Label>
                <div className="flex gap-2">
                  <Input
                    id="neutral_color"
                    type="color"
                    value={settings.neutral_color}
                    onChange={(e) => setSettings({ ...settings, neutral_color: e.target.value })}
                    className="w-16 h-11 p-1"
                  />
                  <Input
                    type="text"
                    value={settings.neutral_color}
                    onChange={(e) => setSettings({ ...settings, neutral_color: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 rounded-lg border-2" style={{ backgroundColor: settings.neutral_color }}>
              <div className="flex gap-4 items-center">
                <div className="w-24 h-24 rounded-xl shadow-lg" style={{ backgroundColor: settings.primary_color }} />
                <div className="w-24 h-24 rounded-xl shadow-lg" style={{ backgroundColor: settings.secondary_color }} />
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-2">Preview das cores selecionadas</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-white text-sm font-medium" style={{ backgroundColor: settings.primary_color }}>
                      Primária
                    </span>
                    <span className="px-3 py-1 rounded-full text-white text-sm font-medium" style={{ backgroundColor: settings.secondary_color }}>
                      Secundária
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Exibição de Seções</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <Label htmlFor="show_offers" className="text-base font-medium cursor-pointer">
                  Exibir Seção de Ofertas
                </Label>
                <p className="text-sm text-slate-500">Mostrar o carousel de ofertas na página inicial</p>
              </div>
              <Switch
                id="show_offers"
                checked={settings.show_offers}
                onCheckedChange={(checked) => setSettings({ ...settings, show_offers: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <Label htmlFor="show_featured" className="text-base font-medium cursor-pointer">
                  Exibir Produtos em Destaque
                </Label>
                <p className="text-sm text-slate-500">Mostrar produtos destacados na página inicial</p>
              </div>
              <Switch
                id="show_featured"
                checked={settings.show_featured}
                onCheckedChange={(checked) => setSettings({ ...settings, show_featured: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-[#1f3048] hover:bg-[#18b4dd] gap-2 px-8" disabled={saving}>
            <Save className="w-4 h-4" />
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
