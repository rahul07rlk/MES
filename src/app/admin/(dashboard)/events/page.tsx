import { createClient } from '@/lib/supabase/server';
import { EventsAdmin } from './EventsAdmin';

export const dynamic = 'force-dynamic';

export default async function AdminEventsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('events').select('*').order('start_at', { ascending: false });
  return <EventsAdmin initial={data ?? []} />;
}
