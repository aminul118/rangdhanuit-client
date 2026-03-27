import { getPortfolios } from "@/services/Portfolio/portfolios";
import { Metadata } from "next";
import Link from "next/link";
import ProjectTable from "@/components/modules/dashboard/admin/PortfolioAdmin/ProjectTable";
import TableWrapper from "@/components/common/wrapper/TableWrapper";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Manage Portfolios | Admin",
};

const PortfoliosAdminPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const params = await searchParams;
  const res = await getPortfolios(params);
  const portfolios = res?.data?.result || [];
  const meta = res?.data?.meta;

  return (
    <div className="min-h-[calc(100vh-80px)] p-6">
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
    </div>
  );
};

export default PortfoliosAdminPage;
