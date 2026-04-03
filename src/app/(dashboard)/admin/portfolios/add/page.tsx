import AddPortfolioForm from "@/components/modules/dashboard/admin/Portfolio/AddPortfolioForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Portfolio | Admin",
};

const AddPortfolioPage = () => {
  return (
    <div>
      <AddPortfolioForm />
    </div>
  );
};

export default AddPortfolioPage;
