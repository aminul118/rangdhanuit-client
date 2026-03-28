import EditPortfolioForm from "@/components/modules/dashboard/admin/PortfolioAdmin/EditPortfolioForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Project | Admin",
};

const EditPortfolioPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Edit <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Project</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Update your project details, images, and technologies to keep your portfolio up to date.
        </p>
      </div>
      <EditPortfolioForm id={id} />
    </div>
  );
};

export default EditPortfolioPage;
