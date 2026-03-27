import { Metadata } from 'next';
import ContactClient from './ContactClient';
import generateMetaTags from '@/Seo/generateMetaTags';

export const metadata: Metadata = generateMetaTags({
  title: "Contact Us | Rangdhanu IT",
  description: "Get in touch with Rangdhanu IT for your next big project. We offer free consultations and expert IT advice.",
  keywords: "contact us, support, inquiry, IT consultation",
});

export default function ContactPage() {
  return <ContactClient />;
}
