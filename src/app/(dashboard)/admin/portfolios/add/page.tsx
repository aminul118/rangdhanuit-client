import AddPortfolioForm from "@/components/modules/dashboard/admin/PortfolioAdmin/AddPortfolioForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Portfolio | Admin",
};

const AddPortfolioPage = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-foreground">
        Add New Project
      </h1>
      <AddPortfolioForm />
    </div>
  );
};

export default AddPortfolioPage;
