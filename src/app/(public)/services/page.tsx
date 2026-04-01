import { getServices } from "@/services/Service/services";
import { IService } from "@/types/Service/service.types";
import { Metadata } from "next";
import { ServicesHero } from "@/components/modules/public/services/ServicesHero";
import { ServicesList } from "@/components/modules/public/services/ServicesList";
import { ServicesCTA } from "@/components/modules/public/services/ServicesCTA";

import generateMetaTags from "@/Seo/generateMetaTags";

export const metadata: Metadata = generateMetaTags({
  title: "Tailored IT Services & Solutions | Rangdhanu IT",
  description:
    "Expert services in custom web development, mobile applications, UI/UX design, SEO, and cybersecurity. Partner with Rangdhanu IT for digital excellence.",
  keywords: "IT services, web development, app design, SEO, cybersecurity, digital transformation",
  websitePath: "services",
});

const ServicesPage = async () => {
  const res = await getServices();
  const services = (res?.data as IService[]) || [];

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-32 pb-32 transition-colors duration-500">
      <ServicesHero />
      <ServicesList services={services} />
      <ServicesCTA />
    </div>
  );
};

export default ServicesPage;
