import AddPortfolioForm from "@/app/(dashboard)/admin/portfolios/_components/AddPortfolioForm";
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
