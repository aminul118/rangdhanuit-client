"use client";

import { useTransition } from "react";
import { IInvoice } from "@/types/Invoice/invoice.types";
import { InvoiceTableColumns } from "./InvoiceTableColumn";
import TableManageMent, {
  Column,
} from "@/components/common/table/TableManageMent";

interface InvoiceTableProps {
  invoices: IInvoice[];
}

const InvoiceTable = ({ invoices }: InvoiceTableProps) => {
  const [isPending] = useTransition();

  const columns = InvoiceTableColumns();

  return (
    <TableManageMent
      columns={columns as Column<unknown>[]}
      data={invoices}
      getRowKey={(row: IInvoice) => row._id}
      isRefreshing={isPending}
      emptyMessage="No invoices found."
    />
  );
};

export default InvoiceTable;
