"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { ElectionsManager } from "@/components/admin/ElectionsManager";
import { CandidatesManager } from "@/components/admin/CandidatesManager";
import { StudentsManager } from "@/components/admin/StudentsManager";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export type AdminTab = "overview" | "elections" | "candidates" | "students";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  return (
    <SidebarProvider>
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <SidebarInset className="min-h-screen bg-background">
        <AdminHeader activeTab={activeTab} />
        <main className="p-6 max-w-7xl mx-auto w-full">
          {activeTab === "overview" && <AdminOverview />}
          {activeTab === "elections" && <ElectionsManager />}
          {activeTab === "candidates" && <CandidatesManager />}
          {activeTab === "students" && <StudentsManager />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
