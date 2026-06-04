import { getServiceBySlug } from "@/services/Service/services";
import EditServiceForm from "@/app/(dashboard)/admin/services/_components/EditServiceForm";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Refine Service | Admin Dashboard",
  description: "Iterate and improve our technology service offerings.",
};

const EditServicePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const res = await getServiceBySlug(slug);

  if (!res.success || !res.data) {
    notFound();
  }

  return <EditServiceForm slug={slug} initialData={res.data} />;
};

export default EditServicePage;
