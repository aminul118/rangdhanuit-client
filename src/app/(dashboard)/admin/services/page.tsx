import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { ServicesList } from "@/components/modules/dashboard/admin/Service/ServicesList";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";

export const metadata: Metadata = {
  title: "Service Management | Admin Dashboard",
  description:
    "Manage your professional service offerings and technical capabilities.",
};

const AdminServicesPage = async (props: {
  searchParams: Promise<TSearchParamsPromise>;
}) => {
  const searchParams = await props.searchParams;
  const params = (await searchParams) as Record<string, string>;

  return (
    <AdminPageWrapper>
      <ServicesList searchParams={params} />
    </AdminPageWrapper>
  );
};

export default AdminServicesPage;
