import { Container, SectionContainer, SectionHeading, SectionGrid } from "@/components/layout";
import { landingFeatures } from "../data/features";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Features() {
  return (
    <SectionContainer id="features">
      <Container>
        <SectionHeading
          title="Everything you need to build faster"
          description="Botrixa provides a complete toolkit for developing, generating, and maintaining production-ready Discord bots."
        />
        <SectionGrid className="animate-fade-up delay-100 mt-12">
          {landingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="flex flex-col border-border/50 bg-background/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/20"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    <span>{feature.title}</span>
                    <Badge
                      variant={feature.status === "Available" ? "default" : "secondary"}
                      className="text-xs font-normal"
                    >
                      {feature.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </SectionGrid>
      </Container>
    </SectionContainer>
  );
}
