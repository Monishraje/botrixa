import { LoginForm } from "@/features/auth/components/login-form";
import { AuthCard } from "@/features/auth/components/auth-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Botrixa",
  description: "Sign in to your Botrixa account.",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Enter your credentials to access your account"
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Sign up"
    >
      <LoginForm />
    </AuthCard>
  );
}
