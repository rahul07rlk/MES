import { createClient } from '@/lib/supabase/server';
import { AdmissionsAdmin } from './AdmissionsAdmin';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('admissions')
    .select('*')
    .order('created_at', { ascending: false });
  return <AdmissionsAdmin initial={data ?? []} />;
}
