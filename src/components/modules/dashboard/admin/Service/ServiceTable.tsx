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

  const handleDelete = async (slug: string) => {
    return await deleteService(slug);
  };

  const columns = ServiceTableColumns(handleDelete);

  return (
    <TableManageMent
      columns={columns as Column<unknown>[]}
      data={services}
      getRowKey={(row: IService) => row._id}
      isRefreshing={isPending}
      emptyMessage="No services found."
    />
  );
};

export default ServiceTable;
