import {
  getPortfolioBySlug,
  getPortfolios,
} from "@/services/Portfolio/portfolios";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ISlugPageProps } from "@/types";
import { PortfolioDetailsView } from "@/app/(public)/portfolio/[slug]/_components/PortfolioDetailsView";
import { extractPlainText } from "@/helpers/extractPlainText";
import metaConfig from "@/config/meta.config";
import generateMetaTags from "@/Seo/generateMetaTags";

export const generateMetadata = async (
  props: ISlugPageProps,
): Promise<Metadata> => {
  const params = await props.params;
  const resolvedParams = await (params instanceof Promise
    ? params
    : Promise.resolve(params));
  const slug = resolvedParams?.slug;

  try {
    const res = await getPortfolioBySlug(slug);

    if (!res.success || !res.data) {
      return {
        title: "Project Not Found | Rangdhanu IT",
      };
    }

    const { title, content, thumbnail, seo } = res.data;
    const description =
      seo?.description || extractPlainText(content || "").slice(0, 160);

    return generateMetaTags({
      title: seo?.title || title,
      description,
      keywords: seo?.keywords || metaConfig.keywords,
      image: thumbnail,
      websitePath: `portfolio/${slug}`,
    });
  } catch (error) {
    console.error("Error generating portfolio metadata:", error);
    return {
      title: "Our Work",
    };
  }
};

export const generateStaticParams = async () => {
  const res = await getPortfolios({ limit: "1000" });

  if (!res.success || !res.data) {
    return [];
  }

  return res.data.map((portfolio) => ({
    slug: portfolio.slug,
  }));
};

const PortfolioDetailsPage = async (props: ISlugPageProps) => {
  const params = await props.params;
  const resolvedParams = await (params instanceof Promise
    ? params
    : Promise.resolve(params));
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
};

export default PortfolioDetailsPage;
