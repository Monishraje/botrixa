import { Metadata } from "next";
import { StatCard } from "@/features/dashboard/components/stat-card";
import { UsageChart } from "@/features/dashboard/components/usage-chart";
import { ActivityFeed } from "@/features/dashboard/components/activity-feed";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { Bot, FolderDot, Activity, Server } from "lucide-react";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/features/dashboard/components/loading-skeleton";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard - Botrixa",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  // Use Promise.all to fetch aggregates concurrently
  const [totalProjects, totalBots, runningBots, totalDeployments] = await Promise.all([
    prisma.project.count({ where: { userId, deletedAt: null } }),
    prisma.bot.count({ where: { project: { userId }, deletedAt: null } }),
    prisma.bot.count({ where: { project: { userId }, deletedAt: null, status: "ONLINE" } }),
    prisma.botDeployment.count({ where: { bot: { project: { userId } } } }),
  ]);

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="flex flex-col gap-4 lg:gap-6 animate-in fade-in duration-500">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Projects"
            value={totalProjects.toString()}
            description="Active workspaces"
            icon={FolderDot}
          />
          <StatCard
            title="Total AI Bots"
            value={totalBots.toString()}
            description="Bots across projects"
            icon={Bot}
          />
          <StatCard
            title="Running Bots"
            value={runningBots.toString()}
            description="Currently online"
            icon={Activity}
          />
          <StatCard
            title="Deployments"
            value={totalDeployments.toString()}
            description="Total deploy runs"
            icon={Server}
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-7">
          <UsageChart />
          <ActivityFeed />
        </div>
        <QuickActions />
      </div>
    </Suspense>
  );
}
