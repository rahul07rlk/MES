import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceRoleClient } from '@/lib/supabase/server';

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  try {
    const { email } = schema.parse(await req.json());
    const supabase = createServiceRoleClient();
    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email }, { onConflict: 'email' });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const message =
      err instanceof z.ZodError ? 'Please enter a valid email' : err.message ?? 'Failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
