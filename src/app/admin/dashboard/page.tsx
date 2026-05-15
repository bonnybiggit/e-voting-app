'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Users, 
  CheckSquare, 
  Percent, 
  UploadCloud, 
  FileText, 
  Play, 
  Square, 
  AlertTriangle,
  RefreshCcw,
  BarChart3,
  Search
} from 'lucide-react';
import { api, mockPositions, mockCandidates } from '@/lib/mock-api';
import { ElectionMetrics } from '@/lib/types';

function DashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';
  
  const [metrics, setMetrics] = useState<ElectionMetrics | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showConfirm, setShowConfirm] = useState<'START' | 'END' | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const m = await api.getElectionMetrics();
      const r = await api.getResults();
      setMetrics(m);
      setResults(r);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsUploading(false), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. DASHBOARD / LIVE MONITORING */}
      {activeTab === 'dashboard' && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Live Election Status</h2>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">Live Monitoring</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Eligible Voters', value: metrics?.totalEligible.toLocaleString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Ballots Cast', value: metrics?.totalCast.toLocaleString(), icon: CheckSquare, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Current Turnout', value: `${metrics?.turnoutPercentage}%`, icon: Percent, color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300">
                <div className={`${stat.bg} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-4xl font-black text-slate-900">{stat.value || '---'}</p>
              </div>
            ))}
          </div>

          {/* Live Results Section */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Real-time Vote Distribution</h3>
                <p className="text-sm text-slate-500">Live data polling from secure nodes</p>
              </div>
              <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-16">
              {mockPositions.map((pos) => {
                const posCandidates = mockCandidates.filter(c => c.positionId === pos.id);
                const totalVotesForPos = posCandidates.reduce((acc, c) => {
                  const r = results.find(res => res.candidateId === c.id);
                  return acc + (r?.votes || 0);
                }, 0);

                return (
                  <div key={pos.id} className="space-y-6">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <h4 className="font-black text-lg uppercase tracking-tight text-slate-800">{pos.title}</h4>
                    </div>
                    <div className="grid gap-8">
                      {posCandidates.map((c) => {
                        const r = results.find(res => res.candidateId === c.id);
                        const percentage = totalVotesForPos > 0 ? ((r?.votes || 0) / totalVotesForPos * 100).toFixed(1) : '0';
                        return (
                          <div key={c.id} className="space-y-2">
                            <div className="flex justify-between items-end mb-2">
                              <div>
                                <p className="font-bold text-slate-900">{c.fullName}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{c.department}</p>
                              </div>
                              <p className="font-black text-slate-900">{r?.votes.toLocaleString() || 0} <span className="text-xs text-slate-400 font-bold">({percentage}%)</span></p>
                            </div>
                            <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                              <div 
                                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* 2. ROSTER MANAGEMENT */}
      {activeTab === 'roster' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Roster Management</h2>
              <p className="text-slate-500">Manage the registry of eligible voters for this election cycle.</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Search matric..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm" />
               </div>
               <button className="bg-primary text-white font-bold px-6 py-2 rounded-xl text-sm shadow-lg shadow-primary/10">Add Student</button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center hover:border-primary/50 transition-all group bg-slate-50/50">
              <input type="file" className="hidden" id="csv-upload" onChange={handleFileUpload} accept=".csv" />
              <label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-all">
                  <UploadCloud className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Upload Active Student Roster</h3>
                <p className="text-sm text-slate-500 mb-6">Drag and drop your CSV file here, or click to browse</p>
                
                {isUploading ? (
                  <div className="w-full max-w-xs space-y-2">
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                    </div>
                    <p className="text-[10px] font-bold text-primary uppercase">Processing Data: {uploadProgress}%</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-medium text-slate-600">Sample_Roster.csv</span>
                  </div>
                )}
              </label>
            </div>

            <div className="mt-12 overflow-hidden rounded-2xl border border-slate-100">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Matric Number', 'Full Name', 'Department', 'Status'].map(h => (
                      <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { m: 'ACE/2021/001', n: 'John Doe', d: 'Computer Science', s: 'ELIGIBLE' },
                    { m: 'ACE/2021/002', n: 'Jane Smith', d: 'Mathematics', s: 'VOTED' },
                    { m: 'ACE/2021/003', n: 'David Obi', d: 'Physics', s: 'ELIGIBLE' },
                    { m: 'ACE/2021/004', n: 'Sarah Ahmed', d: 'Biology', s: 'VOTED' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-6 py-4 font-bold text-sm text-slate-900">{row.m}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{row.n}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{row.d}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black px-2 py-1 rounded-md ${row.s === 'VOTED' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                          {row.s}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. ELECTION CONTROLS */}
      {activeTab === 'controls' && (
        <div className="space-y-8">
           <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Election Controls</h2>
              <p className="text-slate-500">Initialize, start, and terminate the election cycle.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="font-bold text-lg text-slate-900">Current Phase</h3>
                   <span className="bg-green-100 text-green-700 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest border border-green-200">Active</span>
                </div>
                <p className="text-sm text-slate-500 mb-10 leading-relaxed">
                  The election is currently live. Students are actively casting ballots. Results are being calculated in real-time.
                </p>
                <div className="space-y-4">
                  <button 
                    onClick={() => setShowConfirm('START')}
                    className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-400 font-bold py-4 rounded-2xl cursor-not-allowed border border-slate-100"
                  >
                    <Play className="w-5 h-5" /> Start Election
                  </button>
                  <button 
                    onClick={() => setShowConfirm('END')}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold py-4 rounded-2xl transition-all border border-red-200"
                  >
                    <Square className="w-5 h-5" /> End Election
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700" />
                 <h3 className="font-bold text-lg text-white mb-6">Security & Logs</h3>
                 <div className="space-y-4">
                    {[
                      'Encryption: AES-256 Enabled',
                      'Integrity: Blockchain Verified',
                      'Last Backup: 2 mins ago',
                      'Total Logs: 42,901 entries'
                    ].map((log, i) => (
                      <div key={i} className="flex items-center gap-3 text-white/40">
                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                         <span className="text-xs font-mono">{log}</span>
                      </div>
                    ))}
                 </div>
                 <button className="mt-12 w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all text-sm">
                    Download System Audit
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Confirmation Modals */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${showConfirm === 'START' ? 'bg-green-50' : 'bg-red-50'}`}>
               <AlertTriangle className={`w-8 h-8 ${showConfirm === 'START' ? 'text-green-600' : 'text-red-600'}`} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 italic uppercase">
              {showConfirm === 'START' ? 'Confirm Start' : 'Critical Action: End Election'}
            </h3>
            <p className="text-slate-500 mb-10 leading-relaxed">
              {showConfirm === 'START' 
                ? 'This will immediately open the voting portal for all eligible students. Ensure the roster is final before proceeding.'
                : 'Warning: This will permanently close the voting portal. This action is irreversible and will finalize all tallies.'}
            </p>
            <div className="flex gap-4">
               <button 
                onClick={() => setShowConfirm(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-4 rounded-2xl transition-all"
               >
                 Cancel
               </button>
               <button 
                onClick={() => {
                  alert(showConfirm === 'START' ? 'Election Started' : 'Election Ended');
                  setShowConfirm(null);
                }}
                className={`flex-1 font-bold py-4 rounded-2xl transition-all text-white shadow-lg ${
                  showConfirm === 'START' ? 'bg-green-600 shadow-green-200' : 'bg-red-600 shadow-red-200'
                }`}
               >
                 {showConfirm === 'START' ? 'Confirm Start' : 'Terminate Now'}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full"><RefreshCcw className="w-8 h-8 animate-spin text-primary" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}
