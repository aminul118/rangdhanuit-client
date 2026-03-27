import { Metadata } from 'next';
import VerifyOTPClient from './VerifyOTPClient';
import generateMetaTags from '@/Seo/generateMetaTags';

export const metadata: Metadata = generateMetaTags({
  title: "Verify OTP | Rangdhanu IT",
  description: "Verify your email address to complete your registration with Rangdhanu IT.",
  keywords: "verify otp, email verification, account security",
});

export default function VerifyOTPPage() {
  return <VerifyOTPClient />;
}
