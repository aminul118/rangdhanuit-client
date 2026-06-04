import { Metadata } from "next";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";
import { QuotationsList } from "@/app/(dashboard)/admin/quotations/_componnets/QuotationsList";
import { TSearchParamsPromise } from "@/types";

export const metadata: Metadata = {
  title: "Quotations Management | Admin Dashboard",
  description: "Manage client service agreements and quotations.",
};

const AdminQuotationsPage = async (props: {
  searchParams: Promise<TSearchParamsPromise>;
}) => {
  const searchParams = await props.searchParams;
  const params = (await searchParams) as Record<string, string>;

  return (
    <AdminPageWrapper>
      <QuotationsList searchParams={params} />
    </AdminPageWrapper>
  );
};

export default AdminQuotationsPage;
