"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { type Candidate } from "@/lib/dummy-data";
import { CheckCircle2, Loader2, AlertTriangle } from "lucide-react";

interface VoteModalProps {
  candidate: Candidate | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (candidate: Candidate) => void;
}

export function VoteModal({ candidate, open, onClose, onConfirm }: VoteModalProps) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = async () => {
    if (!candidate) return;
    const confirmedCandidate = candidate;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setConfirmed(true);
    await new Promise((r) => setTimeout(r, 1500));
    setConfirmed(false);
    onConfirm(confirmedCandidate);
  };

  const handleClose = () => {
    if (!loading && !confirmed) onClose();
  };

  if (!candidate) return null;

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className="max-w-sm">
        {confirmed ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-foreground">Vote Cast!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your vote for <strong>{candidate.name}</strong> has been recorded securely.
              </p>
            </div>
          </div>
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-extrabold">
                Confirm Your Vote
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. You can only vote once per election.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* Candidate preview */}
            <div className="my-2 rounded-xl border border-border/60 bg-muted/30 p-4 flex items-center gap-3">
              <Avatar className="h-12 w-12 ring-2" style={{ "--tw-ring-color": candidate.color } as React.CSSProperties}>
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback
                  className="text-sm font-bold text-white"
                  style={{ backgroundColor: candidate.color }}
                >
                  {candidate.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-foreground">{candidate.name}</p>
                <Badge
                  variant="outline"
                  className="mt-0.5 text-xs"
                  style={{ color: candidate.color, borderColor: `${candidate.color}40` }}
                >
                  {candidate.position}
                </Badge>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {candidate.department} · {candidate.level}
                </p>
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Please ensure this is your final choice. Votes cannot be changed once submitted.
              </p>
            </div>

            <AlertDialogFooter className="mt-2">
              <AlertDialogCancel disabled={loading} onClick={onClose}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirm}
                disabled={loading}
                className="bg-primary text-white hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Confirm Vote"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
