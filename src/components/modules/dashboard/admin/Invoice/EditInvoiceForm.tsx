"use client";

import { updateInvoice } from "@/services/Invoice/invoice";
import useActionHandler from "@/hooks/useActionHandler";
import FormLayout from "@/components/common/layouts/FormLayout";
import InvoiceForm from "./InvoiceForm";
import { InvoiceFormValues } from "@/zod/invoice.validation";

interface EditInvoiceFormProps {
  id: string;
  initialData: InvoiceFormValues;
}

const EditInvoiceForm = ({ id, initialData }: EditInvoiceFormProps) => {
  const { executePost, isPending } = useActionHandler();

  const handleUpdate = async (data: InvoiceFormValues) => {
    await executePost({
      action: () => updateInvoice(id, data as any),
      success: {
        message: "Invoice updated successfully!",
        redirectPath: "/admin/invoices",
        isRefresh: true,
      },
      errorMessage: "Failed to update invoice.",
    });
  };

  return (
    <FormLayout
      title={`Update Invoice ${initialData.invoiceNumber}`}
      subtitle="Modify line items or project timelines and regenerate the professional PDF."
      backLink="/admin/invoices"
    >
      <div className="max-w-5xl mx-auto pb-20">
        <InvoiceForm
          initialData={initialData}
          onSubmit={handleUpdate}
          loading={isPending}
          submitLabel="Update Invoice Records"
        />
      </div>
    </FormLayout>
  );
};

export default EditInvoiceForm;
