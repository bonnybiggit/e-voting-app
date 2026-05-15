import Link from "next/link";
import { Vote } from "lucide-react";
import { UNIVERSITY_NAME, UNIVERSITY_ABBR } from "@/lib/dummy-data";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card py-12">
      <div className="page-container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-primary mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white">
                <Vote className="h-3.5 w-3.5" />
              </div>
              <span>
                {UNIVERSITY_ABBR}
                <span className="text-brand font-extrabold">Vote</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Official e-voting platform of {UNIVERSITY_NAME}.
            </p>
          </div>

          <div>
            <h4 className="text-label text-muted-foreground mb-3">Students</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/login" className="hover:text-foreground transition-colors">Login to Vote</Link></li>
              <li><Link href="/results/el-001" className="hover:text-foreground transition-colors">View Results</Link></li>
              <li><Link href="#elections" className="hover:text-foreground transition-colors">Active Elections</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-label text-muted-foreground mb-3">Administration</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/admin" className="hover:text-foreground transition-colors">Admin Dashboard</Link></li>
              <li><Link href="/admin" className="hover:text-foreground transition-colors">Manage Elections</Link></li>
              <li><Link href="/admin" className="hover:text-foreground transition-colors">Monitor Turnout</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-label text-muted-foreground mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span>studentaffairs@futa.edu.ng</span></li>
              <li><span>+234 801 234 5678</span></li>
              <li><span>Mon – Fri, 9am – 5pm</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © 2025 {UNIVERSITY_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by UniVote — Secure E-Voting Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
