import { getServices } from "@/services/Service/services";
import ServiceTable from "./ServiceTable";
import { ManagementListWrapper } from "@/components/common/layouts/ManagementListWrapper";
import { Sparkles } from "lucide-react";

export async function ServicesList({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const res = await getServices(searchParams);
  const services = res?.data || [];
  const meta = res?.meta;

  return (
    <ManagementListWrapper
      title="Services Management"
      description="Define and refine your core offerings. Every service added here will be showcased to your potential clients with premium details."
      meta={meta}
      addBtn={{
        label: "Create New Service",
        link: "/admin/services/add",
        icon: <Sparkles className="mr-2 group-hover:rotate-12 transition-transform" size={20} />,
      }}
    >
      <ServiceTable services={services} />
    </ManagementListWrapper>
  );
}
