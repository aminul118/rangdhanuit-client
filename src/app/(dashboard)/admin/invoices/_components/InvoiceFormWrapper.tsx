"use client";

import { createInvoice, updateInvoice } from "@/services/Invoice/invoice";
import useActionHandler from "@/hooks/useActionHandler";
import FormLayout from "@/components/common/layouts/FormLayout";
import InvoiceForm from "./InvoiceForm";
import { InvoiceFormValues } from "@/services/Invoice/invoice.validation";

interface InvoiceFormWrapperProps {
  id?: string;
  initialData?: InvoiceFormValues;
}

const InvoiceFormWrapper = ({ id, initialData }: InvoiceFormWrapperProps) => {
  const { executePost, isPending } = useActionHandler();

  const isEditing = !!id;

  const handleSubmit = async (data: InvoiceFormValues) => {
    await executePost({
      action: () =>
        isEditing ? updateInvoice(id, data as any) : createInvoice(data as any),
      hideLoadingToast: true,
      success: {
        message: isEditing
          ? "Invoice updated successfully!"
          : "Invoice created successfully!",
        redirectPath: "/admin/invoices",
      },
      errorMessage: isEditing
        ? "Failed to update invoice."
        : "Failed to create invoice. Please check your inputs.",
    });
  };

  return (
    <FormLayout
      title={
        isEditing
          ? `Update Invoice ${initialData?.invoiceNumber}`
          : "Generate Professional Invoice"
      }
      subtitle={
        isEditing
          ? "Modify line items or project timelines and regenerate the professional PDF."
          : "Create high-fidelity invoices with automated calculations and project timelines."
      }
      backLink="/admin/invoices"
    >
      <div className="max-w-5xl mx-auto pb-20">
        <InvoiceForm
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={isPending}
          submitLabel={
            isEditing ? "Update Invoice Records" : "Create & Save Invoice"
          }
        />
      </div>
    </FormLayout>
  );
};

export default InvoiceFormWrapper;
