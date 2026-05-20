"use client";

import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Menu, Vote, X } from "lucide-react";
import { UNIVERSITY_ABBR } from "@/lib/dummy-data";

const navLinks = [
  { href: "#elections", label: "Elections" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="page-container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link="/" className="flex items-center gap-2 font-bold text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <Vote className="h-4 w-4" />
          </div>
          <span className="text-lg tracking-tight">
            {UNIVERSITY_ABBR}
            <span className="text-brand font-extrabold">Vote</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link="/login" className="hidden sm:block">
            <Button variant="outline" size="sm">
              Student Login
            </Button>
          </Link>
          <Link="/admin" className="hidden sm:block">
            <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
              Admin
            </Button>
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 pt-6">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">Navigation</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <Link={link.href}
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium py-2 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-2 border-t pt-4">
                  <Link="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Student Login
                    </Button>
                  </Link>
                  <Link="/admin" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-primary text-white hover:bg-primary/90">
                      Admin Portal
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
