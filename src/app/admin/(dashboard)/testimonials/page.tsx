import { createClient } from '@/lib/supabase/server';
import { TestimonialsAdmin } from './TestimonialsAdmin';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true });
  return <TestimonialsAdmin initial={data ?? []} />;
}
