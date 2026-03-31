import { Metadata } from "next";
import generateMetaTags from "@/Seo/generateMetaTags";
import TermsOfServiceContent from "@/components/modules/public/legal/TermsOfServiceContent";

export const metadata: Metadata = generateMetaTags({
  title: "Terms of Service | Rangdhanu IT",
  description: "Read the Terms of Service for using Rangdhanu IT's website and services. Understand your rights and responsibilities when working with us.",
  keywords: "terms of service, user agreement, legal terms, Rangdhanu IT terms, service guidelines",
});

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />;
}
