import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/modules/Authentication/ForgotPasswordForm";
import generateMetaTags from "@/Seo/generateMetaTags";
import { KeyRound } from "lucide-react";
import { AuthLayoutWrapper } from "@/components/common/wrapper/AuthLayoutWrapper";

export const metadata: Metadata = generateMetaTags({
  title: "Forgot Password | Rangdhanu IT",
  description:
    "Recover access to your Rangdhanu IT account by resetting your password.",
  keywords: "forgot password, password recovery, account access",
});

export default function ForgotPasswordPage() {
  return (
    <AuthLayoutWrapper
      title="Forgot Password?"
      description="No worries, it happens. Enter your email and we'll get you back in."
      footerText="Remembered your password?"
      footerLink="/login"
      footerLinkLabel="Back to Secure Login"
      quoteTitle="Recover your"
      quoteHighlight="Account Access"
      quoteText="Regain access to your dashboard in seconds. Securely reset your password and continue your journey without interruption."
      quoteFooter="Secure Protocol Enabled"
      headerIcon={<KeyRound className="h-8 w-8 text-indigo-400" />}
      headerClassName="text-center pb-2"
    >
      <ForgotPasswordForm />
    </AuthLayoutWrapper>
  );
}
