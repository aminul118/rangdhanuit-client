"use client";

import { createQuotation } from "@/services/Quotation/quotation";
import useActionHandler from "@/hooks/useActionHandler";
import FormLayout from "@/components/common/layouts/FormLayout";
import QuotationForm from "./QuotationForm";
import { QuotationFormValues } from "@/services/Quotation/quotation.validation";

const AddQuotationForm = () => {
  const { executePost, isPending } = useActionHandler();

  const handleCreate = async (data: QuotationFormValues) => {
    await executePost({
      action: () => createQuotation(data as any),
      hideLoadingToast: true,
      success: {
        message: "Quotation created successfully!",
        redirectPath: "/admin/quotations",
      },
      errorMessage: "Failed to create quotation. Please check your inputs.",
    });
  };

  return (
    <FormLayout
      title="Create Quotation"
      subtitle="Create a professional quotation with automated calculations."
      backLink="/admin/quotations"
    >
      <div className="max-w-5xl mx-auto pb-20">
        <QuotationForm
          onSubmit={handleCreate}
          loading={isPending}
          submitLabel="Create & Save Quotation"
        />
      </div>
    </FormLayout>
  );
};

export default AddQuotationForm;
