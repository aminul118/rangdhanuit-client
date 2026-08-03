import { Metadata } from "next";
import { getMyQuotations } from "@/services/Quotation/quotation";
import { UserQuotationsContent } from "./_components/UserQuotationsContent";

export const metadata: Metadata = {
  title: "My Quotations | Dashboard | Rangdhanu IT",
  description: "View and download your service quotations.",
};

const QuotationsPage = async () => {
  const res = await getMyQuotations();
  const quotations = res?.data || [];

  return (
    <div className="p-6">
      <UserQuotationsContent initialQuotations={quotations} />
    </div>
  );
};

export default QuotationsPage;
