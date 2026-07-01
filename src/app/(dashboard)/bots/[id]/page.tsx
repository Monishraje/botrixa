import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BotService } from "@/features/bots/services/bot.service";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Settings, Database, Activity, Code, Download } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";

export async function generateMetadata() {
  return { title: "Bot Details | Botrixa" };
}

export default async function BotDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const resolvedParams = await params;
  const bot = await BotService.getBotById(session.user.id, resolvedParams.id);

  if (!bot) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Bot not found or you don&apos;t have access.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/bots" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-3xl font-bold tracking-tight">{bot.name}</h2>
              <Badge variant={bot.status === "ONLINE" ? "default" : "secondary"}>
                {bot.status.toLowerCase()}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
              <span>{bot.project.name}</span>
              <span>•</span>
              <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">{bot.slug}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <a
            href={`/api/bots/${bot.id}/download?modules=ping,ban,kick,timeout,purge,warn,welcome,logging&template=${bot.template.toLowerCase()}`}
            className={buttonVariants({ variant: "default" })}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Source
          </a>
          <Link href={`/bots/${bot.id}/edit`} className={buttonVariants({ variant: "outline" })}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Template</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{bot.template}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Language</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{bot.language}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prefix</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold font-mono">{bot.prefix}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Deployments</CardTitle>
            <CardDescription>Recent deployment history</CardDescription>
          </CardHeader>
          <CardContent>
            {bot.deployments.length === 0 ? (
              <EmptyState
                icon={Activity}
                title="No deployments yet"
                description="Deploy your bot to start interacting with it on Discord."
              />
            ) : (
              <div className="space-y-4">
                {bot.deployments.map((dep) => (
                  <div
                    key={dep.id}
                    className="flex justify-between items-center p-3 border rounded"
                  >
                    <div>
                      <p className="font-medium">{dep.provider}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(dep.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="outline">{dep.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>Manage secrets and configurations</CardDescription>
          </CardHeader>
          <CardContent>
            {bot.envVars.length === 0 ? (
              <EmptyState
                icon={Database}
                title="No variables defined"
                description="Add API keys and other secrets needed by your bot."
              />
            ) : (
              <div className="space-y-4">
                {bot.envVars.map((env) => (
                  <div
                    key={env.id}
                    className="flex justify-between items-center p-3 border rounded font-mono text-sm"
                  >
                    <span>{env.key}</span>
                    <span className="text-muted-foreground">••••••••</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Version History</CardTitle>
            <CardDescription>Generated bot versions</CardDescription>
          </CardHeader>
          <CardContent>
            {bot.versions.length === 0 ? (
              <EmptyState
                icon={Activity}
                title="No versions generated"
                description="Click Download Source to generate a bot."
              />
            ) : (
              <div className="space-y-4">
                {bot.versions.map((v) => (
                  <div key={v.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">
                        v{v.version} - {v.templateUsed}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(v.createdAt).toLocaleString()} • {v.modulesUsed.length} modules
                      </p>
                    </div>
                    <Badge variant="outline">{v.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
