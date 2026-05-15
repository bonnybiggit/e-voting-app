"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ElectionCard } from "@/components/dashboard/ElectionCard";
import { CandidateCard } from "@/components/dashboard/CandidateCard";
import { VoteModal } from "@/components/dashboard/VoteModal";
import { elections, type Candidate } from "@/lib/dummy-data";
import { Vote, LogOut, Bell } from "lucide-react";

const activeElections = elections.filter((e) => e.status === "active");

export default function DashboardPage() {
  const [selectedElectionId, setSelectedElectionId] = useState(
    activeElections[0]?.id ?? ""
  );
  const [voteCandidate, setVoteCandidate] = useState<Candidate | null>(null);
  const [votedElections, setVotedElections] = useState<Set<string>>(new Set());

  const selectedElection = elections.find((e) => e.id === selectedElectionId);

  const handleVoteConfirm = () => {
    setVotedElections((prev) => new Set(prev).add(selectedElectionId));
    setVoteCandidate(null);
  };

  const hasVoted = votedElections.has(selectedElectionId);

  return (
    <div className="min-h-screen bg-background">
      {/* Top navbar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="page-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Vote className="h-4 w-4" />
            </div>
            <span className="hidden sm:block text-lg tracking-tight">
              Uni<span className="text-brand font-extrabold">Vote</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-success" />
            </Button>
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/200?u=student001" />
                <AvatarFallback className="bg-primary text-white text-xs">AN</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-foreground leading-none">Adaeze Nwosu</p>
                <p className="text-xs text-muted-foreground mt-0.5">CSC/2021/001</p>
              </div>
            </div>
            <Link href="/login">
              <Button variant="ghost" size="icon" title="Logout">
                <LogOut className="h-4 w-4 text-muted-foreground" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="page-container py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Welcome back, <span className="text-primary">Adaeze</span> 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            {activeElections.length} active election{activeElections.length !== 1 ? "s" : ""} available. Cast your vote before the deadline.
          </p>
        </div>

        {/* Election selector */}
        <section className="mb-8">
          <h2 className="text-label text-muted-foreground mb-4">Active Elections</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {elections.map((election) => (
              <ElectionCard
                key={election.id}
                election={election}
                isSelected={selectedElectionId === election.id}
                hasVoted={votedElections.has(election.id)}
                onClick={() => setSelectedElectionId(election.id)}
              />
            ))}
          </div>
        </section>

        {/* Candidates */}
        {selectedElection && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-label text-muted-foreground">
                Candidates — {selectedElection.title}
              </h2>
              {hasVoted && (
                <Badge className="bg-success/15 text-success border-success/30 text-xs">
                  ✓ You have voted in this election
                </Badge>
              )}
            </div>

            {hasVoted ? (
              <div className="rounded-xl border border-success/30 bg-success/5 p-6 text-center">
                <div className="text-3xl mb-3">🎉</div>
                <h3 className="font-bold text-foreground mb-1">Your vote has been recorded!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Thank you for participating. Results will be announced after the election closes.
                </p>
                <Link href="/results/el-001">
                  <Button variant="outline" size="sm">
                    View Live Results
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {selectedElection.candidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onVote={() => setVoteCandidate(candidate)}
                    disabled={selectedElection.status !== "active"}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Vote confirmation modal */}
      <VoteModal
        candidate={voteCandidate}
        open={!!voteCandidate}
        onClose={() => setVoteCandidate(null)}
        onConfirm={handleVoteConfirm}
      />
    </div>
  );
}
