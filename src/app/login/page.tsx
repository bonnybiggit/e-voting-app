import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { Vote, ArrowLeft } from "lucide-react";
import { UNIVERSITY_NAME, UNIVERSITY_ABBR } from "@/lib/dummy-data";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-10 text-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
        </div>
        <div className="relative">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <Vote className="h-4.5 w-4.5" />
            </div>
            {UNIVERSITY_ABBR}Vote
          </Link>
        </div>

        <div className="relative">
          <blockquote className="text-2xl font-extrabold leading-snug tracking-tight mb-4">
            &quot;Your Vote is Your Voice. Make It Count.&quot;
          </blockquote>
          <p className="text-sm text-white/70 leading-relaxed max-w-sm">
            {UNIVERSITY_NAME} — Official Electronic Voting System. Secure,
            transparent, and accessible to all registered students.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/20 pt-8">
            {[
              { v: "8,450+", l: "Students" },
              { v: "3", l: "Elections" },
              { v: "100%", l: "Secure" },
            ].map(({ v, l }) => (
              <div key={l}>
                <div className="text-2xl font-extrabold">{v}</div>
                <div className="text-xs text-white/60 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-white/50">
          © 2025 {UNIVERSITY_NAME}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-col items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-primary">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <Vote className="h-4 w-4" />
              </div>
              {UNIVERSITY_ABBR}Vote
            </Link>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Student Login
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Enter your matric number and password to vote.
            </p>
          </div>

          <LoginForm />

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Problems logging in?{" "}
            <a href="mailto:ict@futa.edu.ng" className="text-primary hover:underline">
              Contact ICT Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
