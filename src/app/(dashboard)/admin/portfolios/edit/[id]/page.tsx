import EditPortfolioForm from "@/app/(dashboard)/admin/portfolios/_components/EditPortfolioForm";
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
      <EditPortfolioForm slug={id} />
    </div>
  );
};

export default EditPortfolioPage;
