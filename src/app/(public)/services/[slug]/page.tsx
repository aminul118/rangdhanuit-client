import { getServiceBySlug, getServices } from "@/services/Service/services";
import { IService } from "@/types/Service/service.types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ISlugPageProps } from "@/types";
import { ServiceDetailsView } from "@/components/modules/public/services/service-details/ServiceDetailsView";
import { extractPlainText } from "@/helpers/extractPlainText";
import metaConfig from "@/config/meta.config";
import generateMetaTags from "@/Seo/generateMetaTags";

export async function generateMetadata({
  params,
}: ISlugPageProps): Promise<Metadata> {
  const resolvedParams = await (params instanceof Promise
    ? params
    : Promise.resolve(params));
  const slug = resolvedParams?.slug;

  try {
    const res = await getServiceBySlug(slug);
    if (!res.success || !res.data) {
      return { title: "Service Not Found | Rangdhanu IT" };
    }
    const { title, description: rawDescription, content, image } = res.data;
    const description = extractPlainText(rawDescription || content || "").slice(
      0,
      160,
    );

    return generateMetaTags({
      title,
      description,
      keywords: metaConfig.keywords, // Or specific keywords if available
      image,
      websitePath: `services/${slug}`,
    });
  } catch {
    return { title: "Our Services" };
  }
}

export const generateStaticParams = async () => {
  const res = await getServices({ limit: "100" });

  if (!res.success || !res.data) {
    return [];
  }

  return res.data.map((service) => ({
    slug: service.slug,
  }));
};

export default async function ServiceDetailsPage({ params }: ISlugPageProps) {
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
