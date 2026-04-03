import { Metadata } from "next";
import Services from "@/components/modules/public/home/Services";
import Partners from "@/components/modules/public/home/Partners";
import PortfolioSlider from "@/components/modules/public/home/PortfolioSlider";
import { getPortfolios } from "@/services/Portfolio/portfolios";
import CTA from "@/components/modules/public/home/CTA";
import Stats from "@/components/modules/public/home/Stats";
import Process from "@/components/modules/public/home/Process";
import Testimonials from "@/components/modules/public/home/Testimonials";
import FAQ from "@/components/modules/public/home/FAQ";
import generateMetaTags from "@/Seo/generateMetaTags";
import { getServices } from "@/services/Service/services";
import Hero from "@/components/modules/public/home/Hero";

export const metadata: Metadata = generateMetaTags({
  title: "Rangdhanu IT | Premium IT Solutions for Your Business",
  description:
    "Transform your business with Rangdhanu IT's cutting-edge web development, mobile apps, and digital marketing services. Innovating the future, one pixel at a time.",
  keywords:
    "IT solutions, web development, app development, digital marketing, graphics design, SEO services",
});

const Home = async () => {
  const [servicesRes, portfoliosRes] = await Promise.all([
    getServices({ limit: "6" }),
    getPortfolios({ isFeatured: "true" }),
  ]);

  const services = servicesRes?.data || [];
  const portfolios = portfoliosRes?.data || [];

  return (
    <div className="flex flex-col">
      <Hero />
      <Partners />
      <Services services={services} />
      <Stats />
      <PortfolioSlider portfolios={portfolios} />
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
};

export default Home;
