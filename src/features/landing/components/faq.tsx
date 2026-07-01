import { Container, SectionContainer, SectionHeading } from "@/components/layout";
import { landingFaqs } from "../data/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <SectionContainer id="faq" className="bg-muted/10 border-y border-border/40">
      <Container className="max-w-4xl">
        <SectionHeading
          title="Frequently asked questions"
          description="Everything you need to know about the product and billing."
        />

        <Accordion className="w-full mt-8">
          {landingFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </SectionContainer>
  );
}
