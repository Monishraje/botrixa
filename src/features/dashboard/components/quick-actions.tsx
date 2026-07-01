import { DashboardCard } from "./dashboard-card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, UploadCloud, FileJson, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    title: "Create Agent",
    icon: PlusCircle,
    href: "/agents",
    variant: "default" as const,
  },
  {
    title: "Upload Knowledge",
    icon: UploadCloud,
    href: "/knowledge",
    variant: "outline" as const,
  },
  {
    title: "Create Workflow",
    icon: FileJson,
    href: "/automations",
    variant: "outline" as const,
  },
  {
    title: "Generate API Key",
    icon: LinkIcon,
    href: "/api-keys",
    variant: "outline" as const,
  },
];

export function QuickActions() {
  return (
    <DashboardCard className="col-span-full">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common shortcuts to accelerate your workflow</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className={`inline-flex items-center justify-start rounded-md text-sm font-medium transition-colors h-12 px-4 w-full ${action.variant === "default" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"}`}
            >
              <action.icon className="mr-2 h-4 w-4" />
              {action.title}
            </Link>
          ))}
        </div>
      </CardContent>
    </DashboardCard>
  );
}
