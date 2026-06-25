"use client";

import { useRef } from "react";
import { IInvoice } from "@/types/Invoice/invoice.types";
import { TableActionDropdown } from "@/components/common/table/TableActionDropdown";
import {
  deleteInvoice,
  sendInvoiceEmailOrMobile,
} from "@/services/Invoice/invoice";
import { Download, Mail, Smartphone } from "lucide-react";
import { toast } from "sonner";

interface InvoiceTableActionProps {
  row: IInvoice;
}

const InvoiceTableAction = ({ row }: InvoiceTableActionProps) => {
  const templateRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (row.pdfUrl) {
      window.open(row.pdfUrl, "_blank");
      toast.success("PDF opened successfully!");
    } else {
      toast.error(
        "PDF is not available yet. Please wait or update the invoice.",
      );
    }
  };

  const handleSend = async (method: "email" | "mobile") => {
    const toastId = toast.loading(`Sending invoice via ${method}...`);
    try {
      await sendInvoiceEmailOrMobile(row._id, method);
      toast.success(`Invoice sent successfully via ${method}`, { id: toastId });
    } catch (error) {
      toast.error(`Failed to send invoice via ${method}`, { id: toastId });
    }
  };

  return (
    <>
      <TableActionDropdown
        editLink={`/admin/invoices/edit/${row._id}`}
        deleteAction={async () => deleteInvoice(row._id)}
        deleteConfirmMessage="Are you sure you want to delete this invoice?"
        deleteSuccessMessage="Invoice successfully removed."
        customItems={[
          {
            label: "Send via Email",
            icon: Mail,
            onClick: () => handleSend("email"),
            className: "focus:text-blue-500 focus:bg-blue-500/10",
          },
          {
            label: "Send via Mobile",
            icon: Smartphone,
            onClick: () => handleSend("mobile"),
            className: "focus:text-green-500 focus:bg-green-500/10",
          },
          {
            label: "Download PDF",
            icon: Download,
            onClick: generatePDF,
            className: "focus:text-indigo-500 focus:bg-indigo-500/10",
          },
        ]}
      />
    </>
  );
};

export default InvoiceTableAction;
