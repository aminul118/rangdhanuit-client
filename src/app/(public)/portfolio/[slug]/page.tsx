import { getPortfolioBySlug } from "@/services/Portfolio/portfolios";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ISlugPageProps, IPortfolio } from "@/types";
import { PortfolioDetailsView } from "@/components/modules/public/portfolio/portfolio-details/PortfolioDetailsView";

export async function generateMetadata({
  params,
}: ISlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = (await getPortfolioBySlug(slug)) as {
      success: boolean;
      data: IPortfolio;
    };

    if (!data.success || !data.data) {
      return {
        title: "Project Not Found | Rangdhanu IT",
      };
    }

    const project = data.data;
    const description = project.description
      .replace(/<[^>]*>/g, "")
      .slice(0, 160);

    return {
      title: `${project.title} | Portfolio | Rangdhanu IT`,
      description,
      openGraph: {
        title: project.title,
        description,
        images: [project.image],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: project.title,
        description,
        images: [project.image],
      },
    };
  } catch {
    return {
      title: "Portfolio | Rangdhanu IT",
    };
  }
}

export default async function PortfolioDetailsPage({ params }: ISlugPageProps) {
  const { slug } = await params;
  const data = (await getPortfolioBySlug(slug)) as {
    success: boolean;
    data: IPortfolio;
  };

  if (!data.success || !data.data) {
    notFound();
  }

  const project = data.data;

  return <PortfolioDetailsView project={project} />;
}
