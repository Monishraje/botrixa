import { Metadata } from "next";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { KeyRound } from "lucide-react";

export const metadata: Metadata = {
  title: "API Keys - Botrixa",
};

export default function ApiKeysPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed shadow-sm bg-background/50">
      <EmptyState
        icon={KeyRound}
        title="No API Keys found"
        description="Generate API keys to integrate Botrixa agents into your own applications."
        actionLabel="Generate API Key"
      />
    </div>
  );
}
