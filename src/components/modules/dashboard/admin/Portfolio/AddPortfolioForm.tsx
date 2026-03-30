"use client";
import { createPortfolio } from "@/services/Portfolio/portfolios";
import PortfolioForm from "./PortfolioForm";
import CreationHeader from "@/components/common/wrapper/CreationHeader";
import useActionHandler from "@/hooks/useActionHandler";

const AddPortfolioForm = () => {
  const { executePost, isPending } = useActionHandler();

  const handleCreate = async (formData: FormData) => {
    await executePost({
      action: () => createPortfolio(formData),
      success: {
        message: "Portfolio added successfully!",
        redirectPath: "/admin/portfolios",
        isRefresh: true,
      },
    });
  };

  return (
    <div className="max-w-8xl mx-auto pb-32 px-4 md:px-0">
      <CreationHeader
        title="Add New Project"
        subtitle="Showcase your latest work with a beautiful presentation. Fill in the details below to publish a new project."
        backLink="/admin/portfolios"
      />

      <PortfolioForm
        onSubmit={handleCreate}
        loading={isPending}
        submitLabel="Publish Project"
      />
    </div>
  );
};

export default AddPortfolioForm;
