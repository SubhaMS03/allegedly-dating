'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/profile');
      router.refresh();
    }
  };

  const inputClass = "w-full px-4 py-3 border-2 border-black bg-white text-black font-mono text-sm placeholder:text-gray-400 outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all";

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="border-2 border-black p-8">
        <div className="mb-8 border-b-2 border-black pb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">[ allegedlydating ]</p>
          <h1 className="text-3xl font-black uppercase tracking-tight">Create Account</h1>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              required
              className={inputClass}
            />
          </div>

          {error && (
            <p className="text-sm font-mono text-red-600 border-l-4 border-red-600 pl-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-black text-white font-black uppercase tracking-widest text-sm hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-xs font-mono text-gray-500 text-center">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-bold text-black border-b border-black hover:text-gray-500 transition">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
