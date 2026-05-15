"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  Vote,
  BarChart3,
  CheckCircle2,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {
  adminStats,
  turnoutByFaculty,
  dailyTurnout,
} from "@/lib/dummy-data";

const statCards = [
  {
    title: "Total Students",
    value: adminStats.totalStudents.toLocaleString(),
    icon: Users,
    change: "+2.3%",
    color: "text-primary bg-primary/10",
  },
  {
    title: "Votes Cast",
    value: adminStats.totalVotesCast.toLocaleString(),
    icon: Vote,
    change: "+18.5%",
    color: "text-brand bg-brand/10",
  },
  {
    title: "Active Elections",
    value: adminStats.activeElections.toString(),
    icon: Calendar,
    change: "2 running",
    color: "text-success bg-success/10",
  },
  {
    title: "Overall Turnout",
    value: `${adminStats.turnoutPercentage}%`,
    icon: TrendingUp,
    change: "+5.2%",
    color: "text-primary bg-primary/10",
  },
];

const chartConfig = {
  voted: { label: "Voted", color: "var(--color-chart-1)" },
  registered: { label: "Registered", color: "var(--color-chart-2)" },
  votes: { label: "Votes", color: "var(--color-chart-1)" },
};

export function AdminOverview() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-border/60">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.color}`}
                >
                  <stat.icon className="h-4.5 w-4.5" />
                </div>
                <span className="text-xs font-medium text-success">
                  {stat.change}
                </span>
              </div>
              <div className="text-stat text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Faculty turnout bar chart */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Turnout by Faculty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-52 w-full">
              <BarChart data={turnoutByFaculty} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                <XAxis
                  dataKey="faculty"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="voted" fill="var(--color-chart-1)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="registered" fill="var(--color-chart-2)" radius={[3, 3, 0, 0]} opacity={0.4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Daily votes line chart */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-brand" />
              Daily Vote Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-52 w-full">
              <LineChart data={dailyTurnout} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="votes"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "var(--color-chart-1)" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Faculty breakdown table */}
      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            Faculty Participation Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {turnoutByFaculty.map((faculty) => (
              <div key={faculty.faculty} className="flex items-center gap-4">
                <span className="w-28 shrink-0 text-sm font-medium text-foreground">
                  {faculty.faculty}
                </span>
                <div className="flex-1">
                  <Progress value={faculty.percentage} className="h-2" />
                </div>
                <span className="w-12 shrink-0 text-right text-sm font-semibold text-foreground">
                  {faculty.percentage}%
                </span>
                <span className="hidden sm:block w-24 shrink-0 text-right text-xs text-muted-foreground">
                  {faculty.voted}/{faculty.registered}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
