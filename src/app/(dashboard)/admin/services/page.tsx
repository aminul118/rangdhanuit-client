import { Suspense } from "react";
import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { ServicesList } from "@/components/modules/dashboard/admin/Service/ServicesList";
import { TableSkeleton } from "@/components/common/loader/TableSkeleton";

export const metadata: Metadata = {
  title: "Service Management | Admin Dashboard",
  description: "Manage your professional service offerings and technical capabilities.",
};

const AdminServicesPage = async ({
  searchParams,
}: {
  searchParams: TSearchParamsPromise;
}) => {
  const params = (await searchParams) as Record<string, string>;

  return (
    <div className="min-h-[calc(100vh-80px)] p-6 md:p-12">
      <Suspense
        fallback={
          <TableSkeleton
            columns={[
              { width: "w-16" }, // SI
              { width: "w-full" }, // Service
              { width: "w-48" }, // Timeline
              { width: "w-10" }, // Actions
            ]}
          />
        }
      >
        <ServicesList searchParams={params} />
      </Suspense>
    </div>
  );
};

export default AdminServicesPage;
