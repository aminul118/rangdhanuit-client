import { getServiceById } from "@/services/Service/services";
import EditServiceForm from "@/components/modules/dashboard/admin/Service/EditServiceForm";
import { Metadata } from 'next';
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: 'Refine Service | Admin Dashboard',
  description: 'Iterate and improve our technology service offerings.',
};

const EditServicePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await getServiceById(id);

  if (!res.success || !res.data) {
    notFound();
  }

  return <EditServiceForm id={id} initialData={res.data} />;
};

export default EditServicePage;
