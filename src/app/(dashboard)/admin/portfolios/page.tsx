import { Button } from "@/components/ui/button";
import { getPortfolios } from "@/services/Portfolio/portfolios";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import ProjectTable from "@/components/modules/dashboard/admin/PortfolioAdmin/ProjectTable";

export const metadata: Metadata = {
  title: "Manage Portfolios | Admin",
};

const PortfoliosAdminPage = async () => {
  const res = await getPortfolios();
  const portfolios = res?.data || [];

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-foreground">
          Portfolio Projects
        </h1>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/admin/portfolios/add">
            <Plus className="mr-2" /> Add Project
          </Link>
        </Button>
      </div>

      <ProjectTable portfolios={portfolios} />
    </div>
  );
};

export default PortfoliosAdminPage;
