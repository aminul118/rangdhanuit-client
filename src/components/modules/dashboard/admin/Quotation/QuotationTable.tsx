"use client";

import { useTransition } from "react";
import { IQuotation } from "@/types/Quotation/quotation.types";
import { QuotationTableColumns } from "./QuotationTableColumn";
import TableManageMent, {
  Column,
} from "@/components/common/table/TableManageMent";

interface QuotationTableProps {
  quotations: IQuotation[];
}

const QuotationTable = ({ quotations }: QuotationTableProps) => {
  const [isPending] = useTransition();

  const columns = QuotationTableColumns();

  return (
    <TableManageMent
      columns={columns as Column<unknown>[]}
      data={quotations}
      getRowKey={(row: IQuotation) => row._id}
      isRefreshing={isPending}
      emptyMessage="No quotations found."
    />
  );
};

export default QuotationTable;
