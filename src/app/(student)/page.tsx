'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Loader2, ShieldCheck } from 'lucide-react';
import { api } from '@/lib/mock-api';

export default function StudentLoginPage() {
  const [matric, setMatric] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleMatricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.toUpperCase();
    // Simple formatting: ACE/2024/XXX
    if (val.length > 3 && !val.startsWith('ACE/')) {
        val = 'ACE/' + val;
    }
    setMatric(val);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matric || !pin) {
        setError('Please fill in all fields');
        return;
    }
    setError('');
    setLoading(true);
    try {
      await api.login(matric, pin);
      router.push('/ballot');
    } catch (err) {
      setError('Invalid matric number or PIN');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-8 py-12">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Student Portal</h1>
        <p className="text-slate-500">Enter your credentials to access the live ballot.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Matric Number</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="ACE/2021/000"
              value={matric}
              onChange={handleMatricChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Access PIN</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="password"
              placeholder="••••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Access Ballot'
          )}
        </button>
      </form>

      <div className="mt-auto pt-12 text-center">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Adeyemi College of Education</p>
      </div>
    </div>
  );
}
