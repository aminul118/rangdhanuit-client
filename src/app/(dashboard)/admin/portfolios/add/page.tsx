import AddPortfolioForm from "@/components/modules/dashboard/admin/PortfolioAdmin/AddPortfolioForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Portfolio | Admin",
};

const AddPortfolioPage = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Add New <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Project</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Showcase your latest work with a beautiful presentation. Fill in the details below to publish a new project.
        </p>
      </div>
      <AddPortfolioForm />
    </div>
  );
};

export default AddPortfolioPage;
