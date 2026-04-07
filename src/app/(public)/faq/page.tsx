import { Metadata } from "next";
import { Suspense } from "react";
import FAQHero from "@/components/modules/public/faq/FAQHero";
import FAQContent from "@/components/modules/public/faq/FAQContent";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Rangdhanu IT",
  description:
    "Find answers to common questions about our IT services, technology stack, project management, and post-launch support.",
  keywords: [
    "FAQ",
    "IT Support",
    "Web Development",
    "App Development",
    "Rangdhanu IT Solutions",
  ],
};

interface FAQPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FAQPage({ searchParams }: FAQPageProps) {
  const params = await searchParams;
  const search = (params.search as string) || "";
  const category = (params.category as string) || "All";

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Shared Background Decoration matched with Blog page */}
      <div className="absolute inset-x-0 top-0 -z-10 h-full w-full bg-linear-to-b from-primary/5 via-background to-background" />

      <FAQHero />

      <Suspense
        fallback={
          <Container className="py-20 text-center text-muted-foreground animate-pulse font-medium italic">
            Updating Knowledge Base...
          </Container>
        }
      >
        <FAQContent search={search} category={category} />
      </Suspense>
    </main>
  );
}
