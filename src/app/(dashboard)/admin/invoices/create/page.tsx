import InvoiceFormWrapper from "@/app/(dashboard)/admin/invoices/_components/InvoiceFormWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Invoice | Rangdhanu IT",
  description: "Generate professional software development invoices.",
};

const CreateInvoicePage = () => {
  return (
    <div className="p-4 md:p-8">
      <InvoiceFormWrapper />
    </div>
  );
};

export default CreateInvoicePage;
