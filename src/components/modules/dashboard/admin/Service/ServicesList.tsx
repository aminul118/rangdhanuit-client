import { getServices } from "@/services/Service/services";
import ServiceTable from "./ServiceTable";
import TableWrapper from "@/components/common/wrapper/TableWrapper";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function ServicesList({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const res = await getServices(searchParams);
  const services = res?.data || [];
  const meta = res?.meta;

  return (
    <TableWrapper
      title="Services Management"
      description="Define and refine your core offerings. Every service added here will be showcased to your potential clients with premium details."
      meta={meta}
      action={
        <Link href="/admin/services/add">
          <Button className="bg-primary hover:opacity-90 transition-all rounded-2xl h-12 px-8 font-bold shadow-[0_0_30px_-5px_rgba(var(--primary),0.6)] group">
            <Sparkles className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
            Create New Service
          </Button>
        </Link>
      }
    >
      <ServiceTable services={services} />
    </TableWrapper>
  );
}
