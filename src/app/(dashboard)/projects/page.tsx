import { getProjectsAction } from "@/features/bots/actions/projects.actions";
import { buttonVariants } from "@/components/ui/button";
import { Plus, Folder, ArrowRight } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/shared/empty-state";
import { ProjectCardActions } from "@/features/bots/components/project-card-actions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Projects | Botrixa",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  const search = typeof params.search === "string" ? params.search : undefined;

  const response = await getProjectsAction({ page, limit: 12, search });
  const projects = response.success ? response.data.items : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">Manage your bot projects and workspaces.</p>
        </div>
        <Link href="/projects/new" className={buttonVariants({ variant: "default" })}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={Folder}
          title="No projects found"
          description={
            search
              ? "No projects matched your search criteria."
              : "Create your first project to start building bots."
          }
          action={
            <Link href="/projects/new" className={buttonVariants({ variant: "outline" })}>
              Create Project
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map(
            (project: {
              id: string;
              name: string;
              status: string;
              description: string | null;
              _count?: { bots: number };
            }) => (
              <Card
                key={project.id}
                className="flex flex-col transition-all hover:border-primary/50 hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <CardTitle className="line-clamp-1">{project.name}</CardTitle>
                      <Badge variant={project.status === "ACTIVE" ? "default" : "secondary"}>
                        {project.status.toLowerCase()}
                      </Badge>
                    </div>
                    <ProjectCardActions projectId={project.id} />
                  </div>
                  <CardDescription className="line-clamp-2 h-10">
                    {project.description || "No description provided."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{project._count?.bots || 0}</span>{" "}
                    bots
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                  <Link
                    href={`/projects/${project.id}`}
                    className={buttonVariants({ variant: "ghost", className: "w-full" })}
                  >
                    View Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}
