"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { type Election } from "@/lib/dummy-data";
import { calcPercentage, formatDate } from "@/lib/utils";
import {
  Vote,
  Trophy,
  Users,
  BarChart3,
  ArrowLeft,
  Clock,
  RefreshCw,
} from "lucide-react";

interface ResultsPageProps {
  election: Election;
}

const CHART_COLORS = ["#00356B", "#0079F1", "#16A34A", "#7C3AED", "#DC2626"];

export function ResultsPage({ election }: ResultsPageProps) {
  const totalVotes = election.candidates.reduce((sum, c) => sum + c.votes, 0);
  const winner = [...election.candidates].sort((a, b) => b.votes - a.votes)[0];
  const turnout = calcPercentage(election.votedCount, election.totalVoters);

  const chartConfig = election.candidates.reduce(
    (acc, c, i) => ({
      ...acc,
      [c.name.split(" ")[0]]: { label: c.name, color: CHART_COLORS[i % CHART_COLORS.length] },
    }),
    {} as Record<string, { label: string; color: string }>
  );

  const barData = election.candidates.map((c) => ({
    name: c.name.split(" ")[0],
    votes: c.votes,
    pct: calcPercentage(c.votes, totalVotes),
    fill: c.color,
  }));

  const pieData = election.candidates.map((c) => ({
    name: c.name.split(" ")[0],
    value: c.votes,
    fill: c.color,
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="page-container flex h-16 items-center justify-between">
          <Link="/" className="flex items-center gap-2 font-bold text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Vote className="h-4 w-4" />
            </div>
            <span className="hidden sm:inline text-lg tracking-tight">
              Uni<span className="text-brand font-extrabold">Vote</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="text-xs bg-success/10 text-success border-success/30 hidden sm:flex items-center gap-1.5"
            >
              <RefreshCw className="h-3 w-3 animate-spin" />
              Live Results
            </Badge>
            <ThemeToggle />
            <Link="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="page-container py-8">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                {election.title}
              </h1>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <Badge
                  variant="outline"
                  className={
                    election.status === "active"
                      ? "bg-success/15 text-success border-success/30"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {election.status === "active" ? "• Live" : "Closed"}
                </Badge>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDate(election.startDate)} – {formatDate(election.endDate)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Votes", value: totalVotes.toLocaleString(), icon: Vote, color: "text-primary bg-primary/10" },
            { label: "Eligible Voters", value: election.totalVoters.toLocaleString(), icon: Users, color: "text-brand bg-brand/10" },
            { label: "Turnout", value: `${turnout}%`, icon: BarChart3, color: "text-success bg-success/10" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/60">
              <CardContent className="p-4">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg mb-2 ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
                <div className="text-stat text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Winner card */}
        {totalVotes > 0 && (
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-brand/5 mb-8 overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-brand to-success" />
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-5 w-5 text-amber-500" />
                <span className="text-label text-muted-foreground">
                  {election.status === "active" ? "Current Leader" : "Winner"}
                </span>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <Avatar className="h-16 w-16 ring-2 ring-primary/30">
                  <AvatarImage src={winner.avatar} alt={winner.name} />
                  <AvatarFallback
                    className="text-lg font-bold text-white"
                    style={{ backgroundColor: winner.color }}
                  >
                    {winner.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-2xl font-extrabold text-foreground">{winner.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {winner.position} · {winner.department} · {winner.level}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm font-semibold text-foreground">
                      {winner.votes.toLocaleString()} votes
                    </span>
                    <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">
                      {calcPercentage(winner.votes, totalVotes)}% of votes
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Bar chart */}
          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                Votes by Candidate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-56 w-full">
                <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={70}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="votes" radius={[0, 4, 4, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Pie chart */}
          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-brand" />
                Vote Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-56 w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Candidate breakdown */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Detailed Standings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5">
              {[...election.candidates]
                .sort((a, b) => b.votes - a.votes)
                .map((candidate, rank) => {
                  const pct = calcPercentage(candidate.votes, totalVotes);
                  return (
                    <div key={candidate.id}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-6 text-center text-sm font-extrabold text-muted-foreground">
                          {rank + 1}
                        </span>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={candidate.avatar} alt={candidate.name} />
                          <AvatarFallback
                            className="text-xs font-bold text-white"
                            style={{ backgroundColor: candidate.color }}
                          >
                            {candidate.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {candidate.name}
                              {rank === 0 && (
                                <Trophy className="ml-1.5 inline h-3.5 w-3.5 text-amber-500" />
                              )}
                            </p>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-sm font-bold text-foreground">
                                {candidate.votes.toLocaleString()}
                              </span>
                              <span className="text-xs text-muted-foreground">({pct}%)</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {candidate.department} · {candidate.level}
                          </p>
                        </div>
                      </div>
                      <Progress
                        value={pct}
                        className="h-2 ml-9"
                        style={
                          { "--progress-color": candidate.color } as React.CSSProperties
                        }
                      />
                      {rank < election.candidates.length - 1 && (
                        <Separator className="mt-5" />
                      )}
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
