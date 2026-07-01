import { DashboardCard } from "./dashboard-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, FileText, KeyRound, Globe } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Created AI Agent",
    description: "Support Assistant v1 deployed.",
    time: "2 hours ago",
    icon: Bot,
    color: "text-blue-500",
  },
  {
    id: 2,
    title: "Uploaded PDF",
    description: "company-policies.pdf added to Knowledge Base.",
    time: "5 hours ago",
    icon: FileText,
    color: "text-orange-500",
  },
  {
    id: 3,
    title: "Generated API Key",
    description: "Production key for website integration.",
    time: "1 day ago",
    icon: KeyRound,
    color: "text-purple-500",
  },
  {
    id: 4,
    title: "Connected Website",
    description: "www.example.com crawled and indexed.",
    time: "2 days ago",
    icon: Globe,
    color: "text-green-500",
  },
];

export function ActivityFeed() {
  return (
    <DashboardCard className="col-span-full lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Actions taken across your workspace</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className={`mt-0.5 rounded-full p-2 bg-muted/50 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
              <div className="text-xs text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </DashboardCard>
  );
}
