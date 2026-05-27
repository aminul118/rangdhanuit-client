import { Metadata } from "next";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";
import { InvoicesList } from "@/components/modules/dashboard/admin/Invoice/InvoicesList";
import { TSearchParamsPromise } from "@/types";

export const metadata: Metadata = {
  title: "Invoices Management | Admin Dashboard",
  description: "Manage client invoices and billing.",
};

const AdminInvoicesPage = async (props: {
  searchParams: Promise<TSearchParamsPromise>;
}) => {
  const searchParams = await props.searchParams;
  const params = (await searchParams) as Record<string, string>;

  return (
    <AdminPageWrapper>
      <InvoicesList searchParams={params} />
    </AdminPageWrapper>
  );
};

export default AdminInvoicesPage;
