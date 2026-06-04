import { Metadata } from "next";
import generateMetaTags from "@/Seo/generateMetaTags";
import TermsOfServiceContent from "./_components/TermsOfServiceContent";

export const metadata: Metadata = generateMetaTags({
  title: "Terms of Service | Rangdhanu IT",
  description:
    "Read the Terms of Service for using Rangdhanu IT's website and services. Understand your rights and responsibilities when working with us.",
  keywords:
    "terms of service, user agreement, legal terms, Rangdhanu IT terms, service guidelines",
  websitePath: "terms-of-service",
});

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />;
}
