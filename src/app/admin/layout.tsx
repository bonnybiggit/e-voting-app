'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, Settings, LogOut, ShieldCheck, Activity } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin';

  if (isLoginPage) return <>{children}</>;

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Roster Management', icon: Users, path: '/admin/dashboard?tab=roster' },
    { name: 'Election Controls', icon: Settings, path: '/admin/dashboard?tab=controls' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 shadow-2xl">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">AFUED</h1>
              <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Election Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-8">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                pathname + (window.location.search || '') === item.path
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${pathname + (window.location.search || '') === item.path ? 'text-white' : 'text-white/40 group-hover:text-white'}`} />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => router.push('/admin')}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 glass border-b border-white/20 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">

             <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">System Operational</span>
             </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900">Administrator</p>
              <p className="text-xs text-slate-500">Super Admin Access</p>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center">
                <Users className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
