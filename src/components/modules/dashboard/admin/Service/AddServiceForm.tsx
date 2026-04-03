"use client";

import { createService } from "@/services/Service/services";
import ServiceForm from "./ServiceForm";
import useActionHandler from "@/hooks/useActionHandler";
import FormLayout from "@/components/common/layouts/FormLayout";

const AddServiceForm = () => {
  const { executePost, isPending } = useActionHandler();

  const handleCreate = async (formData: FormData) => {
    await executePost({
      action: () => createService(formData),
      success: {
        message: "Service launched! Your new capability is now live.",
        redirectPath: "/admin/services",
        isRefresh: true,
      },
    });
  };

  return (
    <FormLayout
      title="Define New Capability"
      subtitle="Introduce a specialized service to your portfolio. Clearly define the value proposition and technical scope."
      backLink="/admin/services"
    >
      <ServiceForm
        onSubmit={handleCreate}
        loading={isPending}
        submitLabel="Launch Service"
      />
    </FormLayout>
  );
};

export default AddServiceForm;
