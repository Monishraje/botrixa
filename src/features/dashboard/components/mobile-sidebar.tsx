"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Menu, Bot } from "lucide-react";
import Link from "next/link";
import { DASHBOARD_ROUTES } from "../constants";
import { useState } from "react";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
            onClick={() => setOpen(false)}
          >
            <Bot className="h-6 w-6 text-primary" />
            <span className="text-lg tracking-tight">Botrixa</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="grid gap-1 px-2">
            {DASHBOARD_ROUTES.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <route.icon className="h-4 w-4" />
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
