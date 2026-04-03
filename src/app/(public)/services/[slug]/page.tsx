import { getServiceBySlug } from "@/services/Service/services";
import { IService } from "@/types/Service/service.types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ISlugPageProps } from "@/types";
import { ServiceDetailsView } from "@/components/modules/public/services/service-details/ServiceDetailsView";

export async function generateMetadata({
  params,
}: ISlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getServiceBySlug(slug);
    if (!res.success || !res.data) {
      return { title: "Service Not Found | Rangdhanu IT" };
    }
    const service: IService = res.data;
    return {
      title: `${service.title} | Our Services`,
      description: service.description,
      openGraph: {
        title: service.title,
        description: service.description,
        images: [service.image],
      },
    };
  } catch {
    return { title: "Services | Rangdhanu IT" };
  }
}

export default async function ServiceDetailsPage({ params }: ISlugPageProps) {
  const { slug } = await params;
  const res = await getServiceBySlug(slug);

  if (!res.success || !res.data) {
    notFound();
  }

  const service: IService = res.data;

  return <ServiceDetailsView service={service} />;
}
