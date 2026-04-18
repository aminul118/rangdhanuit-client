import { Metadata } from "next";
import generateMetaTags from "@/Seo/generateMetaTags";
import PrivacyPolicyContent from "@/components/modules/public/legal/PrivacyPolicyContent";

export const metadata: Metadata = generateMetaTags({
  title: "Privacy Policy | Rangdhanu IT",
  description:
    "Learn about how Rangdhanu IT collects, uses, and protects your personal data. We are committed to your privacy and data security.",
  keywords:
    "privacy policy, data protection, privacy, data security, Rangdhanu IT policies",
  websitePath: "privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
