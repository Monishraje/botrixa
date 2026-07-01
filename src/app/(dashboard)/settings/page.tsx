import { Metadata } from "next";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings - Botrixa",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed shadow-sm bg-background/50">
      <EmptyState
        icon={Settings}
        title="Workspace Settings"
        description="Manage your workspace preferences, team members, and security settings."
        actionLabel="Manage Settings"
      />
    </div>
  );
}
