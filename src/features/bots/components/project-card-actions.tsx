"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  deleteProjectAction,
  duplicateProjectAction,
} from "@/features/bots/actions/projects.actions";
import { MoreVertical, Edit, Trash, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

export function ProjectCardActions({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteProjectAction(projectId);
    if (res.success) {
      setIsDeleteDialogOpen(false);
      router.refresh();
    }
  };

  const handleDuplicate = async () => {
    const res = await duplicateProjectAction(projectId);
    if (res.success) {
      router.refresh();
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Open menu</span>
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push(`/projects/${projectId}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onSelect={() => setIsDeleteDialogOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        title="Delete Project"
        description="Are you sure? This will soft-delete the project and all its bots."
        confirmText="Delete"
        destructive
        onConfirm={handleDelete}
        trigger={<div className="hidden" />}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}
