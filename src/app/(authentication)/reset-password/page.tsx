import { Metadata } from 'next';
import ResetPasswordClient from './ResetPasswordClient';
import generateMetaTags from '@/Seo/generateMetaTags';

export const metadata: Metadata = generateMetaTags({
  title: "Reset Password | Rangdhanu IT",
  description: "Securely reset your Rangdhanu IT account password and regain access to your dashboard.",
  keywords: "reset password, secure reset, account recovery",
});

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
