"use client";

import { useTransition } from "react";
import { IService } from "@/types/Service/service.types";
import { ServiceTableColumns } from "./ServiceTableColumn";
import { deleteService } from "@/services/Service/services";
import TableManageMent, { Column } from "@/components/common/table/TableManageMent";

interface ServiceTableProps {
  services: IService[];
}

const ServiceTable = ({ services }: ServiceTableProps) => {
  const [isPending] = useTransition();

  const handleDelete = async (id: string) => {
    return await deleteService(id);
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
