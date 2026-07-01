import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProjectService } from "@/features/bots/services/project.service";
import { ProjectEditForm } from "@/features/bots/components/project-edit-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export async function generateMetadata() {
  return { title: "Edit Project | Botrixa" };
}

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const resolvedParams = await params;
  const project = await ProjectService.getProjectById(session.user.id, resolvedParams.id);

  if (!project) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Project not found or you don&apos;t have access.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href={`/projects/${resolvedParams.id}`}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Project Settings</h2>
          <p className="text-muted-foreground">Manage configuration for {project.name}</p>
        </div>
      </div>

      <ProjectEditForm project={project} />
    </div>
  );
}
