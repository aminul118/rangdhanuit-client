import { Metadata } from "next";
import generateMetaTags from "@/Seo/generateMetaTags";
import { PortfolioHero } from "@/components/modules/public/portfolio/PortfolioHero";
import { PortfolioList } from "@/components/modules/public/portfolio/PortfolioList";
import { PortfolioTestimonial } from "@/components/modules/public/portfolio/PortfolioTestimonial";

export const metadata: Metadata = generateMetaTags({
  title: "Our Portfolio | Rangdhanu IT",
  description:
    "Explore our diverse portfolio of high-end web development and mobile applications. See how we deliver excellence to our global clients.",
  keywords: "portfolio, recent projects, case studies, success stories",
});

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <PortfolioHero />
      <PortfolioList />
      <PortfolioTestimonial />
    </div>
  );
}
