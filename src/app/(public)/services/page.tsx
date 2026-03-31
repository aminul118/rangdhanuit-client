import { getServices } from "@/services/Service/services";
import { IService } from "@/types/Service/service.types";
import { Metadata } from "next";
import { ServicesHero } from "@/components/modules/public/services/ServicesHero";
import { ServicesList } from "@/components/modules/public/services/ServicesList";
import { ServicesCTA } from "@/components/modules/public/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Our Services | Rangdhanu IT",
  description:
    "Unlocking digital potential through specialized web development, app design, SEO, and cybersecurity solutions.",
};

const ServicesPage = async () => {
  const res = await getServices();
  const services = (res?.data as IService[]) || [];

  return (
    <div className="min-h-screen bg-zinc-950 pt-16 md:pt-32 pb-32">
      <ServicesHero />
      <ServicesList services={services} />
      <ServicesCTA />
    </div>
  );
};

export default ServicesPage;
