"use client";

import { IQuotation } from "@/types/Quotation/quotation.types";
import { TableActionDropdown } from "@/components/common/table/TableActionDropdown";
import {
  deleteQuotation,
  sendQuotationEmailOrMobile,
} from "@/services/Quotation/quotation";
import { Download, Mail, Smartphone } from "lucide-react";
import { toast } from "sonner";

interface QuotationTableActionProps {
  row: IQuotation;
}

const QuotationTableAction = ({ row }: QuotationTableActionProps) => {
  const generatePDF = async () => {
    if (row.pdfUrl) {
      window.open(row.pdfUrl, "_blank");
      toast.success("PDF opened successfully!");
    } else {
      toast.error(
        "PDF is not available yet. Please wait or update the quotation.",
      );
    }
  };

  const handleSend = async (method: "email" | "mobile") => {
    const toastId = toast.loading(`Sending quotation via ${method}...`);
    try {
      const res = await sendQuotationEmailOrMobile(row._id, method);
      if (res.success) {
        toast.success(
          res.message || `Quotation sent successfully via ${method}`,
          { id: toastId },
        );
      } else {
        toast.error(res.message || `Failed to send quotation via ${method}`, {
          id: toastId,
        });
      }
    } catch (_error) {
      toast.error(`Failed to send quotation via ${method}`, { id: toastId });
    }
  };

  return (
    <>
      <TableActionDropdown
        editLink={`/admin/quotations/edit/${row._id}`}
        deleteAction={async () => deleteQuotation(row._id)}
        deleteConfirmMessage="Are you sure you want to delete this quotation?"
        deleteSuccessMessage="Quotation successfully removed."
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

export default QuotationTableAction;
