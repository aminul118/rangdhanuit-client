import EditQuotationForm from "@/app/(dashboard)/admin/quotations/_componnets/EditQuotationForm";
import { getQuotationById } from "@/services/Quotation/quotation";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Quotation | Rangdhanu IT",
  description: "Update quotation details and regenerate professional PDF.",
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

  const initialData = {
    ...quotation,
    issueDate: new Date(quotation.issueDate),
    validUntil: quotation.validUntil
      ? new Date(quotation.validUntil)
      : undefined,
    projectStartTime: quotation.projectStartTime
      ? new Date(quotation.projectStartTime)
      : undefined,
    projectApproximateFinishTime: quotation.projectApproximateFinishTime
      ? new Date(quotation.projectApproximateFinishTime)
      : undefined,
  };

  return (
    <div className="p-4 md:p-8">
      <EditQuotationForm id={id} initialData={initialData as any} />
    </div>
  );
};

export default EditQuotationPage;
