"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden flex items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 top-14 z-50 bg-background/95 backdrop-blur-sm animate-fade-in supports-[backdrop-filter]:bg-background/80 flex flex-col items-center justify-center p-6 gap-8">
          <nav className="flex flex-col items-center gap-6 text-lg">
            <Link
              href="#features"
              onClick={() => setIsOpen(false)}
              className="font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#templates"
              onClick={() => setIsOpen(false)}
              className="font-medium hover:text-primary transition-colors"
            >
              Templates
            </Link>
            <Link
              href="#docs"
              onClick={() => setIsOpen(false)}
              className="font-medium hover:text-primary transition-colors"
            >
              Docs
            </Link>
            <Link
              href="#github"
              onClick={() => setIsOpen(false)}
              className="font-medium hover:text-primary transition-colors"
            >
              GitHub
            </Link>
          </nav>
          <div className="flex flex-col items-center gap-4 w-full max-w-xs mt-4">
            <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setIsOpen(false)} className="w-full">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
