'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Users, CheckSquare, Percent, UploadCloud, FileText, Play, Square, AlertTriangle, RefreshCcw, BarChart3, Search, Edit2, Trash2, Plus
} from 'lucide-react';
import { api, mockPositions } from '@/lib/mock-api';
import { ElectionMetrics } from '@/lib/types';

function DashboardContent() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';
  
  const [metrics, setMetrics] = useState<ElectionMetrics | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [voters, setVoters] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  
  const [showConfirm, setShowConfirm] = useState<'START' | 'END' | null>(null);

  // Candidate Form State
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [editCandidateId, setEditCandidateId] = useState<string | null>(null);
  const [candidateForm, setCandidateForm] = useState({ positionId: '1', fullName: '', department: '', manifesto: '', photoUrl: '' });

  const fetchData = async () => {
    try {
      const [m, r, v, c] = await Promise.all([
        api.getElectionMetrics(),
        api.getResults(),
        api.adminGetVoters(),
        api.getCandidates()
      ]);
      setMetrics(m);
      setResults(r);
      setVoters(v);
      setCandidates(c);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editCandidateId) {
        await api.adminUpdateCandidate(editCandidateId, candidateForm);
      } else {
        await api.adminCreateCandidate(candidateForm);
      }
      setShowCandidateForm(false);
      fetchData();
    } catch (err) {
      alert('Error saving candidate');
    }
  };

  const handleDeleteCandidate = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      await api.adminDeleteCandidate(id);
      fetchData();
    }
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

          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Real-time Vote Distribution</h3>
                <p className="text-sm text-slate-500">Live data polling from secure nodes</p>
              </div>
              <button onClick={fetchData} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-16">
              {mockPositions.map((pos) => {
                const posCandidates = candidates.filter(c => c.positionId === pos.id);
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
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Voters Roster</h2>
              <p className="text-slate-500">Live database of registered student voters ({voters.length}).</p>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
            <div className="overflow-hidden rounded-2xl border border-slate-100">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Matric Number', 'Full Name', 'Department', 'Status'].map(h => (
                      <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {voters.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-6 py-4 font-bold text-sm text-slate-900">{row.matricNumber}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{row.fullName}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{row.department}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black px-2 py-1 rounded-md ${row.status === 'VOTED' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {voters.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-400 text-sm">No registered voters yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. CANDIDATES MANAGEMENT */}
      {activeTab === 'candidates' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Candidates Management</h2>
              <p className="text-slate-500">Add, update, or remove candidates from the live ballot.</p>
            </div>
            <button 
              onClick={() => {
                setCandidateForm({ positionId: '1', fullName: '', department: '', manifesto: '', photoUrl: '' });
                setEditCandidateId(null);
                setShowCandidateForm(true);
              }}
              className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Candidate
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm">
             <div className="grid gap-6">
                {candidates.map((c) => {
                  const posName = mockPositions.find(p => p.id === c.positionId)?.title;
                  return (
                    <div key={c.id} className="flex items-center justify-between p-6 border border-slate-100 rounded-2xl hover:border-slate-200 transition-all group">
                      <div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{posName}</p>
                        <h4 className="font-bold text-slate-900 text-lg">{c.fullName}</h4>
                        <p className="text-sm text-slate-500">{c.department}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setEditCandidateId(c.id);
                            setCandidateForm({ ...c });
                            setShowCandidateForm(true);
                          }}
                          className="p-3 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCandidate(c.id)}
                          className="p-3 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
                {candidates.length === 0 && (
                  <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 rounded-3xl">
                    No candidates found. Please add some candidates to the database.
                  </div>
                )}
             </div>
          </div>
        </div>
      )}

      {/* 4. ELECTION CONTROLS */}
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
           </div>
        </div>
      )}

      {/* Candidate Modal */}
      {showCandidateForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-black text-slate-900 mb-6">{editCandidateId ? 'Edit Candidate' : 'Add Candidate'}</h3>
            <form onSubmit={handleSaveCandidate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Position</label>
                <select 
                  value={candidateForm.positionId} 
                  onChange={(e) => setCandidateForm({...candidateForm, positionId: e.target.value})}
                  className="w-full px-4 py-3 mt-1 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-primary"
                >
                  {mockPositions.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                <input required type="text" placeholder="John Doe" value={candidateForm.fullName} onChange={(e) => setCandidateForm({...candidateForm, fullName: e.target.value})} className="w-full px-4 py-3 mt-1 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Department</label>
                <input required type="text" placeholder="Science" value={candidateForm.department} onChange={(e) => setCandidateForm({...candidateForm, department: e.target.value})} className="w-full px-4 py-3 mt-1 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Manifesto (Optional)</label>
                <textarea value={candidateForm.manifesto} placeholder="My vision is..." onChange={(e) => setCandidateForm({...candidateForm, manifesto: e.target.value})} className="w-full px-4 py-3 mt-1 bg-slate-50 rounded-xl border border-slate-200 h-24 resize-none outline-none focus:border-primary" />
              </div>
              <div className="flex gap-3 pt-6">
                <button type="button" onClick={() => setShowCandidateForm(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 font-bold py-3 rounded-xl text-slate-600 transition-all">Cancel</button>
                <button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all">Save Profile</button>
              </div>
            </form>
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
