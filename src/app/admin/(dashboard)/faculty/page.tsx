import { createClient } from '@/lib/supabase/server';
import { FacultyAdmin } from './FacultyAdmin';

export const dynamic = 'force-dynamic';

export default async function AdminFacultyPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('faculty')
    .select('*')
    .order('display_order', { ascending: true });
  return <FacultyAdmin initial={data ?? []} />;
}
