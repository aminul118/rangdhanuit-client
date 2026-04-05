import { getPortfolioBySlug } from "@/services/Portfolio/portfolios";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ISlugPageProps } from "@/types";
import { PortfolioDetailsView } from "@/components/modules/public/portfolio/portfolio-details/PortfolioDetailsView";

export async function generateMetadata({
  params,
}: ISlugPageProps): Promise<Metadata> {
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  const slug = resolvedParams?.slug;

  try {
    const res = await getPortfolioBySlug(slug);

    if (!res.success || !res.data) {
      return {
        title: "Project Not Found | Rangdhanu IT",
      };
    }

    const project = res.data;
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
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const res = await getPortfolioBySlug(slug);

  if (!res.success || !res.data) {
    notFound();
  }

  const project = res.data;

  return <PortfolioDetailsView project={project} />;
}
