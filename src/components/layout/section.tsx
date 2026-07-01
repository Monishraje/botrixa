import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function SectionContainer({
  children,
  className,
  id,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)} {...props}>
      {children}
    </section>
  );
}

interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  description,
  align = "center",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance leading-tight">
        {title}
      </h2>
      {description && (
        <p className="max-w-[42rem] text-muted-foreground sm:text-lg leading-relaxed text-balance">
          {description}
        </p>
      )}
    </div>
  );
}

export function SectionBadge({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Badge variant="secondary" className={cn("mb-4", className)}>
      {children}
    </Badge>
  );
}

export function SectionGrid({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}
