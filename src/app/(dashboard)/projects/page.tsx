import { Metadata } from "next";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { FolderDot } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects - Botrixa",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed shadow-sm bg-background/50">
      <EmptyState
        icon={FolderDot}
        title="No projects found"
        description="You haven't created any projects yet. Get started by creating your first project."
        actionLabel="Create Project"
      />
    </div>
  );
}
