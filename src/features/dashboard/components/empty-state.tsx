import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  actionHref?: string;
}

export function EmptyState({ icon: Icon, title, description, actionLabel }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in-50 duration-500">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mb-4">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
      <Button>{actionLabel}</Button>
    </div>
  );
}
