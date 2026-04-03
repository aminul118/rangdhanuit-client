import EditPortfolioForm from "@/components/modules/dashboard/admin/Portfolio/EditPortfolioForm";
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
    <div>
      <EditPortfolioForm id={id} />
    </div>
  );
};

export default EditPortfolioPage;
