import { Metadata } from "next";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";
import { QuotationsList } from "@/components/modules/dashboard/admin/Quotation/QuotationsList";
import { TSearchParamsPromise } from "@/types";

export const metadata: Metadata = {
  title: "Quotations Management | Admin Dashboard",
  description: "Manage client service agreements and quotations.",
};

const AdminQuotationsPage = async ({
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
      <QuotationsList searchParams={params} />
    </AdminPageWrapper>
  );
};

export default AdminQuotationsPage;
