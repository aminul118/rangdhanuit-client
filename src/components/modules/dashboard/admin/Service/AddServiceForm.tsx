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
      title="Launch New Service"
      subtitle="Introduce a new technical capability to your digital ecosystem. High-impact content will better resonate with your clients."
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
