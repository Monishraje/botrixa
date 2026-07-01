import Link from "next/link";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Bot } from "lucide-react";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center space-x-2 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">{siteConfig.name}</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1"
            >
              Features
            </Link>
            <Link
              href="#templates"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1"
            >
              Templates
            </Link>
            <Link
              href="#docs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1"
            >
              Docs
            </Link>
            <Link
              href="#github"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1"
            >
              GitHub
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login" tabIndex={-1}>
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup" tabIndex={-1}>
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
