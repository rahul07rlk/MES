'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Save } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import type { SchoolInfo } from '@/types/database';

export function SettingsForm({ initial }: { initial: SchoolInfo | null }) {
  const supabase = createClient();
  const [info, setInfo] = useState<Partial<SchoolInfo>>(initial ?? {});
  const [saving, setSaving] = useState(false);

  function set<K extends keyof SchoolInfo>(k: K, v: SchoolInfo[K]) {
    setInfo((s) => ({ ...s, [k]: v }));
  }

  async function save() {
    setSaving(true);
    try {
      const payload = {
        ...info,
        stats: {
          students: Number((info.stats as any)?.students ?? 0),
          faculty: Number((info.stats as any)?.faculty ?? 0),
          years: Number((info.stats as any)?.years ?? 0),
          success_rate: Number((info.stats as any)?.success_rate ?? 0),
        },
      };
      const { data, error } = info.id
        ? await supabase.from('school_info').update(payload).eq('id', info.id).select().single()
        : await supabase.from('school_info').insert(payload).select().single();
      if (error) throw error;
      setInfo(data);
      toast.success('Saved');
    } catch (e: any) {
      toast.error(e.message ?? 'Failed');
    } finally {
      setSaving(false);
    }
  }

  const stats = (info.stats ?? {}) as Record<string, number>;

  return (
    <div className="max-w-4xl">
      <h1 className="font-serif text-3xl font-semibold">School information</h1>
      <p className="text-slate-500 mb-8">These fields populate the home page, about page and footer.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="School name" value={info.name ?? ''} onChange={(e) => set('name', e.target.value)} />
        <Input label="Tagline" value={info.tagline ?? ''} onChange={(e) => set('tagline', e.target.value)} />
        <Input label="Motto" value={info.motto ?? ''} onChange={(e) => set('motto', e.target.value)} />
        <Input label="Hero image URL" value={info.hero_image_url ?? ''} onChange={(e) => set('hero_image_url', e.target.value)} />
        <div className="sm:col-span-2">
          <Textarea label="Short about" value={info.about_short ?? ''} onChange={(e) => set('about_short', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Textarea label="History" rows={4} value={info.history ?? ''} onChange={(e) => set('history', e.target.value)} />
        </div>
        <Textarea label="Vision" value={info.vision ?? ''} onChange={(e) => set('vision', e.target.value)} />
        <Textarea label="Mission" value={info.mission ?? ''} onChange={(e) => set('mission', e.target.value)} />
        <Input label="Principal name" value={info.principal_name ?? ''} onChange={(e) => set('principal_name', e.target.value)} />
        <Input label="Principal image URL" value={info.principal_image_url ?? ''} onChange={(e) => set('principal_image_url', e.target.value)} />
        <div className="sm:col-span-2">
          <Textarea label="Principal message" rows={4} value={info.principal_message ?? ''} onChange={(e) => set('principal_message', e.target.value)} />
        </div>

        <Input label="Address" value={info.address ?? ''} onChange={(e) => set('address', e.target.value)} />
        <Input label="Phone" value={info.phone ?? ''} onChange={(e) => set('phone', e.target.value)} />
        <Input label="Email" value={info.email ?? ''} onChange={(e) => set('email', e.target.value)} />
        <Input label="WhatsApp" value={info.whatsapp ?? ''} onChange={(e) => set('whatsapp', e.target.value)} />

        <Input label="Facebook URL" value={info.facebook_url ?? ''} onChange={(e) => set('facebook_url', e.target.value)} />
        <Input label="Instagram URL" value={info.instagram_url ?? ''} onChange={(e) => set('instagram_url', e.target.value)} />
        <Input label="Twitter / X URL" value={info.twitter_url ?? ''} onChange={(e) => set('twitter_url', e.target.value)} />
        <Input label="YouTube URL" value={info.youtube_url ?? ''} onChange={(e) => set('youtube_url', e.target.value)} />

        <div className="sm:col-span-2">
          <Textarea label="Google Maps embed URL" rows={2} value={info.google_maps_embed ?? ''} onChange={(e) => set('google_maps_embed', e.target.value)} />
        </div>

        <Input label="Stat — Students" type="number" value={stats.students ?? 0} onChange={(e) => set('stats', { ...stats, students: Number(e.target.value) } as any)} />
        <Input label="Stat — Faculty" type="number" value={stats.faculty ?? 0} onChange={(e) => set('stats', { ...stats, faculty: Number(e.target.value) } as any)} />
        <Input label="Stat — Years" type="number" value={stats.years ?? 0} onChange={(e) => set('stats', { ...stats, years: Number(e.target.value) } as any)} />
        <Input label="Stat — Success rate (%)" type="number" value={stats.success_rate ?? 0} onChange={(e) => set('stats', { ...stats, success_rate: Number(e.target.value) } as any)} />
      </div>

      <div className="mt-8">
        <Button onClick={save} disabled={saving}>
          <Save className="h-4 w-4" /> {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </div>
  );
}
