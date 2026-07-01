import { Container, SectionContainer } from "@/components/layout";

export function SocialProof() {
  return (
    <SectionContainer className="py-12 md:py-16 bg-muted/30 border-y border-border/40 animate-fade-up delay-300">
      <Container className="flex flex-col items-center justify-center text-center gap-6">
        <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Launching Soon in Beta
        </p>
        <p className="max-w-2xl text-muted-foreground">
          We are currently building the next generation of developer tooling. Join the waitlist to
          get early access before our public release.
        </p>
      </Container>
    </SectionContainer>
  );
}
