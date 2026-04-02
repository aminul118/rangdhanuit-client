import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";
import generateMetaTags from "@/Seo/generateMetaTags";
import { AuthLayoutWrapper } from "@/components/common/layouts/AuthLayoutWrapper";
import { Metadata } from "next";

export const metadata: Metadata = generateMetaTags({
  title: "Register | Rangdhanu IT",
  description:
    "Create a new Rangdhanu IT account and start your digital transformation journey today.",
  keywords: "register, sign up, create account",
});

const RegisterPage = () => {
  return (
    <AuthLayoutWrapper
      title="Register"
      description="Fill in your details to create an account"
      footerText="Already a member?"
      footerLink="/login"
      footerLinkLabel="Sign in to your account"
      quoteTitle="Join our"
      quoteHighlight="Innovation Hub"
      quoteText="Connect with the best minds in IT. Start your journey today and build something extraordinary with Rangdhanu IT."
      quoteFooter="Secure & Reliable Service"
      cardWidth="sm:w-[480px]"
    >
      <RegisterForm />
    </AuthLayoutWrapper>
  );
};
export default RegisterPage;
