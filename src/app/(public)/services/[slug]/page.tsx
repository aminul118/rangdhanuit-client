import { getServiceBySlug } from "@/services/Service/services";
import { IService } from "@/types/Service/service.types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ISlugPageProps } from "@/types";
import { ServiceDetailsView } from "@/components/modules/public/services/service-details/ServiceDetailsView";

export async function generateMetadata({
  params,
}: ISlugPageProps): Promise<Metadata> {
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  const slug = resolvedParams?.slug;

  try {
    const res = await getServiceBySlug(slug);
    if (!res.success || !res.data) {
      return { title: "Service Not Found | Rangdhanu IT" };
    }
    const service: IService = res.data;
    return {
      title: service.title,
      description: service.description,
      openGraph: {
        title: service.title,
        description: service.description,
        images: [
          {
            url: service.image,
            width: 1200,
            height: 630,
            alt: service.title,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: service.title,
        description: service.description,
        images: [service.image],
      },
    };
  } catch (error) {
    console.error("Error generating service metadata:", error);
    return { title: "Our Services" };
  }
}

export default async function ServiceDetailsPage({ params }: ISlugPageProps) {
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
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
