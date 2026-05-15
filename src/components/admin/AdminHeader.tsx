"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import type { AdminTab } from "@/app/admin/page";

const tabLabels: Record<AdminTab, string> = {
  overview: "Dashboard Overview",
  elections: "Manage Elections",
  candidates: "Manage Candidates",
  students: "Manage Students",
};

interface AdminHeaderProps {
  activeTab: AdminTab;
}

export function AdminHeader({ activeTab }: AdminHeaderProps) {
  return (
    <header className="flex h-14 items-center gap-3 border-b border-border/60 px-4 bg-background sticky top-0 z-30">
      <SidebarTrigger className="h-8 w-8 text-muted-foreground" />
      <Separator orientation="vertical" className="h-5" />
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-sm font-semibold text-foreground">
          {tabLabels[activeTab]}
        </h1>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="text-xs bg-success/10 text-success border-success/30 hidden sm:inline-flex"
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-success" />
            2 Elections Live
          </Badge>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
