import { createClient } from '@/lib/supabase/server';
import { SettingsForm } from './SettingsForm';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.from('school_info').select('*').limit(1).maybeSingle();
  return <SettingsForm initial={data} />;
}
