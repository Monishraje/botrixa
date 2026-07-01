import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionContainer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <SectionContainer className="pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <Container className="flex flex-col items-center text-center gap-8">
        <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
          Open Source Friendly
        </Badge>

        <div className="max-w-4xl flex flex-col gap-6 items-center animate-fade-up">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance leading-tight">
            Build Discord bots faster with AI.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed text-balance">
            Generate, customize, and deploy scalable Discord applications instantly. Stop writing
            boilerplate and focus on building features.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto animate-fade-up delay-100">
          <Link href="/signup">
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 transition-transform hover:-translate-y-0.5"
            >
              Start Building <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#docs">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto gap-2 transition-transform hover:-translate-y-0.5"
            >
              <Terminal className="h-4 w-4" /> View Documentation
            </Button>
          </Link>
        </div>

        {/* Dashboard Preview Placeholder */}
        <div className="mt-16 w-full max-w-5xl rounded-xl border bg-background shadow-2xl relative overflow-hidden ring-1 ring-border/50 animate-fade-up delay-200">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
          <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-4 h-5 w-48 rounded-md bg-muted" />
          </div>
          <div className="aspect-[16/9] w-full bg-card p-6 flex flex-col gap-4">
            <div className="h-6 w-1/3 rounded-md bg-muted" />
            <div className="h-4 w-2/3 rounded-md bg-muted/50" />
            <div className="h-4 w-1/2 rounded-md bg-muted/50" />
            <div className="h-4 w-3/4 rounded-md bg-muted/50" />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 h-full pb-4">
              <div className="h-full rounded-lg bg-muted/30 border border-border/50" />
              <div className="h-full rounded-lg bg-muted/30 border border-border/50" />
              <div className="h-full rounded-lg bg-muted/30 border border-border/50" />
            </div>
          </div>
        </div>
      </Container>
    </SectionContainer>
  );
}
