"use client";

import { useTransition } from "react";
import { IService } from "@/types/Service/service.types";
import { ServiceTableColumns } from "./ServiceTableColumn";
import { deleteService } from "@/services/Service/services";
import { toast } from "sonner";
import TableManageMent, { Column } from "@/components/common/table/TableManageMent";

interface ServiceTableProps {
  services: IService[];
}

const ServiceTable = ({ services }: ServiceTableProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    startTransition(async () => {
      const res = await deleteService(id);
      if (res.success) {
        toast.success("Service deleted successfully!");
      } else {
        toast.error(res.message || "Failed to delete service.");
      }
    });
  };

  const columns = ServiceTableColumns(handleDelete);

  return (
    <div className="relative group/table">
       <div className="absolute inset-0 bg-linear-to-b from-indigo-500/5 to-transparent opacity-0 group-hover/table:opacity-100 transition-opacity rounded-3xl" />
       <TableManageMent
        columns={columns as Column<unknown>[]}
        data={services}
        getRowKey={(row: IService) => row._id}
        isRefreshing={isPending}
      />
    </div>
  );
};

export default ServiceTable;
