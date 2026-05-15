import { OtpForm } from "@/components/auth/OtpForm";
import Link from "next/link";
import { Vote, ArrowLeft, Mail } from "lucide-react";
import { UNIVERSITY_ABBR } from "@/lib/dummy-data";

export default function VerifyOtpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-primary">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
              <Vote className="h-4.5 w-4.5" />
            </div>
            <span className="text-xl">
              {UNIVERSITY_ABBR}
              <span className="text-brand">Vote</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Mail className="h-7 w-7 text-primary" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground mb-2">
              Check Your Email
            </h1>
            <p className="text-sm text-muted-foreground">
              We sent a 6-digit verification code to{" "}
              <span className="font-semibold text-foreground">
                a*****@futa.edu.ng
              </span>
            </p>
          </div>

          <OtpForm />
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
