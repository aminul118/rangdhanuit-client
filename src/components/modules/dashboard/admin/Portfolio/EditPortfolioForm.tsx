"use client";

import { useEffect, useState } from "react";
import {
  getPortfolioById,
  updatePortfolio,
} from "@/services/Portfolio/portfolios";
import { IPortfolio } from "@/types";
import { Loader2 } from "lucide-react";
import PortfolioForm from "./PortfolioForm";
import CreationHeader from "@/components/common/wrapper/CreationHeader";
import useActionHandler from "@/hooks/useActionHandler";

const EditPortfolioForm = ({ id }: { id: string }) => {
  const [fetching, setFetching] = useState(true);
  const [project, setProject] = useState<IPortfolio | null>(null);
  const { executePost, isPending } = useActionHandler();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getPortfolioById(id);
        if (res.success) {
          setProject(res.data);
        }
      } catch {
        // Error handled in service or effect
      } finally {
        setFetching(false);
      }
    };
    fetchProject();
  }, [id]);

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

  if (fetching) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-indigo-500">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-32 glass-premium rounded-[3rem] border border-white/5 mx-auto max-w-4xl">
        <h2 className="text-3xl font-black tracking-tight text-white/90">
          Project not found
        </h2>
        <p className="text-zinc-500 mt-4 font-bold">
          The project you looking for might have been removed or moved.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto pb-32 px-4 md:px-0">
      <CreationHeader
        title="Edit Project Details"
        subtitle={`Currently updating "${project.title}". Modify the details below to keep your portfolio showcase up to date.`}
        backLink="/admin/portfolios"
      />

      <PortfolioForm
        key={project._id}
        initialData={project}
        onSubmit={handleUpdate}
        loading={isPending}
        submitLabel="Update Project"
      />
    </div>
  );
};

export default EditPortfolioForm;
