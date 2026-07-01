import Link from "next/link";
import { DASHBOARD_ROUTES } from "../constants";
import { Bot } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
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
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <route.icon className="h-4 w-4" />
              {route.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
