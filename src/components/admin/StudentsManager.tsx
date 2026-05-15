"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { students, adminStats } from "@/lib/dummy-data";
import {
  Search,
  Users,
  CheckCircle2,
  XCircle,
  UserPlus,
  Download,
} from "lucide-react";
import { toast } from "sonner";

export function StudentsManager() {
  const [search, setSearch] = useState("");

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.matricNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase())
  );

  const votedCount = students.filter((s) => s.hasVoted).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Students", value: adminStats.totalStudents.toLocaleString(), icon: Users, color: "text-primary bg-primary/10" },
          { label: "Registered Voters", value: adminStats.registeredVoters.toLocaleString(), icon: UserPlus, color: "text-brand bg-brand/10" },
          { label: "Votes Cast", value: adminStats.totalVotesCast.toLocaleString(), icon: CheckCircle2, color: "text-success bg-success/10" },
          { label: "Not Yet Voted", value: (adminStats.registeredVoters - adminStats.totalVotesCast).toLocaleString(), icon: XCircle, color: "text-destructive bg-destructive/10" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/60">
            <CardContent className="p-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg mb-3 ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <div className="text-2xl font-extrabold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Students table */}
      <Card className="border-border/60">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <CardTitle className="text-sm font-semibold">
              Student Records
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 w-52 text-sm"
                />
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.info("Export functionality coming soon")}
              >
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Student</TableHead>
                  <TableHead>Matric No.</TableHead>
                  <TableHead className="hidden sm:table-cell">Department</TableHead>
                  <TableHead className="hidden md:table-cell">Level</TableHead>
                  <TableHead>Voted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((student) => (
                  <TableRow key={student.id} className="group">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                            {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground leading-none">
                            {student.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-mono text-muted-foreground">
                      {student.matricNumber}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {student.department}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {student.level}
                    </TableCell>
                    <TableCell>
                      {student.hasVoted ? (
                        <Badge className="bg-success/15 text-success border-success/30 text-xs">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Voted
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs text-muted-foreground">
                          <XCircle className="mr-1 h-3 w-3" />
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-muted-foreground text-sm">
              No students found for &quot;{search}&quot;
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
