"use client";

import { createPartner } from "@/services/Partner/partner";
import PartnerForm from "./PartnerForm";
import useActionHandler from "@/hooks/useActionHandler";
import FormLayout from "@/components/common/layouts/FormLayout";

/**
 * Standard Creation Form for Partners.
 * Uses the unified Action Handler and Form Layout.
 */
const AddPartnerForm = () => {
  const { executePost, isPending } = useActionHandler();

  const handleCreate = async (formData: FormData) => {
    await executePost({
      action: () => createPartner(formData),
      success: {
        message: "Partner created successfully! Your collaboration is now live.",
        redirectPath: "/admin/partners",
        isRefresh: true,
      },
    });
  };

  return (
    <FormLayout
      title="Add New Partner"
      subtitle="Fill in the details below to add a new business partner to your showcase."
      backLink="/admin/partners"
    >
      <PartnerForm
        onSubmit={handleCreate}
        loading={isPending}
        submitLabel="Create Partner"
      />
    </FormLayout>
  );
};

export default AddPartnerForm;
