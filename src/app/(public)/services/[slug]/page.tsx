import { getServiceBySlug, getServices } from "@/services/Service/services";
import { IService } from "@/types/Service/service.types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ISlugPageProps } from "@/types";
import { ServiceDetailsView } from "@/app/(public)/services/[slug]/_components/ServiceDetailsView";
import { extractPlainText } from "@/helpers/extractPlainText";
import metaConfig from "@/config/meta.config";
import generateMetaTags from "@/Seo/generateMetaTags";

export async function generateMetadata(
  props: ISlugPageProps,
): Promise<Metadata> {
  const params = await props.params;
  const resolvedParams = await (params instanceof Promise
    ? params
    : Promise.resolve(params));
  const slug = resolvedParams?.slug;

  try {
    const res = await getServiceBySlug(slug);
    if (!res.success || !res.data) {
      return { title: "Service Not Found | Rangdhanu IT" };
    }
    const {
      title,
      description: rawDescription,
      content,
      image,
      seo,
    } = res.data;

    // Fallback logic: use SEO fields if available, otherwise fallback to title/description
    const finalTitle = seo?.title || title;

    // Extract plain text for description fallback
    const extractedDescription = extractPlainText(
      rawDescription || content || "",
    ).slice(0, 160);
    const finalDescription = seo?.description || extractedDescription;

    const finalKeywords = seo?.keywords || metaConfig.keywords;

    return generateMetaTags({
      title: finalTitle,
      description: finalDescription,
      keywords: finalKeywords,
      image,
      websitePath: `services/${slug}`,
    });
  } catch {
    return { title: "Our Services" };
  }
}

export const dynamic = "force-dynamic";

export default async function ServiceDetailsPage(props: ISlugPageProps) {
  const params = await props.params;
  const resolvedParams = await (params instanceof Promise
    ? params
    : Promise.resolve(params));
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const res = await getServiceBySlug(slug);

  if (!res.success || !res.data) {
    notFound();
  }

  const service: IService = res.data;

  return <ServiceDetailsView service={service} />;
}
