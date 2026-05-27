import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { PortfoliosList } from "@/components/modules/dashboard/admin/Portfolio/PortfoliosList";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";

export const metadata: Metadata = {
  title: "Manage Portfolios | Admin",
};

const PortfoliosAdminPage = async (props: {
  searchParams: Promise<TSearchParamsPromise>;
}) => {
  const searchParams = await props.searchParams;
  const params = (await searchParams) as Record<string, string>;

  return (
    <AdminPageWrapper>
      <PortfoliosList searchParams={params} />
    </AdminPageWrapper>
  );
};

export default PortfoliosAdminPage;
