import { Metadata } from "next";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Automations - Botrixa",
};

export default function AutomationsPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed shadow-sm bg-background/50">
      <EmptyState
        icon={Zap}
        title="No automations configured"
        description="Connect Botrixa to your favorite apps and build powerful workflows."
        actionLabel="Create Automation"
      />
    </div>
  );
}
