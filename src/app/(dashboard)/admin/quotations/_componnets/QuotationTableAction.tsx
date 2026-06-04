"use client";

import { useRef } from "react";
import { IQuotation } from "@/types/Quotation/quotation.types";
import { TableActionDropdown } from "@/components/common/table/TableActionDropdown";
import { deleteQuotation } from "@/services/Quotation/quotation";
import { QuotationTemplate } from "./QuotationTemplate";
import { DownloadCloud } from "lucide-react";
import html2canvas from "html2canvas-pro";
import { PDFDocument } from "pdf-lib";
import { toast } from "sonner";

interface QuotationTableActionProps {
  row: IQuotation;
}

const QuotationTableAction = ({ row }: QuotationTableActionProps) => {
  const templateRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!templateRef.current) {
      toast.error("Template not ready. Please try again.");
      return;
    }

    const toastId = toast.loading("Generating Strategic Proposal PDF...");

    try {
      // 1. Take snapshot using html2canvas
      const canvas = await html2canvas(templateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      // 2. Create PDF with pdf-lib
      const pdfDoc = await PDFDocument.create();
      const pngImage = await pdfDoc.embedPng(imgData);
      const imgDims = pngImage.scaleToFit(595.28, 841.89); // A4 Size

      const page = pdfDoc.addPage([595.28, 841.89]);
      const x = page.getWidth() / 2 - imgDims.width / 2;
      const y = page.getHeight() - imgDims.height;

      page.drawImage(pngImage, {
        x,
        y: y > 0 ? y : 0,
        width: imgDims.width,
        height: imgDims.height,
      });

      // 3. Open the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);

      const newWindow = window.open(url, "_blank");
      if (!newWindow) {
        const link = document.createElement("a");
        link.href = url;
        link.download = `${row.projectName || "Proposal"}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setTimeout(() => URL.revokeObjectURL(url), 10000);
      toast.success("Proposal PDF generated successfully!", { id: toastId });
    } catch (error) {
      console.error("Failed to generate Proposal PDF:", error);
      toast.error("Failed to generate Proposal PDF", { id: toastId });
    }
  };

  return (
    <>
      <TableActionDropdown
        editLink={`/admin/quotations/edit/${row._id}`}
        deleteAction={async () => deleteQuotation(row._id)}
        deleteConfirmMessage="Are you sure you want to delete this strategic proposal?"
        deleteSuccessMessage="Proposal successfully removed."
        customItems={[
          {
            label: "Download PDF",
            icon: DownloadCloud,
            onClick: generatePDF,
            className: "focus:text-indigo-500 focus:bg-indigo-500/10",
          },
        ]}
      />
      {/* Hidden template specifically for this row's data */}
      <div className="fixed top-0 left-0 pointer-events-none z-[-100]">
        <QuotationTemplate data={row as any} templateRef={templateRef} />
      </div>
    </>
  );
};

export default QuotationTableAction;
