'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center bg-white">
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
          <CheckCircle2 className="w-20 h-20 text-green-500 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-lg shadow-lg animate-in zoom-in delay-500">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Ballot Cast!</h1>
      <p className="text-slate-500 mb-12 leading-relaxed">
        Your ballot has been securely cast and counted anonymously. Thank you for participating in the AFUED e-voting process.
      </p>

      <div className="w-full space-y-4">
        <button
          onClick={() => navigate('/')}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          Close Portal <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-sm text-slate-400">
          Auto-logging out in <span className="font-bold text-primary tabular-nums">{countdown}s</span>
        </p>
      </div>

      <div className="mt-20">
        <div className="flex items-center gap-2 justify-center py-3 px-6 bg-slate-50 rounded-full border border-slate-100">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Election Data Synced</span>
        </div>
      </div>
    </div>
  );
}
