import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceRoleClient } from '@/lib/supabase/server';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().optional().nullable(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());
    const supabase = createServiceRoleClient();
    const { error } = await supabase.from('contact_messages').insert(data);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const message =
      err instanceof z.ZodError ? err.issues[0]?.message ?? 'Invalid input' : err.message ?? 'Failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
