import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { type Candidate } from "@/lib/dummy-data";
import { GraduationCap, Vote } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
  onVote: () => void;
  disabled: boolean;
}

export function CandidateCard({ candidate, onVote, disabled }: CandidateCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden card-hover">
      {/* Color stripe */}
      <div className="h-1.5 w-full" style={{ backgroundColor: candidate.color }} />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Avatar & identity */}
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 ring-2 ring-border">
            <AvatarImage src={candidate.avatar} alt={candidate.name} />
            <AvatarFallback className="text-sm font-bold text-white" style={{ backgroundColor: candidate.color }}>
              {candidate.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground leading-tight truncate">{candidate.name}</p>
            <Badge
              variant="secondary"
              className="mt-1 text-xs px-2 py-0.5 font-medium"
              style={{ backgroundColor: `${candidate.color}15`, color: candidate.color, borderColor: `${candidate.color}30` }}
            >
              {candidate.position}
            </Badge>
          </div>
        </div>

        {/* Department & level */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <GraduationCap className="h-3.5 w-3.5 shrink-0" />
          <span>{candidate.department} · {candidate.level}</span>
        </div>

        {/* Manifesto */}
        <div className="flex-1">
          <p className="text-xs text-label text-muted-foreground mb-1.5">Manifesto</p>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
            {candidate.manifesto}
          </p>
        </div>

        {/* Vote button */}
        <Button
          onClick={onVote}
          disabled={disabled}
          className="w-full mt-auto font-semibold text-white"
          style={{ backgroundColor: candidate.color }}
        >
          <Vote className="mr-2 h-4 w-4" />
          Vote for {candidate.name.split(" ")[0]}
        </Button>
      </div>
    </div>
  );
}
