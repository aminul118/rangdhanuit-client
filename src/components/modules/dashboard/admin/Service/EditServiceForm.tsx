"use client";

import { getServiceBySlug, updateServiceBySlug } from "@/services/Service/services";
import ServiceForm from "./ServiceForm";
import useActionHandler from "@/hooks/useActionHandler";
import { IService } from "@/types";
import { EditFormWrapper } from "@/components/common/layouts/EditFormWrapper";

interface EditServiceFormProps {
  slug: string;
  initialData?: IService;
}

const EditServiceForm = ({ slug, initialData }: EditServiceFormProps) => {
  const { executePost, isPending } = useActionHandler();

  const handleUpdate = async (formData: FormData) => {
    await executePost({
      action: () => updateServiceBySlug(slug, formData),
      success: {
        message: "Service refined! Changes are now reflecting on the main portal.",
        redirectPath: "/admin/services",
        isRefresh: true,
      },
    });
  };

  return (
    <EditFormWrapper<IService>
      id={slug}
      initialData={initialData}
      fetcher={getServiceBySlug}
      title={initialData ? `Refine ${initialData.title}` : "Refine Service"}
      subtitle="Ensure your service descriptions are accurate and compelling. High-quality details increase client trust."
      backLink="/admin/services"
    >
      {(service: IService) => (
        <ServiceForm 
          onSubmit={handleUpdate} 
          loading={isPending} 
          submitLabel="Update Service" 
          initialData={service}
        />
      )}
    </EditFormWrapper>
  );
};

export default EditServiceForm;
