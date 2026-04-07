import AddInvoiceForm from "@/components/modules/dashboard/admin/Invoice/AddInvoiceForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Invoice | Rangdhanu IT",
  description: "Generate professional software development invoices.",
};

const CreateInvoicePage = () => {
  return (
    <div className="p-4 md:p-8">
      <AddInvoiceForm />
    </div>
  );
};

export default CreateInvoicePage;
