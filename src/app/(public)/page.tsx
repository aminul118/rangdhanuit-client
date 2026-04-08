import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getPortfolios } from "@/services/Portfolio/portfolios";
import generateMetaTags from "@/Seo/generateMetaTags";
import { getServices } from "@/services/Service/services";
import Hero from "@/components/modules/public/home/Hero";
import Partners from "@/components/modules/public/home/Partners";
import { getPartners } from "@/services/Partner/partner";
import { getBlogs } from "@/services/Blog/blogs";
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
const FAQ = dynamic(() => import("@/components/modules/public/home/FAQ"));
const CTA = dynamic(() => import("@/components/modules/public/home/CTA"));

export const metadata: Metadata = generateMetaTags({
  title: "Rangdhanu IT | Best IT Solutions for Your Business",
  description:
    "Transform your business with Rangdhanu IT's cutting-edge web development, mobile apps, and digital marketing services. Innovating the future, one pixel at a time.",
  keywords:
    "IT solutions, web development, app development, digital marketing, graphics design, SEO services",
});

const Home = async () => {
  const [servicesRes, portfoliosRes, partnersRes, blogsRes] = await Promise.all(
    [
      getServices({ limit: "6" }),
      getPortfolios({ isFeatured: "true" }),
      getPartners(),
      getBlogs({ limit: "3", sort: "-createdAt" }),
    ],
  );

  const services = servicesRes?.data || [];
  const portfolios = portfoliosRes?.data || [];
  const partners = partnersRes?.data || [];
  const blogs = blogsRes?.data || [];

  return (
    <div className="flex flex-col">
      <Hero />
      <Partners partners={partners} />
      <Services services={services} />
      <Stats />
      <PortfolioSlider portfolios={portfolios} />
      <Process />
      {/* <Testimonials /> */}
      <LatestBlogs blogs={blogs} />
      <FAQ />
      <CTA />
    </div>
  );
};

export default Home;
