import { RegisterForm } from "@/features/auth/components/register-form";
import { AuthCard } from "@/features/auth/components/auth-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Botrixa",
  description: "Create a new Botrixa account.",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create an account"
      description="Enter your details to get started"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Sign in"
    >
      <RegisterForm />
    </AuthCard>
  );
}
