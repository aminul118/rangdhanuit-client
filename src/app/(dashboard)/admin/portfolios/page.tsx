import { Suspense } from "react";
import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { PortfoliosList } from "@/components/modules/dashboard/admin/Portfolio/PortfoliosList";
import { TableSkeleton } from "@/components/common/loader/TableSkeleton";

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
    <div className="min-h-[calc(100vh-80px)] p-6">
      <Suspense
        fallback={
          <TableSkeleton
            columns={[
              { width: "w-10" }, // SI
              { width: "w-16", className: "h-8 rounded-md" }, // Thumbnail
              { width: "w-full" }, // Title
              { width: "w-20" }, // Featured
              { width: "w-32" }, // Date
              { width: "w-10" }, // Actions
            ]}
          />
        }
      >
        <PortfoliosList searchParams={params} />
      </Suspense>
    </div>
  );
};

export default PortfoliosAdminPage;
