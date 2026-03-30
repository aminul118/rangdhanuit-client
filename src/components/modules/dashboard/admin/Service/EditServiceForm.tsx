"use client";

import { updateService } from "@/services/Service/services";
import ServiceForm from "./ServiceForm";
import CreationHeader from "@/components/common/wrapper/CreationHeader";
import useActionHandler from "@/hooks/useActionHandler";
import { IService } from "@/types/Service/service.types";

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
    <div className="max-w-8xl mx-auto pb-32 px-4 md:px-0">
      <CreationHeader 
        title={`Refine ${initialData.title}`}
        subtitle="Ensure your service descriptions are accurate and compelling. High-quality details increase client trust."
        backLink="/admin/services"
      />
      
      <ServiceForm 
        onSubmit={handleUpdate} 
        loading={isPending} 
        submitLabel="Update Service" 
        initialData={initialData}
      />
    </div>
  );
};

export default EditServiceForm;
