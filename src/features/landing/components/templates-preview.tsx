import { Container, SectionContainer, SectionHeading, SectionGrid } from "@/components/layout";
import { landingTemplates } from "../data/templates";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TemplatesPreview() {
  return (
    <SectionContainer id="templates">
      <Container>
        <SectionHeading
          title="Start from production templates"
          description="Don't start from scratch. Use our pre-built, community-audited templates to kickstart your next project."
        />
        <SectionGrid className="animate-fade-up delay-100">
          {landingTemplates.map((template, index) => (
            <Card
              key={index}
              className="flex flex-col border-border/50 bg-background/50 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{template.title}</span>
                  <Badge variant="secondary" className="text-xs font-normal">
                    {template.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{template.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </SectionGrid>
      </Container>
    </SectionContainer>
  );
}
