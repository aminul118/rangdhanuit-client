import EditQuotationForm from "@/components/modules/dashboard/admin/Quotation/EditQuotationForm";
import { getQuotationById } from "@/services/Quotation/quotation";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Quotation | Rangdhanu IT",
  description: "Refine strategic proposal and regenerate professional PDF.",
};

interface Props {
  params: Promise<{ id: string }>;
}

const EditQuotationPage = async ({ params }: Props) => {
  const { id } = await params;
  
  const res = await getQuotationById(id);

  if (!res.success || !res.data) {
    notFound();
  }

  const quotation = res.data;

  // Convert string dates to Date objects for react-hook-form
  const initialData = {
    ...quotation,
    startDate: quotation.startDate ? new Date(quotation.startDate) : undefined,
    endDate: quotation.endDate ? new Date(quotation.endDate) : undefined,
  };

  return (
    <div className="p-4 md:p-8">
      <EditQuotationForm id={id} initialData={initialData as any} />
    </div>
  );
};

export default EditQuotationPage;
