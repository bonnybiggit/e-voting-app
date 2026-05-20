'use client';

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, User, Loader2, ShieldCheck, CheckCircle2, IdCard, GraduationCap } from 'lucide-react';
import { api } from '@/lib/mock-api';

export default function StudentLoginPage() {
  const [matric, setMatric] = useState('');
  const [pin, setPin] = useState('');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSuccess = searchParams.get('success') === '1';

  const handleMatricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.toUpperCase();
    // Simple formatting: ACE/2024/XXX
    if (val.length > 3 && !val.startsWith('ACE/')) {
        val = 'ACE/' + val;
    }
    setMatric(val);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        if (!matric || !pin || !fullName || !department) throw new Error('Please fill all fields');
        await api.register(fullName, matric, department, pin);
        await api.login(matric, pin);
      } else {
        if (!matric || !pin) throw new Error('Please enter matric number and PIN');
        await api.login(matric, pin);
      }
      navigate('/ballot');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-8 py-12">
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Student Portal</h1>
        <p className="text-slate-500">
          {isRegistering ? 'Register to participate in the upcoming elections.' : 'Enter your credentials to access the live ballot.'}
        </p>
      </div>

      {isSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 shadow-sm">
            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
            <div>
                <p className="font-bold text-green-800">Vote Successful</p>
                <p className="text-sm text-green-600">Your ballot has been securely cast and recorded. Thank you!</p>
            </div>
        </div>
      )}

      <form onSubmit={handleAuth} className="space-y-5">
        {isRegistering && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <div className="relative">
                <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Department</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Computer Science"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
          </>
        )}

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
          ) : isRegistering ? (
            'Complete Registration'
          ) : (
            'Access Ballot'
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }}
          className="text-sm font-bold text-slate-500 hover:text-primary transition-colors"
        >
          {isRegistering ? 'Already registered? Log in here' : 'New student? Register here'}
        </button>
      </div>

      <div className="mt-auto pt-8 text-center">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Adeyemi College of Education</p>
      </div>
    </div>
  );
}
