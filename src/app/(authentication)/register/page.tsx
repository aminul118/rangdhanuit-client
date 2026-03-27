import { Metadata } from 'next';
import RegisterClient from './RegisterClient';
import generateMetaTags from '@/Seo/generateMetaTags';

export const metadata: Metadata = generateMetaTags({
  title: "Register | Rangdhanu IT",
  description: "Create a new Rangdhanu IT account and start your digital transformation journey today.",
  keywords: "register, sign up, create account",
});

export default function RegisterPage() {
  return <RegisterClient />;
}
