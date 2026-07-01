import { Metadata } from "next";
import { StatCard } from "@/features/dashboard/components/stat-card";
import { UsageChart } from "@/features/dashboard/components/usage-chart";
import { ActivityFeed } from "@/features/dashboard/components/activity-feed";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { Bot, FolderDot, BookOpen, Activity } from "lucide-react";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/features/dashboard/components/loading-skeleton";

export const metadata: Metadata = {
  title: "Dashboard - Botrixa",
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="flex flex-col gap-4 lg:gap-6 animate-in fade-in duration-500">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total AI Agents"
            value="12"
            description="+2 from last month"
            icon={Bot}
          />
          <StatCard
            title="Active Projects"
            value="4"
            description="3 pending tasks"
            icon={FolderDot}
          />
          <StatCard
            title="Knowledge Sources"
            value="34"
            description="2.4 GB indexed"
            icon={BookOpen}
          />
          <StatCard
            title="API Calls"
            value="24.5k"
            description="+14% from last week"
            icon={Activity}
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
