import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, ArrowRight, Clock } from "lucide-react";
import { elections } from "@/lib/dummy-data";
import { formatDate, calcPercentage } from "@/lib/utils";

const statusConfig = {
  active: { label: "Live", className: "bg-success/15 text-success border-success/30" },
  upcoming: { label: "Upcoming", className: "bg-brand/15 text-brand border-brand/30" },
  closed: { label: "Closed", className: "bg-muted text-muted-foreground" },
};

export function ElectionInfoSection() {
  return (
    <section id="elections" className="py-20 bg-background">
      <div className="page-container">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-label text-primary mb-2">Current Elections</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Active &amp; Upcoming Elections
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Stay informed about all elections happening at your university.
            Cast your vote before the deadline.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {elections.map((election) => {
            const status = statusConfig[election.status];
            const turnout = calcPercentage(
              election.votedCount,
              election.totalVoters
            );

            return (
              <Card
                key={election.id}
                className="card-hover flex flex-col border-border/60"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-base font-bold leading-snug">
                      {election.title}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={`shrink-0 text-xs ${status.className}`}
                    >
                      {status.label === "Live" && (
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-success" />
                      )}
                      {status.label}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2 text-sm mt-1">
                    {election.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 flex-1">
                  {/* Dates */}
                  <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>Starts: {formatDate(election.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-destructive" />
                      <span>Ends: {formatDate(election.endDate)}</span>
                    </div>
                  </div>

                  {/* Turnout */}
                  {election.status !== "upcoming" && (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <Users className="h-3 w-3" />
                          Voter Turnout
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          {turnout}%
                        </span>
                      </div>
                      <Progress value={turnout} className="h-1.5" />
                      <p className="mt-1 text-xs text-muted-foreground">
                        {election.votedCount.toLocaleString()} of{" "}
                        {election.totalVoters.toLocaleString()} voted
                      </p>
                    </div>
                  )}

                  {/* Candidates count */}
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {election.candidates.length}
                    </span>{" "}
                    candidate{election.candidates.length !== 1 ? "s" : ""}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-2">
                    {election.status === "active" ? (
                      <Link href="/login">
                        <Button
                          size="sm"
                          className="w-full bg-primary text-white hover:bg-primary/90"
                        >
                          Vote Now
                          <ArrowRight className="ml-2 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    ) : election.status === "closed" ? (
                      <Link href={`/results/${election.id}`}>
                        <Button size="sm" variant="outline" className="w-full">
                          View Results
                        </Button>
                      </Link>
                    ) : (
                      <Button size="sm" variant="outline" className="w-full" disabled>
                        Not Yet Open
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
