import Link from "next/link";
import { Container, SectionContainer } from "@/components/layout";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <SectionContainer className="py-24 md:py-32">
      <Container className="flex flex-col items-center text-center gap-8 animate-fade-up">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-3xl text-balance leading-tight">
          Join the developer preview
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed text-balance">
          We&apos;re currently letting in a limited number of developers to try our early beta. Help
          us shape the future of bot development by joining early.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
          <Link href="/signup">
            <Button
              size="lg"
              className="w-full sm:w-auto transition-transform hover:-translate-y-0.5"
            >
              Request Early Access
            </Button>
          </Link>
          <Link href="#discord">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto transition-transform hover:-translate-y-0.5"
            >
              Join Discord
            </Button>
          </Link>
        </div>
      </Container>
    </SectionContainer>
  );
}
