import { Metadata } from "next";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Agents - Botrixa",
};

export default function AgentsPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed shadow-sm bg-background/50">
      <EmptyState
        icon={Bot}
        title="No agents found"
        description="You haven't configured any AI agents yet. Deploy your first agent to automate tasks."
        actionLabel="Create Agent"
      />
    </div>
  );
}
