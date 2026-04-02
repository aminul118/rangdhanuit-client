import { Metadata } from 'next';
import generateMetaTags from '@/Seo/generateMetaTags';
import { ContactContent } from '@/components/modules/public/contact/ContactContent';

export const metadata: Metadata = generateMetaTags({
  title: "Contact Us | Rangdhanu IT",
  description: "Get in touch with Rangdhanu IT for your next big project. We offer free consultations and expert IT advice.",
  keywords: "contact us, support, inquiry, IT consultation",
});

export default function ContactPage() {
  return <ContactContent />;
}
