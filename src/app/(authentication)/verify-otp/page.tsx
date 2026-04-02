/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { VerifyOtpForm } from "@/components/modules/Authentication/VerifyOtpForm";
import { redirect } from "next/navigation";
import { EmailDisplay } from "@/components/modules/Authentication/EmailDisplay";
import generateMetaTags from "@/Seo/generateMetaTags";
import { ShieldCheck } from "lucide-react";
import { Suspense } from "react";
import { AuthLayoutWrapper } from "@/components/common/layouts/AuthLayoutWrapper";
import { TSearchParamsPromise } from "@/types";

export const metadata: Metadata = generateMetaTags({
  title: "Verify OTP | Rangdhanu IT",
  description:
    "Verify your email address to complete your registration with Rangdhanu IT.",
  keywords: "verify otp, email verification, account security",
});

const VerifyOTPPage = async ({
  searchParams,
}: {
  searchParams: TSearchParamsPromise;
}) => {
  const resolvedSearchParams = await searchParams;
  const email =
    typeof resolvedSearchParams.email === "string"
      ? resolvedSearchParams.email
      : "";

  if (!email) {
    redirect("/register");
  }

  return (
    <AuthLayoutWrapper
      title="Verify Email"
      description={
        (
          <>
            We&apos;ve sent a security code to <EmailDisplay />. Enter it to
            verify your identity.
          </>
        ) as any
      }
      footerText="Remembered your password?"
      footerLink="/login"
      footerLinkLabel="Back to Secure Login"
      quoteTitle="Verify your"
      quoteHighlight="Digital Identity"
      quoteText="Security is our priority. Enter the dynamic OTP sent to your email to verify and lock your new account."
      quoteFooter="Multi-Factor Shield Active"
      headerIcon={<ShieldCheck className="h-8 w-8 text-indigo-400" />}
      headerClassName="text-center pb-2"
    >
      <div className="flex flex-col items-center space-y-8 pt-8 px-8">
        <Suspense
          fallback={
            <div className="flex justify-center p-4">
              <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></span>
            </div>
          }
        >
          <VerifyOtpForm />
        </Suspense>
      </div>
    </AuthLayoutWrapper>
  );
};

export default VerifyOTPPage;
