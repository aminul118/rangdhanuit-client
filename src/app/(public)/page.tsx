import { Metadata } from "next";
import Services from "@/components/modules/public/home/Services";
import Partners from "@/components/modules/public/home/Partners";
import PortfolioSlider from "@/components/modules/public/home/PortfolioSlider";
import { getPortfolios } from "@/services/Portfolio/portfolios";
import CTA from "@/components/modules/public/home/CTA";
import Stats from "@/components/modules/public/home/Stats";
import Process from "@/components/modules/public/home/Process";
import FAQ from "@/components/modules/public/home/FAQ";
import generateMetaTags from "@/Seo/generateMetaTags";
import { getServices } from "@/services/Service/services";
import Hero from "@/components/modules/public/home/Hero";
import { getPartners } from "@/services/Partner/partner";
import LatestBlogs from "@/components/modules/public/home/LatestBlogs";
import { getBlogs } from "@/services/Blog/blogs";

export const metadata: Metadata = generateMetaTags({
  title: "Rangdhanu IT | Premium IT Solutions for Your Business",
  description:
    "Transform your business with Rangdhanu IT's cutting-edge web development, mobile apps, and digital marketing services. Innovating the future, one pixel at a time.",
  keywords:
    "IT solutions, web development, app development, digital marketing, graphics design, SEO services",
});

const Home = async () => {
  const [servicesRes, portfoliosRes, partnersRes, blogsRes] = await Promise.all([
    getServices({ limit: "6" }),
    getPortfolios({ isFeatured: "true" }),
    getPartners(),
    getBlogs({ limit: "3", sort: "-createdAt" }),
  ]);

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
