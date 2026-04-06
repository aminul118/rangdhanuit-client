import InvoiceTable from "./InvoiceTable";
import { ManagementListWrapper } from "@/components/common/layouts/ManagementListWrapper";
import { Receipt } from "lucide-react";
import { getInvoices } from "@/services/Invoice/invoice";

export const InvoicesList = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const res = await getInvoices(searchParams);
  const invoices = res?.data || [];
  const meta = res?.meta || { total: 0, page: 1, limit: 10, totalPage: 1 };

  return (
    <ManagementListWrapper
      title="Invoices Management"
      description="Manage and track your client billing and payments."
      meta={meta}
      addBtn={{
        label: "Create Invoice",
        link: "/admin/invoices/create",
        icon: (
          <Receipt
            className="mr-2 group-hover:rotate-12 transition-transform"
            size={20}
          />
        ),
      }}
    >
      <InvoiceTable invoices={invoices} />
    </ManagementListWrapper>
  );
};
