import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { AuthCard } from "@/features/auth/components/auth-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - Botrixa",
  description: "Reset your Botrixa password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset Password"
      description="Enter your email to receive a password reset link"
      footerText="Remembered your password?"
      footerLink="/login"
      footerLinkText="Sign in"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
