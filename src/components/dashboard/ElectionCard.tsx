"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { type Election } from "@/lib/dummy-data";
import { calcPercentage, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock } from "lucide-react";

interface ElectionCardProps {
  election: Election;
  isSelected: boolean;
  hasVoted: boolean;
  onClick: () => void;
}

const statusConfig = {
  active: "bg-success/15 text-success border-success/30",
  upcoming: "bg-brand/15 text-brand border-brand/30",
  closed: "bg-muted text-muted-foreground",
};

export function ElectionCard({
  election,
  isSelected,
  hasVoted,
  onClick,
}: ElectionCardProps) {
  const turnout = calcPercentage(election.votedCount, election.totalVoters);

  return (
    <button
      onClick={onClick}
      className={cn(
        "text-left rounded-xl border p-4 transition-all duration-200 w-full",
        isSelected
          ? "border-primary/50 bg-primary/5 ring-1 ring-primary/30"
          : "border-border/60 bg-card hover:border-primary/30 hover:bg-primary/3"
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
          {election.title}
        </p>
        <div className="flex items-center gap-1.5 shrink-0">
          {hasVoted && <CheckCircle2 className="h-4 w-4 text-success" />}
          <Badge
            variant="outline"
            className={`text-xs ${statusConfig[election.status]}`}
          >
            {election.status === "active" ? "Live" : election.status === "upcoming" ? "Soon" : "Closed"}
          </Badge>
        </div>
      </div>

      {election.status !== "upcoming" && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Turnout</span>
            <span className="text-xs font-semibold">{turnout}%</span>
          </div>
          <Progress value={turnout} className="h-1.5" />
        </div>
      )}

      <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
        <Clock className="h-3 w-3 shrink-0" />
        <span>Ends {formatDate(election.endDate)}</span>
      </div>
    </button>
  );
}
