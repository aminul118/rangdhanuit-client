import { Metadata } from "next";
import { Suspense } from "react";
import generateMetaTags from "@/Seo/generateMetaTags";
import { PortfolioHero } from "@/app/(public)/portfolio/_components/PortfolioHero";
import { PortfolioList } from "@/app/(public)/portfolio/_components/PortfolioList";
import PortfolioCardSkeleton from "@/app/(public)/portfolio/_components/PortfolioCardSkeleton";
import { Container } from "@/components/ui/Container";

import { getPortfolios } from "@/services/Portfolio/portfolios";

export const metadata: Metadata = generateMetaTags({
  title: "Our Portfolio | Rangdhanu IT",
  description:
    "Explore our diverse portfolio of high-end web development and mobile applications. See how we deliver excellence to our global clients.",
  keywords: "portfolio, recent projects, case studies, success stories",
  websitePath: "portfolio",
});

export const revalidate = 300;

const PortfolioGrid = async () => {
  const { data: portfolios } = await getPortfolios();
  return <PortfolioList projects={portfolios} />;
};

const PortfolioSkeletonGrid = () => {
  return (
    <Container>
      <div className="grid gap-6 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PortfolioCardSkeleton key={i} />
        ))}
      </div>
    </Container>
  );
};

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-background pb-32 transition-colors duration-500">
      <PortfolioHero />
      <Suspense fallback={<PortfolioSkeletonGrid />}>
        <PortfolioGrid />
      </Suspense>
    </div>
  );
};

export default PortfolioPage;
