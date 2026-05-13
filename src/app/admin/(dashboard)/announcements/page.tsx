import { createClient } from '@/lib/supabase/server';
import { AnnouncementsAdmin } from './AnnouncementsAdmin';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('announcements')
    .select('*')
    .order('published_at', { ascending: false });
  return <AnnouncementsAdmin initial={data ?? []} />;
}
