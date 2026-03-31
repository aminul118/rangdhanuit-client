import { LoginForm } from "@/components/modules/Authentication/LoginForm";
import generateMetaTags from "@/Seo/generateMetaTags";
import { AuthLayoutWrapper } from "@/components/common/wrapper/AuthLayoutWrapper";
import { Metadata } from "next";

export const metadata: Metadata = generateMetaTags({
  title: "Login | Rangdhanu IT",
  description: "Access your Rangdhanu IT account to manage your projects and preferences.",
  keywords: "login, sign in, account access",
});

export default function LoginPage() {
  return (
    <AuthLayoutWrapper
      title="Sign In"
      description="Enter your credentials to continue"
      footerText="New to our platform?"
      footerLink="/register"
      footerLinkLabel="Create your account"
      quoteTitle="Empowering your"
      quoteHighlight="Digital Journey"
      quoteText="Experience the next generation of IT solutions. We craft seamless digital experiences that drive growth and innovation."
      quoteFooter="Trusted by 500+ Businesses"
    >
      <LoginForm />
    </AuthLayoutWrapper>
  );
}
