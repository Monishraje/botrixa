import { AuthCard } from "@/features/auth/components/auth-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error - Botrixa",
  description: "An authentication error occurred.",
};

export default function ErrorPage() {
  return (
    <AuthCard
      title="Authentication Error"
      description="Oops! Something went wrong during authentication."
      footerText="Back to"
      footerLink="/login"
      footerLinkText="Sign in"
    >
      <div className="p-3 text-sm rounded-md bg-destructive/15 text-destructive font-medium text-center">
        Please try again or contact support if the issue persists.
      </div>
    </AuthCard>
  );
}
