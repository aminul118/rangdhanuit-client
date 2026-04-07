"use client";

import { createQuotation } from "@/services/Quotation/quotation";
import useActionHandler from "@/hooks/useActionHandler";
import FormLayout from "@/components/common/layouts/FormLayout";
import QuotationForm from "./QuotationForm";
import { QuotationFormValues } from "@/zod/quotation.validation";

const AddQuotationForm = () => {
  const { executePost, isPending } = useActionHandler();

  const handleCreate = async (data: QuotationFormValues) => {
    await executePost({
      action: () => createQuotation(data as any),
      success: {
        message: "Quotation generated successfully! Your strategic proposal is ready.",
        redirectPath: "/admin/quotations",
        isRefresh: true,
      },
      errorMessage: "Failed to generate quotation. Please review the project details.",
    });
  };

  return (
    <FormLayout
      title="Strategic Proposal Generation"
      subtitle="Craft high-impact software development proposals with automated financial modeling."
      backLink="/admin/quotations"
    >
      <div className="max-w-6xl mx-auto pb-20">
        <QuotationForm
          onSubmit={handleCreate}
          loading={isPending}
          submitLabel="Initialize Proposal"
        />
      </div>
    </FormLayout>
  );
};

export default AddQuotationForm;
