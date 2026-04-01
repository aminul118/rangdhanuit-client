import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { ServicesList } from "@/components/modules/dashboard/admin/Service/ServicesList";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";

export const metadata: Metadata = {
  title: "Service Management | Admin Dashboard",
  description:
    "Manage your professional service offerings and technical capabilities.",
};

const AdminServicesPage = async ({
  searchParams,
}: {
  searchParams: TSearchParamsPromise;
}) => {
  const params = (await searchParams) as Record<string, string>;

  return (
    <AdminPageWrapper
      skeletonColumns={[
        { width: "w-16" }, // SI
        { width: "w-full" }, // Service
        { width: "w-48" }, // Timeline
        { width: "w-10" }, // Actions
      ]}
    >
      <ServicesList searchParams={params} />
    </AdminPageWrapper>
  );
};

export default AdminServicesPage;
