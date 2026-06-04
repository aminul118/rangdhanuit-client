"use client";

import { Column } from "@/components/common/table/TableManageMent";
import { IQuotation } from "@/types/Quotation/quotation.types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import QuotationTableAction from "./QuotationTableAction";

export const QuotationTableColumns = (): Column<IQuotation>[] => [
  {
    header: "Client Name",
    accessor: "clientName",
    sortKey: "clientName",
    className: "font-medium text-foreground",
  },
  {
    header: "Project",
    accessor: "projectName",
  },
  {
    header: "Total Cost",
    accessor: (row) => `BDT ${row.totalCost?.toLocaleString()}`,
    sortKey: "totalCost",
  },
  {
    header: "Status",
    accessor: (row) => {
      const getStatusColor = (status: string) => {
        switch (status) {
          case "DRAFT":
            return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
          case "SENT":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
          case "ACCEPTED":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
          case "REJECTED":
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };
      return (
        <Badge variant="outline" className={getStatusColor(row.status)}>
          {row.status}
        </Badge>
      );
    },
  },
  {
    header: "Created At",
    accessor: (row) =>
      row.createdAt ? format(new Date(row.createdAt), "dd MMM yyyy") : "N/A",
    sortKey: "createdAt",
  },
  {
    header: "Actions",
    className: "text-right",
    accessor: (row: IQuotation) => {
      return (
        <div className="text-right">
          <QuotationTableAction row={row} />
        </div>
      );
    },
  },
];
