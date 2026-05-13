'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { GRADES } from '@/lib/constants';

export const admissionSchema = z.object({
  student_name: z.string().min(2, 'Required'),
  parent_name: z.string().min(2, 'Required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Valid phone required'),
  grade_applying: z.string().min(1, 'Select a grade'),
  previous_school: z.string().optional(),
  address: z.string().optional(),
  message: z.string().optional(),
});
export type AdmissionFormValues = z.infer<typeof admissionSchema>;

export function AdmissionForm() {
  const {
    register, handleSubmit, reset, formState: { errors, isSubmitting },
  } = useForm<AdmissionFormValues>({ resolver: zodResolver(admissionSchema) });

  async function onSubmit(values: AdmissionFormValues) {
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Submission failed');
      toast.success("Inquiry received — we'll be in touch within 2 business days.");
      reset();
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-4">
      <Input label="Student's name" {...register('student_name')} error={errors.student_name?.message} />
      <Input label="Parent / guardian name" {...register('parent_name')} error={errors.parent_name?.message} />
      <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <Input label="Phone" type="tel" {...register('phone')} error={errors.phone?.message} />
      <Select label="Grade applying for" {...register('grade_applying')} error={errors.grade_applying?.message}>
        <option value="">Select grade…</option>
        {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
      </Select>
      <Input label="Previous school (optional)" {...register('previous_school')} />
      <div className="sm:col-span-2">
        <Input label="Address (optional)" {...register('address')} />
      </div>
      <div className="sm:col-span-2">
        <Textarea label="Message (optional)" rows={4} {...register('message')} />
      </div>
      <div className="sm:col-span-2 flex justify-end">
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="h-4 w-4" /> Submit inquiry</>}
        </Button>
      </div>
    </form>
  );
}
