import { getPortfolios } from "@/services/Portfolio/portfolios";
import ProjectTable from "@/components/modules/dashboard/admin/Portfolio/ProjectTable";
import TableWrapper from "@/components/common/wrapper/TableWrapper";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function PortfoliosList({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const res = await getPortfolios(searchParams);
  const portfolios = res?.data || [];
  const meta = res?.meta;

  return (
    <TableWrapper
      title="Portfolios"
      description="Showcase your best work. Manage projects, categories, and featured status."
      meta={meta}
      action={
        <Link href="/admin/portfolios/add">
          <Button className="bg-primary hover:opacity-90 transition-all rounded-2xl h-11 px-6 font-bold shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)]">
            <Plus className="mr-2" size={20} />
            New Project
          </Button>
        </Link>
      }
    >
      <ProjectTable portfolios={portfolios} />
    </TableWrapper>
  );
}
