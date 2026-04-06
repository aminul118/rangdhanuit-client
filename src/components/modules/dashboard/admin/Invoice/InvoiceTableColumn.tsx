"use client";

import { Column } from "@/components/common/table/TableManageMent";
import { IInvoice } from "@/types/Invoice/invoice.types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TableActionDropdown } from "@/components/common/table/TableActionDropdown";
import { deleteInvoice } from "@/services/Invoice/invoice";

export const InvoiceTableColumns = (): Column<IInvoice>[] => [
  {
    header: "Invoice #",
    accessor: "invoiceNumber",
    sortKey: "invoiceNumber",
    className: "font-medium text-foreground",
  },
  {
    header: "Client Name",
    accessor: "clientName",
    sortKey: "clientName",
  },
  {
    header: "Total Billed",
    accessor: (row) => `BDT ${row.total?.toLocaleString()}`,
    sortKey: "total",
  },
  {
    header: "Status",
    accessor: (row) => {
      const getStatusColor = (status: string) => {
        switch (status) {
          case "PENDING":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
          case "PAID":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
          case "OVERDUE":
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
          case "CANCELLED":
            return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
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
    header: "Due Date",
    accessor: (row) =>
      row.dueDate ? format(new Date(row.dueDate), "dd MMM yyyy") : "N/A",
    sortKey: "dueDate",
  },
  {
    header: "Actions",
    className: "text-right",
    accessor: (row: IInvoice) => {
      return (
        <div className="text-right">
          <TableActionDropdown
            editLink={`/admin/invoices/edit/${row._id}`}
            deleteAction={async () => deleteInvoice(row._id)}
            deleteConfirmMessage="Are you sure you want to delete this invoice?"
            deleteSuccessMessage="Invoice successfully removed."
          />
        </div>
      );
    },
  },
];
