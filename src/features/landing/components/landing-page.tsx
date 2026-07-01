import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { SocialProof } from "./social-proof";
import { Features } from "./features";
import { HowItWorks } from "./how-it-works";
import { TemplatesPreview } from "./templates-preview";
import { Faq } from "./faq";
import { FinalCta } from "./cta";
import { Footer } from "./footer";

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <TemplatesPreview />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
