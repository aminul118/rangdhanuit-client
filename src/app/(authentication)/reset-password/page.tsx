import { Metadata } from 'next';
import { ResetPasswordForm } from '@/components/modules/Authentication/ResetPasswordForm';
import { redirect } from 'next/navigation';
import { EmailDisplay } from '@/components/modules/Authentication/EmailDisplay';
import generateMetaTags from '@/Seo/generateMetaTags';
import { ShieldCheck } from 'lucide-react';
import { Suspense } from 'react';
import { AuthLayoutWrapper } from "@/components/common/wrapper/AuthLayoutWrapper";
import { TSearchParamsPromise } from "@/types";

export const metadata: Metadata = generateMetaTags({
  title: "Reset Password | Rangdhanu IT",
  description: "Set a new password for your Rangdhanu IT account.",
  keywords: "reset password, new password, account security",
});

export default async function ResetPasswordPage({ 
  searchParams 
}: { 
  searchParams: TSearchParamsPromise 
}) {
  const resolvedSearchParams = await searchParams;
  const email = typeof resolvedSearchParams.email === 'string' ? resolvedSearchParams.email : '';

  if (!email) {
    redirect('/forgot-password');
  }

  return (
    <AuthLayoutWrapper
      title="Reset Password"
      description={<>Enter the code sent to <EmailDisplay /> and choose a strong new password.</> as any}
      footerText="Remembered your password?"
      footerLink="/login"
      footerLinkLabel="Back to Secure Login"
      quoteTitle="Secure your"
      quoteHighlight="New Credentials"
      quoteText="You're almost back in! Choose a strong, unique password to protect your account and resume your work."
      quoteFooter="Encrypted Connection"
      headerIcon={<ShieldCheck className="h-8 w-8 text-indigo-400" />}
      headerClassName="text-center pb-2"
    >
      <Suspense fallback={<div className="flex justify-center p-4"><span className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></span></div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayoutWrapper>
  );
}
