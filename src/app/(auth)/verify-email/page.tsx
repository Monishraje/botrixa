import { AuthCard } from "@/features/auth/components/auth-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email - Botrixa",
  description: "Verify your Botrixa account.",
};

export default function VerifyEmailPage() {
  return (
    <AuthCard
      title="Check your email"
      description="We sent a verification link to your email address."
      footerText="Didn't receive the email?"
      footerLink="/login"
      footerLinkText="Back to login"
    >
      <div className="p-3 text-sm rounded-md bg-muted text-muted-foreground font-medium text-center">
        Verification process is currently a placeholder for future implementation.
      </div>
    </AuthCard>
  );
}
