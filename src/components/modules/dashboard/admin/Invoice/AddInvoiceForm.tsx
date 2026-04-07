"use client";

import { createInvoice } from "@/services/Invoice/invoice";
import useActionHandler from "@/hooks/useActionHandler";
import FormLayout from "@/components/common/layouts/FormLayout";
import InvoiceForm from "./InvoiceForm";
import { InvoiceFormValues } from "@/zod/invoice.validation";

const AddInvoiceForm = () => {
  const { executePost, isPending } = useActionHandler();

  const handleCreate = async (data: InvoiceFormValues) => {
    await executePost({
      action: () => createInvoice(data as any), // Type cast to match service if needed
      success: {
        message: "Invoice created successfully! You can now download the PDF.",
        redirectPath: "/admin/invoices",
        isRefresh: true,
      },
      errorMessage: "Failed to create invoice. Please check your inputs.",
    });
  };

  return (
    <FormLayout
      title="Generate Professional Invoice"
      subtitle="Create high-fidelity invoices with automated calculations and project timelines."
      backLink="/admin/invoices"
    >
      <div className="max-w-5xl mx-auto">
        <InvoiceForm
          onSubmit={handleCreate}
          loading={isPending}
          submitLabel="Create & Save Invoice"
        />
      </div>
    </FormLayout>
  );
};

export default AddInvoiceForm;
