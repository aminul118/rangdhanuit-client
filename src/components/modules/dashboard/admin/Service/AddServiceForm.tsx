"use client";

import { createService } from "@/services/Service/services";
import ServiceForm from "./ServiceForm";
import CreationHeader from "@/components/common/wrapper/CreationHeader";
import useActionHandler from "@/hooks/useActionHandler";

const AddServiceForm = () => {
  const { executePost, isPending } = useActionHandler();

  const handleCreate = async (formData: FormData) => {
    await executePost({
       action: () => createService(formData),
       success: {
         message: "Service launched! Your new capability is now live.",
         redirectPath: "/admin/services",
         isRefresh: true
       }
    });
  };

  return (
    <div className="max-w-8xl mx-auto pb-32 px-4 md:px-0">
      <CreationHeader 
        title="Launch New Service"
        subtitle="Introduce a new technical capability to your digital ecosystem. High-impact content will better resonate with your clients."
        backLink="/admin/services"
      />
      
      <ServiceForm 
        onSubmit={handleCreate} 
        loading={isPending} 
        submitLabel="Launch Service" 
      />
    </div>
  );
};

export default AddServiceForm;
