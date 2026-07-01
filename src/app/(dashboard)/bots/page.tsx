import { BotsListClient } from "@/features/bots/components/bots-list-client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Bots | Botrixa",
};

export default function BotsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bots</h2>
          <p className="text-muted-foreground">Manage and monitor all your AI Discord bots.</p>
        </div>
        <Button asChild>
          <Link href="/bots/new">
            <Plus className="mr-2 h-4 w-4" />
            New Bot
          </Link>
        </Button>
      </div>

      <BotsListClient />
    </div>
  );
}
