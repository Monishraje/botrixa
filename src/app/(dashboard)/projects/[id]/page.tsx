import { ProjectService } from "@/features/bots/services/project.service";
import { buttonVariants } from "@/components/ui/button";
import { BotService } from "@/features/bots/services/bot.service";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowLeft, Settings } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata() {
  return { title: "Project Details | Botrixa" };
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
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

  // Fetch initial bots for this project
  const botsResponse = await BotService.getBots(session.user.id, {
    projectId: project.id,
    limit: 10,
  });
  const bots = botsResponse.items;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/projects" className={buttonVariants({ variant: "ghost", size: "icon" })}>
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
            <Badge variant={project.status === "ACTIVE" ? "default" : "secondary"}>
              {project.status.toLowerCase()}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {project.description || "No description provided."}
          </p>
        </div>
        <Link
          href={`/projects/${project.id}/edit`}
          className={buttonVariants({ variant: "default" })}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Bots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{botsResponse.total}</div>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-4">Bots in Project</h3>

      {bots.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-dashed bg-card/50">
          <p className="text-muted-foreground mb-4">No bots found in this project.</p>
          <Link
            href={`/bots/new?projectId=${project.id}`}
            className={buttonVariants({ variant: "outline" })}
          >
            Create Bot
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bots.map((bot) => (
            <Card key={bot.id} className="transition-all hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="line-clamp-1 text-lg">{bot.name}</CardTitle>
                  <Badge variant="outline">{bot.status.toLowerCase()}</Badge>
                </div>
                <CardDescription className="line-clamp-2">{bot.template}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 border-t">
                <Link
                  href={`/bots/${bot.id}`}
                  className={buttonVariants({ variant: "ghost", className: "w-full" })}
                >
                  Manage Bot
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
