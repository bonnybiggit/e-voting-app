'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, UserCircle, CheckCircle2, Info, Loader2 } from 'lucide-react';
import { mockPositions, api } from '@/lib/mock-api';

export default function BallotPage() {
  const navigate = useNavigate();
  const [selectedVotes, setSelectedVotes] = useState<Record<string, string>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showManifesto, setShowManifesto] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    // Fetch live candidates
    api.getCandidates().then(setCandidates).catch(console.error);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert('Your voting session has expired! Please log in again.');
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleVote = (positionId: string, candidateId: string) => {
    setSelectedVotes((prev) => ({ ...prev, [positionId]: candidateId }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await api.submitBallot(selectedVotes);
      navigate('/?success=1');
    } catch (err) {
      alert('Error submitting ballot');
    } finally {
      setSubmitting(false);
    }
  };

  const currentManifesto = candidates.find(c => c.id === showManifesto);

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Voter ID</p>
            <p className="text-sm font-semibold text-slate-900">ACE/****/001</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
          <Timer className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-bold text-primary tabular-nums">{formatTime(timeLeft)}</span>
        </div>
      </header>

      {/* Main Ballot Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8 pb-32 space-y-12">
        {mockPositions.map((position) => (
          <section key={position.id} className="space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <h2 className="text-xl font-bold text-slate-900">{position.title}</h2>
              <p className="text-sm text-slate-500">Select one candidate</p>
            </div>

            <div className="space-y-4">
              {candidates
                .filter((c) => c.positionId === position.id)
                .map((candidate) => (
                  <div
                    key={candidate.id}
                    onClick={() => handleVote(position.id, candidate.id)}
                    className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer group ${
                      selectedVotes[position.id] === candidate.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden transition-all group-hover:shadow-lg">
                        {candidate.photoUrl ? (
                          <img src={candidate.photoUrl} alt={candidate.fullName} className="w-full h-full object-cover" />
                        ) : (
                          <UserCircle className="w-10 h-10 text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">

                        <h3 className="font-bold text-slate-900 truncate">{candidate.fullName}</h3>
                        <p className="text-sm text-slate-500 mb-2">{candidate.department}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowManifesto(candidate.id);
                          }}
                          className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                        >
                          <Info className="w-3 h-3" /> View Manifesto
                        </button>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                         selectedVotes[position.id] === candidate.id 
                         ? 'border-primary bg-primary' 
                         : 'border-slate-200'
                      }`}>
                         {selectedVotes[position.id] === candidate.id && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-white via-white to-white/0 pointer-events-none flex gap-3">
        {Object.keys(selectedVotes).length > 0 && (
          <button
            onClick={() => setSelectedVotes({})}
            className="pointer-events-auto bg-white border-2 border-red-100 hover:border-red-200 hover:bg-red-50 text-red-500 font-bold px-6 py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center whitespace-nowrap"
            title="Clear All Selections"
          >
            Clear All
          </button>
        )}
        <button
          onClick={() => setShowConfirm(true)}
          disabled={Object.keys(selectedVotes).length === 0}
          className="w-full flex-1 pointer-events-auto bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all disabled:opacity-50 disabled:shadow-none active:scale-[0.98]"
        >
          Submit Ballot ({Object.keys(selectedVotes).length}/{mockPositions.length})
        </button>
      </div>

      {/* Manifesto Modal */}
      {showManifesto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{currentManifesto?.fullName}</h3>
            <p className="text-sm font-bold text-primary mb-6">{currentManifesto?.department}</p>
            <div className="bg-slate-50 p-4 rounded-2xl mb-8">
              <p className="text-slate-600 leading-relaxed italic text-sm">"{currentManifesto?.manifesto}"</p>
            </div>
            <button
              onClick={() => setShowManifesto(null)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Cast your vote?</h3>
            <p className="text-slate-500 mb-8">This action cannot be undone. Your selection will be recorded securely and anonymously.</p>
            <div className="space-y-3">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Selection'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={submitting}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-4 rounded-2xl transition-all"
              >
                Back to Ballot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
