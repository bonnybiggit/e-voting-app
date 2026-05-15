"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { elections } from "@/lib/dummy-data";
import { Plus, GraduationCap, BarChart3 } from "lucide-react";
import { toast } from "sonner";

const allCandidates = elections.flatMap((e) =>
  e.candidates.map((c) => ({ ...c, electionTitle: e.title, electionId: e.id }))
);

export function CandidatesManager() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    department: "",
    level: "",
    position: "",
    electionId: "",
    manifesto: "",
  });

  const handleAdd = () => {
    if (!form.name || !form.department || !form.electionId) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success(`Candidate "${form.name}" added successfully!`);
    setDialogOpen(false);
    setForm({ name: "", department: "", level: "", position: "", electionId: "", manifesto: "" });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-foreground">Candidates</h2>
          <p className="text-sm text-muted-foreground">
            {allCandidates.length} total candidates across {elections.length} elections
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-white hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Candidate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Candidate</DialogTitle>
              <DialogDescription>
                Register a candidate for an election.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-2">
              <div className="flex flex-col gap-1.5">
                <Label>Election *</Label>
                <Select
                  value={form.electionId}
                  onValueChange={(v) => setForm((f) => ({ ...f, electionId: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select election" />
                  </SelectTrigger>
                  <SelectContent>
                    {elections.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.title.slice(0, 45)}...
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cname">Full Name *</Label>
                <Input
                  id="cname"
                  placeholder="e.g. Adebayo Oluwaseun"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="cdept">Department *</Label>
                  <Input
                    id="cdept"
                    placeholder="e.g. Computer Science"
                    value={form.department}
                    onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="clevel">Level</Label>
                  <Input
                    id="clevel"
                    placeholder="e.g. 400L"
                    value={form.level}
                    onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cposition">Position</Label>
                <Input
                  id="cposition"
                  placeholder="e.g. President"
                  value={form.position}
                  onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} className="bg-primary text-white hover:bg-primary/90">
                Add Candidate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Candidates grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allCandidates.map((candidate) => (
          <Card key={candidate.id} className="border-border/60 overflow-hidden">
            <div className="h-1 w-full" style={{ backgroundColor: candidate.color }} />
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={candidate.avatar} />
                  <AvatarFallback
                    className="text-xs font-bold text-white"
                    style={{ backgroundColor: candidate.color }}
                  >
                    {candidate.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">{candidate.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <GraduationCap className="h-3 w-3" />
                    {candidate.department} · {candidate.level}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{ color: candidate.color, borderColor: `${candidate.color}40` }}
                >
                  {candidate.position}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <BarChart3 className="h-3 w-3" />
                  <span>{candidate.votes.toLocaleString()} votes</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground truncate">
                Election: {candidate.electionTitle.slice(0, 35)}...
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
