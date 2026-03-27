import { Metadata } from 'next';
import ForgotPasswordClient from './ForgotPasswordClient';
import generateMetaTags from '@/Seo/generateMetaTags';

export const metadata: Metadata = generateMetaTags({
  title: "Forgot Password | Rangdhanu IT",
  description: "Forgot your password? No worries. Enter your email and we'll help you reset it securely.",
  keywords: "forgot password, password recovery, reset password",
});

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
