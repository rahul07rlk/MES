'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const contactSchema = z.object({
  name: z.string().min(2, 'Required'),
  email: z.string().email('Valid email required'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
export type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register, handleSubmit, reset, formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactFormValues) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Could not send');
      toast.success('Message sent! We will respond shortly.');
      reset();
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-4">
      <Input label="Your name" {...register('name')} error={errors.name?.message} />
      <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <div className="sm:col-span-2">
        <Input label="Subject (optional)" {...register('subject')} />
      </div>
      <div className="sm:col-span-2">
        <Textarea label="Message" rows={5} {...register('message')} error={errors.message?.message} />
      </div>
      <div className="sm:col-span-2 flex justify-end">
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="h-4 w-4" /> Send message</>}
        </Button>
      </div>
    </form>
  );
}
