import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bot } from "lucide-react";
import Link from "next/link";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
}

export function AuthCard({
  title,
  description,
  children,
  footerText,
  footerLink,
  footerLinkText,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-8">
        <Link
          href="/"
          className="flex items-center space-x-2 outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          <Bot className="h-8 w-8 text-primary" />
          <span className="font-bold text-2xl">Botrixa</span>
        </Link>
      </div>
      <Card className="border-border/40 shadow-xl bg-card/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            {footerText}{" "}
            <Link
              href={footerLink}
              className="text-primary hover:underline font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {footerLinkText}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
