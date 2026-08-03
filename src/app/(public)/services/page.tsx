import { getServices } from "@/services/Service/services";
import { IService } from "@/types/Service/service.types";
import { Metadata } from "next";
import { Suspense } from "react";
import { ServicesHero } from "@/app/(public)/services/_components/ServicesHero";
import { ServicesList } from "@/app/(public)/services/_components/ServicesList";
import ServiceCardSkeleton from "@/app/(public)/services/_components/ServiceCardSkeleton";
import generateMetaTags from "@/Seo/generateMetaTags";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = generateMetaTags({
  title: "Tailored IT Services & Solutions | Rangdhanu IT",
  description:
    "Expert services in custom web development, mobile applications, UI/UX design, SEO, and cybersecurity. Partner with Rangdhanu IT for digital excellence.",
  keywords:
    "IT services, web development, app design, SEO, cybersecurity, digital transformation",
  websitePath: "services",
});

export const dynamic = "force-dynamic";

const ServicesGrid = async () => {
  const res = await getServices();
  const services = (res?.data as IService[]) || [];
  return <ServicesList services={services} />;
};

const ServicesSkeletonGrid = () => {
  return (
    <Container>
      <div className="grid gap-6 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    </Container>
  );
};

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background pb-32 transition-colors duration-500">
      <ServicesHero />
      <Suspense fallback={<ServicesSkeletonGrid />}>
        <ServicesGrid />
      </Suspense>
    </div>
  );
};

export default ServicesPage;
