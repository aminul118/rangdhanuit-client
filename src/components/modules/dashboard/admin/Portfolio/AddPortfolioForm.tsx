"use client";

import { createPortfolio } from "@/services/Portfolio/portfolios";
import PortfolioForm from "./PortfolioForm";
import useActionHandler from "@/hooks/useActionHandler";
import FormLayout from "@/components/common/layouts/FormLayout";

const AddPortfolioForm = () => {
  const { executePost, isPending } = useActionHandler();

  const handleCreate = async (formData: FormData) => {
    await executePost({
      action: () => createPortfolio(formData),
      success: {
        message: "Portfolio item published! Your work is now live.",
        redirectPath: "/admin/portfolio",
        isRefresh: true,
      },
    });
  };

  return (
    <FormLayout
      title="Add New Project"
      subtitle="Showcase your latest achievements. High-quality details and visuals will help you stand out to potential clients."
      backLink="/admin/portfolio"
    >
      <PortfolioForm
        onSubmit={handleCreate}
        loading={isPending}
        submitLabel="Publish Project"
      />
    </FormLayout>
  );
};

export default AddPortfolioForm;
