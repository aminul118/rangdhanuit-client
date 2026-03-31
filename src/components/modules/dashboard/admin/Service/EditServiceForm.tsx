"use client";

import { updateService } from "@/services/Service/services";
import ServiceForm from "./ServiceForm";
import useActionHandler from "@/hooks/useActionHandler";
import { IService } from "@/types/Service/service.types";
import { EditFormWrapper } from "@/components/common/wrapper/EditFormWrapper";

interface EditServiceFormProps {
  id: string;
  initialData: IService;
}

const EditServiceForm = ({ id, initialData }: EditServiceFormProps) => {
  const { executePost, isPending } = useActionHandler();

  const handleUpdate = async (formData: FormData) => {
    await executePost({
       action: () => updateService(id, formData),
       success: {
         message: "Service refined! Changes are now reflecting on the main portal.",
         redirectPath: "/admin/services",
         isRefresh: true
       }
    });
  };

  return (
    <EditFormWrapper<IService>
      id={id}
      initialData={initialData}
      title={`Refine ${initialData.title}`}
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
