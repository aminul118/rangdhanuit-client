import EditInvoiceForm from "@/components/modules/dashboard/admin/Invoice/EditInvoiceForm";
import { getInvoiceById } from "@/services/Invoice/invoice";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Invoice | Rangdhanu IT",
  description: "Update invoice details and regenerate professional PDF.",
};

interface Props {
  params: Promise<{ id: string }>;
}

const EditInvoicePage = async ({ params }: Props) => {
  const { id } = await params;
  
  const res = await getInvoiceById(id);

  if (!res.success || !res.data) {
    notFound();
  }

  const invoice = res.data;

  // Convert string dates to Date objects for react-hook-form
  const initialData = {
    ...invoice,
    issueDate: new Date(invoice.issueDate),
    dueDate: new Date(invoice.dueDate),
    projectStartTime: invoice.projectStartTime ? new Date(invoice.projectStartTime) : undefined,
    projectApproximateFinishTime: invoice.projectApproximateFinishTime ? new Date(invoice.projectApproximateFinishTime) : undefined,
  };

  return (
    <div className="p-4 md:p-8">
      <EditInvoiceForm id={id} initialData={initialData as any} />
    </div>
  );
};

export default EditInvoicePage;
