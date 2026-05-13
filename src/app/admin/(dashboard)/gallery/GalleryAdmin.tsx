'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Trash2, Upload, Save, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import type { GalleryItem } from '@/types/database';

export function GalleryAdmin({ initial }: { initial: GalleryItem[] }) {
  const supabase = createClient();
  const [items, setItems] = useState(initial);
  const [category, setCategory] = useState('campus');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState<Partial<GalleryItem> | null>(null);

  async function upload(file: File) {
    setUploading(true);
    try {
      const path = `${Date.now()}-${file.name.replace(/[^a-z0-9.\-_]/gi, '_')}`;
      const { error: upErr } = await supabase.storage.from('gallery').upload(path, file);
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from('gallery').getPublicUrl(path);
      const { data, error } = await supabase
        .from('gallery')
        .insert({ image_url: pub.publicUrl, category, title: file.name })
        .select().single();
      if (error) throw error;
      setItems((xs) => [data, ...xs]);
      toast.success('Uploaded');
    } catch (e: any) {
      toast.error(e.message ?? 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete image?')) return;
    const { error } = await supabase.from('gallery').delete().eq('id', id);
    if (error) return toast.error(error.message);
    setItems((xs) => xs.filter((x) => x.id !== id));
  }

  async function saveEdit() {
    if (!editing?.id) return;
    const { data, error } = await supabase.from('gallery').update({
      title: editing.title, caption: editing.caption, category: editing.category,
    }).eq('id', editing.id).select().single();
    if (error) return toast.error(error.message);
    setItems((xs) => xs.map((x) => x.id === data.id ? data : x));
    setEditing(null);
    toast.success('Saved');
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold">Gallery</h1>
          <p className="text-slate-500">Upload, categorise and remove gallery images.</p>
        </div>
        <div className="flex gap-2">
          <Select value={category} onChange={(e) => setCategory(e.target.value)} className="h-11">
            {['campus', 'events', 'activities', 'sports'].map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Button onClick={() => fileRef.current?.click()} disabled={uploading}>
            <Upload className="h-4 w-4" /> {uploading ? 'Uploading…' : 'Upload image'}
          </Button>
          <input
            ref={fileRef}
            hidden type="file" accept="image/*"
            onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((g) => (
          <div key={g.id} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
            <Image src={g.image_url} alt={g.title ?? ''} fill sizes="25vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-end">
              <button onClick={() => setEditing(g)} className="text-white text-xs hover:underline">Edit</button>
              <button onClick={() => remove(g.id)} className="text-white"><Trash2 className="h-4 w-4" /></button>
            </div>
            <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider bg-white/85 text-slate-800 px-1.5 py-0.5 rounded">
              {g.category}
            </span>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-full py-12 text-center text-slate-500">No images yet.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-semibold">Edit image</h2>
              <button onClick={() => setEditing(null)} className="h-9 w-9 rounded-full hover:bg-slate-100 inline-flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              <Input label="Title" value={editing.title ?? ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              <Input label="Caption" value={editing.caption ?? ''} onChange={(e) => setEditing({ ...editing, caption: e.target.value })} />
              <Select label="Category" value={editing.category ?? 'campus'} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                {['campus', 'events', 'activities', 'sports'].map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={saveEdit}><Save className="h-4 w-4" /> Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
