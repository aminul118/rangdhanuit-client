import type { Metadata } from "next";
import generateMetaTags from "@/Seo/generateMetaTags";
import Hero from "@/app/(public)/_components/Hero";
import { Suspense } from "react";

export const metadata: Metadata = generateMetaTags({
  title: "Rangdhanu IT | Best IT Solutions for Your Business",
  description:
    "Transform your business with Rangdhanu IT's cutting-edge web development, mobile apps, and digital marketing services. Innovating the future, one pixel at a time.",
  keywords:
    "IT solutions, web development, app development, digital marketing, graphics design, SEO services",
});

export const revalidate = 60;

/* ---- Data-fetching section wrappers ---- */
import { getPartners } from "@/services/Partner/partner";

const PartnersSection = async () => {
  const res = await getPartners();
  return <PartnersDyn partners={res?.data || []} />;
};

import { getServices } from "@/services/Service/services";

const ServicesSection = async () => {
  const res = await getServices({ limit: "6" });
  return <ServicesDyn services={res?.data || []} />;
};

import { getPortfolios } from "@/services/Portfolio/portfolios";

const PortfolioSection = async () => {
  const res = await getPortfolios({ isFeatured: "true" });
  return <PortfolioSliderDyn portfolios={res?.data || []} />;
};

import { getBlogs } from "@/services/Blog/blogs";

const BlogsSection = async () => {
  const res = await getBlogs({ limit: "3", sort: "-createdAt" });
  return <LatestBlogsDyn blogs={res?.data || []} />;
};

/* ---- Dynamically imported client components (lazy JS) ---- */
import dynamic from "next/dynamic";

const PartnersDyn = dynamic(
  () => import("@/app/(public)/_components/Partners"),
  {
    loading: () => <SectionSkeleton />,
  },
);
const ServicesDyn = dynamic(
  () => import("@/app/(public)/_components/Services"),
  { loading: () => <SectionSkeleton /> },
);
const StatsDyn = dynamic(() => import("@/app/(public)/_components/Stats"), {
  loading: () => <SectionSkeleton />,
});
const PortfolioSliderDyn = dynamic(
  () => import("@/app/(public)/_components/PortfolioSlider"),
  { loading: () => <SectionSkeleton /> },
);
const ProcessDyn = dynamic(() => import("@/app/(public)/_components/Process"), {
  loading: () => <SectionSkeleton />,
});
const LatestBlogsDyn = dynamic(
  () => import("@/app/(public)/_components/LatestBlogs"),
  { loading: () => <SectionSkeleton /> },
);
const CTADyn = dynamic(() => import("@/app/(public)/_components/CTA"), {
  loading: () => <SectionSkeleton />,
});

const SectionSkeleton = () => (
  <div className="h-48 animate-pulse bg-muted/20 rounded-xl mx-6 my-8" />
);

const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <Suspense fallback={<SectionSkeleton />}>
        <PartnersSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <StatsDyn />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <PortfolioSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ProcessDyn />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <BlogsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CTADyn />
      </Suspense>
    </div>
  );
};

export default Home;
