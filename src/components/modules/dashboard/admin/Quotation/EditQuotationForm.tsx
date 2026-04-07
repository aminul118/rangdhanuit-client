"use client";

import { updateQuotation } from "@/services/Quotation/quotation";
import useActionHandler from "@/hooks/useActionHandler";
import FormLayout from "@/components/common/layouts/FormLayout";
import QuotationForm from "./QuotationForm";
import { QuotationFormValues } from "@/zod/quotation.validation";

interface EditQuotationFormProps {
  id: string;
  initialData: QuotationFormValues;
}

const EditQuotationForm = ({ id, initialData }: EditQuotationFormProps) => {
  const { executePost, isPending } = useActionHandler();

  const handleUpdate = async (data: QuotationFormValues) => {
    await executePost({
      action: () => updateQuotation(id, data as any),
      success: {
        message: "Strategic proposal updated successfully!",
        redirectPath: "/admin/quotations",
        isRefresh: true,
      },
      errorMessage: "Failed to update project records.",
    });
  };

  return (
    <FormLayout
      title={`Refining Proposal: ${initialData.projectName}`}
      subtitle="Update strategic scope, financial models, or deliverables and regenerate the professional proposal."
      backLink="/admin/quotations"
    >
      <div className="max-w-6xl mx-auto pb-20">
        <QuotationForm
          initialData={initialData}
          onSubmit={handleUpdate}
          loading={isPending}
          submitLabel="Refine Strategic Proposal"
        />
      </div>
    </FormLayout>
  );
};

export default EditQuotationForm;
