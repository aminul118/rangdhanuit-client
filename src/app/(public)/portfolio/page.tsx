import { Metadata } from "next";
import generateMetaTags from "@/Seo/generateMetaTags";
import { PortfolioHero } from "@/app/(public)/portfolio/_components/PortfolioHero";
import { PortfolioList } from "@/app/(public)/portfolio/_components/PortfolioList";

export const metadata: Metadata = generateMetaTags({
  title: "Our Portfolio | Rangdhanu IT",
  description:
    "Explore our diverse portfolio of high-end web development and mobile applications. See how we deliver excellence to our global clients.",
  keywords: "portfolio, recent projects, case studies, success stories",
  websitePath: "portfolio",
});

import { getPortfolios } from "@/services/Portfolio/portfolios";

export const dynamic = "force-dynamic";

const PortfolioPage = async () => {
  const { data: portfolios } = await getPortfolios();

  return (
    <div className="min-h-screen bg-background pb-32 transition-colors duration-500">
      <PortfolioHero />
      <PortfolioList projects={portfolios} />
    </div>
  );
};

export default PortfolioPage;
