import { Metadata } from "next";
import { getMyInvoices } from "@/services/Invoice/invoice";
import { UserInvoicesContent } from "./_components/UserInvoicesContent";

export const metadata: Metadata = {
  title: "My Invoices | Dashboard | Rangdhanu IT",
  description: "View and download your project invoices.",
};

const InvoicesPage = async () => {
  const res = await getMyInvoices();
  const invoices = res?.data || [];

  return (
    <div className="p-6">
      <UserInvoicesContent initialInvoices={invoices} />
    </div>
  );
};

export default InvoicesPage;
