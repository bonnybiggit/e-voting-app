import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Zap, BarChart3 } from "lucide-react";
import { UNIVERSITY_NAME } from "@/lib/dummy-data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-brand/5 py-20 md:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-brand/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-success/5 blur-3xl" />
      </div>

      <div className="page-container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 flex justify-center">
            <Badge
              variant="secondary"
              className="gap-2 px-4 py-1.5 text-xs font-medium border border-primary/20 bg-primary/8 text-primary"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              2024/2025 Elections Now Live
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Secure &amp; Transparent{" "}
            <span className="bg-gradient-to-r from-primary via-brand to-success bg-clip-text text-transparent">
              University Voting
            </span>{" "}
            Platform
          </h1>

          {/* Subheading */}
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Empowering students of{" "}
            <span className="font-semibold text-foreground">
              {UNIVERSITY_NAME}
            </span>{" "}
            to participate in free, fair, and verifiable elections — right from
            any device, anywhere.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="w-full bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 sm:w-auto"
              >
                Vote Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/results/el-001">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-primary/30 sm:w-auto"
              >
                <BarChart3 className="mr-2 h-4 w-4 text-primary" />
                View Live Results
              </Button>
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-14 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            {[
              { icon: Shield, label: "End-to-End Encrypted" },
              { icon: Zap, label: "Real-Time Results" },
              { icon: BarChart3, label: "Transparent & Auditable" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Icon className="h-4 w-4 text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 divide-x divide-border rounded-2xl border border-border/60 bg-card shadow-sm">
          {[
            { value: "8,450+", label: "Registered Voters" },
            { value: "3", label: "Active Elections" },
            { value: "63%", label: "Current Turnout" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-5">
              <span className="text-2xl font-extrabold text-foreground sm:text-3xl">
                {value}
              </span>
              <span className="mt-1 text-xs text-muted-foreground text-label">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
