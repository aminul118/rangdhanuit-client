import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { PortfoliosList } from "@/components/modules/dashboard/admin/Portfolio/PortfoliosList";
import { AdminPageWrapper } from "@/components/common/wrapper/AdminPageWrapper";

export const metadata: Metadata = {
  title: "Manage Portfolios | Admin",
};

const PortfoliosAdminPage = async ({
  searchParams,
}: {
  searchParams: TSearchParamsPromise;
}) => {
  const params = (await searchParams) as Record<string, string>;

  return (
    <AdminPageWrapper
      skeletonColumns={[
        { width: "w-10" }, // SI
        { width: "w-16", className: "h-8 rounded-md" } as any, // Thumbnail
        { width: "w-full" }, // Title
        { width: "w-20" }, // Featured
        { width: "w-32" }, // Date
        { width: "w-10" }, // Actions
      ]}
    >
      <PortfoliosList searchParams={params} />
    </AdminPageWrapper>
  );
};

export default PortfoliosAdminPage;
