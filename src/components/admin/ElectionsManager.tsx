"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { elections } from "@/lib/dummy-data";
import { formatDate, calcPercentage } from "@/lib/utils";
import { Plus, Calendar, Users, Eye, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const statusConfig = {
  active: "bg-success/15 text-success border-success/30",
  upcoming: "bg-brand/15 text-brand border-brand/30",
  closed: "bg-muted text-muted-foreground border-border",
};

export function ElectionsManager() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleCreate = () => {
    if (!form.title || !form.startDate || !form.endDate) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success(`Election "${form.title}" created successfully!`);
    setDialogOpen(false);
    setForm({ title: "", description: "", startDate: "", endDate: "" });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-foreground">Elections</h2>
          <p className="text-sm text-muted-foreground">
            {elections.length} elections total · {elections.filter((e) => e.status === "active").length} active
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-white hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              New Election
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Election</DialogTitle>
              <DialogDescription>
                Set up a new election for students to participate in.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="title">Election Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g. SUG Presidential Election 2025"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of the election"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} className="bg-primary text-white hover:bg-primary/90">
                Create Election
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Elections list */}
      <div className="grid gap-4">
        {elections.map((election) => {
          const turnout = calcPercentage(election.votedCount, election.totalVoters);
          return (
            <Card key={election.id} className="border-border/60">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-base font-bold leading-snug">
                    {election.title}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={`shrink-0 text-xs ${statusConfig[election.status]}`}
                  >
                    {election.status === "active" ? "Live" : election.status === "upcoming" ? "Upcoming" : "Closed"}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {election.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>{formatDate(election.startDate)} – {formatDate(election.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-brand" />
                      <span>{election.candidates.length} candidates · {election.totalVoters.toLocaleString()} eligible voters</span>
                    </div>
                  </div>

                  {election.status !== "upcoming" && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Voter Turnout</span>
                        <span className="text-xs font-bold text-foreground">{turnout}%</span>
                      </div>
                      <Progress value={turnout} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {election.votedCount.toLocaleString()} / {election.totalVoters.toLocaleString()} voted
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Link={`/results/${election.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-1.5 h-3.5 w-3.5" />
                      View Results
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => toast.info("Edit functionality coming soon")}>
                    <Pencil className="mr-1.5 h-3.5 w-3.5" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
