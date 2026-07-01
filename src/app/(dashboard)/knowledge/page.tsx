import { Metadata } from "next";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Knowledge Base - Botrixa",
};

export default function KnowledgePage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed shadow-sm bg-background/50">
      <EmptyState
        icon={BookOpen}
        title="Knowledge Base Empty"
        description="Upload documents, PDFs, or connect websites to give your AI agents custom knowledge."
        actionLabel="Upload Knowledge"
      />
    </div>
  );
}
