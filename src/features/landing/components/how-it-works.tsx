import { Container, SectionContainer, SectionHeading } from "@/components/layout";

export function HowItWorks() {
  const steps = [
    {
      title: "Create Project",
      description: "Initialize your new Discord bot project with our CLI or web dashboard.",
    },
    {
      title: "Describe Your Bot",
      description: "Tell our AI exactly what commands, events, and logic your bot requires.",
    },
    {
      title: "Generate Code",
      description: "Watch as we instantly generate production-ready TypeScript code.",
    },
    {
      title: "Download & Continue",
      description: "Download the source code and continue building with no vendor lock-in.",
    },
  ];

  return (
    <SectionContainer className="bg-muted/10 border-y border-border/40">
      <Container>
        <SectionHeading
          title="How it works"
          description="From concept to scalable codebase in minutes."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 relative animate-fade-up delay-100">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-border z-0" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center text-center p-6 rounded-xl border border-border/50 bg-background/50 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background text-lg font-bold">
                {index + 1}
              </div>
              <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </SectionContainer>
  );
}
