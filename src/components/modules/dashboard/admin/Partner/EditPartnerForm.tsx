"use client";

import { updatePartnerBySlug } from "@/services/Partner/partner";
import PartnerForm from "./PartnerForm";
import useActionHandler from "@/hooks/useActionHandler";
import FormLayout from "@/components/common/layouts/FormLayout";
import { IPartner } from "@/types";

interface EditPartnerFormProps {
  partner: IPartner;
}

/**
 * Standard Edition Form for Partners.
 * Uses the unified Action Handler and Form Layout.
 */
const EditPartnerForm = ({ partner }: EditPartnerFormProps) => {
  const { executePost, isPending } = useActionHandler();

  const handleUpdate = async (formData: FormData) => {
    await executePost({
      action: () => updatePartnerBySlug(partner.slug, formData),
      success: {
        message: "Partner updated successfully! Details are now current.",
        redirectPath: "/admin/partners",
        isRefresh: true,
      },
    });
  };

  return (
    <FormLayout
      title="Edit Partner"
      subtitle="Update the details of your business partner to ensure accurate representation."
      backLink="/admin/partners"
    >
      <PartnerForm
        initialData={partner}
        onSubmit={handleUpdate}
        loading={isPending}
        submitLabel="Update Partner"
      />
    </FormLayout>
  );
};

export default EditPartnerForm;
