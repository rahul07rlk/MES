'use client';

import { Suspense, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Lock, Mail, GraduationCap } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

function LoginForm() {
  const supabase = createClient();
  const router = useRouter();
  const sp = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Welcome back');
    router.push(sp.get('next') || '/admin');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div className="relative">
        <Mail className="absolute left-3 top-9 h-4 w-4 text-slate-400" />
        <Input
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-9 h-4 w-4 text-slate-400" />
        <Input
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pl-9"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full" size="lg">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign in'}
      </Button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-pattern p-6">
      <div className="w-full max-w-md glass-card p-8">
        <div className="flex items-center justify-center mb-6">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl
                           bg-gradient-to-br from-brand-600 to-brand-400 text-white">
            <GraduationCap className="h-6 w-6" />
          </span>
        </div>
        <h1 className="text-center font-serif text-2xl font-semibold">Admin sign in</h1>
        <p className="text-center text-sm text-slate-500 mt-1">
          Restricted area — administrators only.
        </p>
        <Suspense fallback={<div className="mt-6 h-48 animate-pulse rounded-xl bg-slate-100" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
