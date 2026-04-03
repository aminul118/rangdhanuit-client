"use client";

import { IPortfolio } from "@/types/Portfolio/portfolio.types";
import { PortfolioDetailsHero } from "./PortfolioDetailsHero";
import { PortfolioDetailsMainContent } from "./PortfolioDetailsMainContent";
import { PortfolioDetailsSidebar } from "./PortfolioDetailsSidebar";
import { generateJsonLd } from "@/Seo/generateJsonLd";
import metaConfig from "@/config/meta.config";

interface PortfolioDetailsViewProps {
  project: IPortfolio;
}

export const PortfolioDetailsView = ({ project }: PortfolioDetailsViewProps) => {
  const projectJsonLd = generateJsonLd("CreativeWork", {
    name: project.title,
    description: project.description.replace(/<[^>]*>/g, "").slice(0, 160),
    image: project.image,
    url: `${metaConfig.baseUrl}/portfolio/${project.slug}`,
    datePublished: project.createdAt,
    keywords: project.technologies.join(", "),
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
        name: "Portfolio",
        item: `${metaConfig.baseUrl}/portfolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${metaConfig.baseUrl}/portfolio/${project.slug}`,
      },
    ],
  });

  return (
    <main className="min-h-screen pb-32 bg-background transition-colors duration-500 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={projectJsonLd}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbJsonLd}
      />

      {/* Hero Section Component */}
      <PortfolioDetailsHero project={project} />

      {/* Grid Layout Section */}
      <section className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Main Context Area (Left/Wide) */}
          <PortfolioDetailsMainContent description={project.description} />

          {/* Sidebar Area (Right/Narrative) */}
          <PortfolioDetailsSidebar project={project} />
        </div>
      </section>
    </main>
  );
};
