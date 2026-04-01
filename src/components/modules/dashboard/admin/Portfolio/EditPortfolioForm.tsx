"use client";

import { getPortfolioById, updatePortfolio } from "@/services/Portfolio/portfolios";
import PortfolioForm from "./PortfolioForm";
import useActionHandler from "@/hooks/useActionHandler";
import { EditFormWrapper } from "@/components/common/layouts/EditFormWrapper";
import { IPortfolio } from "@/types";

const EditPortfolioForm = ({ id }: { id: string }) => {
  const { executePost, isPending } = useActionHandler();

  const handleUpdate = async (formData: FormData) => {
    await executePost({
      action: () => updatePortfolio(id, formData),
      success: {
        message: "Portfolio updated successfully!",
        redirectPath: "/admin/portfolios",
        isRefresh: true,
      },
    });
  };

  return (
    <EditFormWrapper<IPortfolio>
      id={id}
      fetcher={getPortfolioById}
      title="Edit Project Details"
      subtitle="Refine your project showcase with the latest details and high-quality imagery."
      backLink="/admin/portfolios"
      notFoundMessage="The project you looking for might have been removed or moved."
    >
      {(project: IPortfolio) => (
        <PortfolioForm
          key={project._id}
          initialData={project}
          onSubmit={handleUpdate}
          loading={isPending}
          submitLabel="Update Project"
        />
      )}
    </EditFormWrapper>
  );
};

export default EditPortfolioForm;
