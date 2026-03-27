import { Metadata } from 'next';
import LoginClient from './LoginClient';
import generateMetaTags from '@/Seo/generateMetaTags';

export const metadata: Metadata = generateMetaTags({
  title: "Login | Rangdhanu IT",
  description: "Access your Rangdhanu IT account to manage your projects and preferences.",
  keywords: "login, sign in, account access",
});

export default function LoginPage() {
  return <LoginClient />;
}
