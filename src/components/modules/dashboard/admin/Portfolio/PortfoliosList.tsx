import { getPortfolios } from "@/services/Portfolio/portfolios";
import ProjectTable from "@/components/modules/dashboard/admin/Portfolio/ProjectTable";
import { ManagementListWrapper } from "@/components/common/layouts/ManagementListWrapper";

export async function PortfoliosList({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const res = await getPortfolios(searchParams);
  const portfolios = res?.data || [];
  const meta = res?.meta;

  return (
    <ManagementListWrapper
      title="Portfolios"
      description="Showcase your best work. Manage projects, categories, and featured status."
      meta={meta}
      addBtn={{
        label: "New Project",
        link: "/admin/portfolios/add",
      }}
    >
      <ProjectTable portfolios={portfolios} />
    </ManagementListWrapper>
  );
}
