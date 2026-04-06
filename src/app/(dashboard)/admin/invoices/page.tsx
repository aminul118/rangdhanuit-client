import { Metadata } from "next";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";
import { InvoicesList } from "@/components/modules/dashboard/admin/Invoice/InvoicesList";
import { TSearchParamsPromise } from "@/types";

export const metadata: Metadata = {
  title: "Invoices Management | Admin Dashboard",
  description: "Manage client invoices and billing.",
};

const AdminInvoicesPage = async ({
  searchParams,
}: {
  searchParams: TSearchParamsPromise;
}) => {
  const params = (await searchParams) as Record<string, string>;

  return (
    <AdminPageWrapper
      skeletonColumns={[
        { width: "w-16" },
        { width: "w-full" },
        { width: "w-48" },
        { width: "w-10" },
      ]}
    >
      <InvoicesList searchParams={params} />
    </AdminPageWrapper>
  );
};

export default AdminInvoicesPage;
