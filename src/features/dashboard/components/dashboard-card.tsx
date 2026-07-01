import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

export function DashboardCard({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        "rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:border-border",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}
