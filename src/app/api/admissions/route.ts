import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceRoleClient } from '@/lib/supabase/server';

const schema = z.object({
  student_name: z.string().min(2),
  parent_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  grade_applying: z.string().min(1),
  previous_school: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const supabase = createServiceRoleClient();
    const { error } = await supabase.from('admissions').insert({ ...data, status: 'new' });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const message =
      err instanceof z.ZodError
        ? err.issues[0]?.message ?? 'Invalid input'
        : err.message ?? 'Submission failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
