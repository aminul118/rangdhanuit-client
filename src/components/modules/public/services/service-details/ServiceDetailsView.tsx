"use client";

import { IService } from "@/types/Service/service.types";
import { ServiceDetailsHero } from "./ServiceDetailsHero";
import { ServiceDetailsMainContent } from "./ServiceDetailsMainContent";
import { ServiceDetailsSidebar } from "./ServiceDetailsSidebar";
import { generateJsonLd } from "@/Seo/generateJsonLd";
import metaConfig from "@/config/meta.config";

interface ServiceDetailsViewProps {
  service: IService;
}

export const ServiceDetailsView = ({ service }: ServiceDetailsViewProps) => {
  const serviceJsonLd = generateJsonLd("Service", {
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: metaConfig.siteName,
      url: metaConfig.baseUrl,
    },
    image: service.image,
    url: `${metaConfig.baseUrl}/services/${service.slug}`,
  });

  const breadcrumbJsonLd = generateJsonLd("BreadcrumbList", {
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: metaConfig.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${metaConfig.baseUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${metaConfig.baseUrl}/services/${service.slug}`,
      },
    ],
  });

  return (
    <main className="min-h-screen pb-32 bg-background transition-colors duration-500 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serviceJsonLd}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbJsonLd}
      />

      {/* Hero Section Component */}
      <ServiceDetailsHero service={service} />

      {/* Grid Layout Section */}
      <section className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Main Content Area (Left/Wide) */}
          <ServiceDetailsMainContent content={service.content} />

          {/* Sidebar Area (Right/Action) */}
          <ServiceDetailsSidebar service={service} />
        </div>
      </section>
    </main>
  );
};
