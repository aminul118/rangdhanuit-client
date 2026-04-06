import QuotationTable from "./QuotationTable";
import { ManagementListWrapper } from "@/components/common/layouts/ManagementListWrapper";
import { FileSignature } from "lucide-react";
import { getQuotations } from "@/services/Quotation/quotation";

export const QuotationsList = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const res = await getQuotations(searchParams);
  const quotations = res?.data || []; 
  const meta = res?.meta || { total: 0, page: 1, limit: 10, totalPage: 1 };

  return (
    <ManagementListWrapper
      title="Quotations Management"
      description="Manage and track your client software service agreements and quotations."
      meta={meta}
      addBtn={{
        label: "Create Quotation",
        link: "/admin/quotations/create",
        icon: <FileSignature className="mr-2 group-hover:rotate-12 transition-transform" size={20} />,
      }}
    >
      <QuotationTable quotations={quotations} />
    </ManagementListWrapper>
  );
};
