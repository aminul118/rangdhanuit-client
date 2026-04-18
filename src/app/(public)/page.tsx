import { Metadata } from "next";
import { getPortfolios } from "@/services/Portfolio/portfolios";
import generateMetaTags from "@/Seo/generateMetaTags";
import { getServices } from "@/services/Service/services";
import { getPartners } from "@/services/Partner/partner";
import { getBlogs } from "@/services/Blog/blogs";
import dynamic from "next/dynamic";
import Hero from "@/components/modules/public/home/Hero";
const Partners = dynamic(
  () => import("@/components/modules/public/home/Partners"),
);
const Services = dynamic(
  () => import("@/components/modules/public/home/Services"),
);
const Stats = dynamic(() => import("@/components/modules/public/home/Stats"));
const PortfolioSlider = dynamic(
  () => import("@/components/modules/public/home/PortfolioSlider"),
);
const Process = dynamic(
  () => import("@/components/modules/public/home/Process"),
);
const LatestBlogs = dynamic(
  () => import("@/components/modules/public/home/LatestBlogs"),
);
const CTA = dynamic(() => import("@/components/modules/public/home/CTA"));

export const metadata: Metadata = generateMetaTags({
  title: "Rangdhanu IT | Best IT Solutions for Your Business",
  description:
    "Transform your business with Rangdhanu IT's cutting-edge web development, mobile apps, and digital marketing services. Innovating the future, one pixel at a time.",
  keywords:
    "IT solutions, web development, app development, digital marketing, graphics design, SEO services",
});

import { Suspense } from "react";

const PartnersSection = async () => {
  const partnersRes = await getPartners();
  const partners = partnersRes?.data || [];
  return <Partners partners={partners} />;
};

const ServicesSection = async () => {
  const servicesRes = await getServices({ limit: "6" });
  const services = servicesRes?.data || [];
  return <Services services={services} />;
};

const PortfolioSection = async () => {
  const portfoliosRes = await getPortfolios({ isFeatured: "true" });
  const portfolios = portfoliosRes?.data || [];
  return <PortfolioSlider portfolios={portfolios} />;
};

const BlogsSection = async () => {
  const blogsRes = await getBlogs({ limit: "3", sort: "-createdAt" });
  const blogs = blogsRes?.data || [];
  return <LatestBlogs blogs={blogs} />;
};

const SectionSkeleton = () => (
  <div className="w-full py-20 animate-pulse bg-muted/20" />
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
      <Stats />
      <Suspense fallback={<SectionSkeleton />}>
        <PortfolioSection />
      </Suspense>
      <Process />
      <Suspense fallback={<SectionSkeleton />}>
        <BlogsSection />
      </Suspense>
      <CTA />
    </div>
  );
};

export default Home;
