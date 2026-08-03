"use client";

import { updateQuotation } from "@/services/Quotation/quotation";
import useActionHandler from "@/hooks/useActionHandler";
import FormLayout from "@/components/common/layouts/FormLayout";
import QuotationForm from "./QuotationForm";
import { QuotationFormValues } from "@/services/Quotation/quotation.validation";

interface EditQuotationFormProps {
  id: string;
  initialData?: QuotationFormValues;
}

const EditQuotationForm = ({ id, initialData }: EditQuotationFormProps) => {
  const { executePost, isPending } = useActionHandler();

  const isEditing = !!id;

  const handleUpdate = async (data: QuotationFormValues) => {
    await executePost({
      action: () => updateQuotation(id, data as any),
      hideLoadingToast: true,
      success: {
        message: "Quotation updated successfully!",
        redirectPath: "/admin/quotations",
      },
      errorMessage: "Failed to update quotation.",
    });
  };

  return (
    <FormLayout
      title={
        isEditing
          ? `Update Quotation ${initialData?.quotationNumber}`
          : "Create Quotation"
      }
      subtitle={
        isEditing
          ? "Modify line items or details and regenerate the professional PDF."
          : "Create a professional quotation with automated calculations."
      }
      backLink="/admin/quotations"
    >
      <div className="max-w-5xl mx-auto pb-20">
        <QuotationForm
          initialData={initialData}
          onSubmit={handleUpdate}
          loading={isPending}
          submitLabel="Update Quotation"
        />
      </div>
    </FormLayout>
  );
};

export default EditQuotationForm;
