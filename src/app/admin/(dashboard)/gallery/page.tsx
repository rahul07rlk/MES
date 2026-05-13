import { createClient } from '@/lib/supabase/server';
import { GalleryAdmin } from './GalleryAdmin';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('gallery')
    .select('*')
    .order('display_order', { ascending: true });
  return <GalleryAdmin initial={data ?? []} />;
}
