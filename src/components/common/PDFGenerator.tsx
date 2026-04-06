import React from "react";
import html2canvas from "html2canvas-pro";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { toast } from "sonner";

interface HTMLToPDFProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  fileName?: string;
  buttonLabel?: string;
}

export const HTMLToPDF = ({
  contentRef,
  fileName = "document.pdf",
  buttonLabel = "Download PDF",
}: HTMLToPDFProps) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generatePDF = async () => {
    if (!contentRef.current) return;
    setIsGenerating(true);

    try {
      // 1. Take snapshot using html2canvas
      const canvas = await html2canvas(contentRef.current, {
        scale: 2, // Higher resolution
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      // 2. Create PDF with pdf-lib
      const pdfDoc = await PDFDocument.create();
      
      const pngImage = await pdfDoc.embedPng(imgData);
      
      const imgDims = pngImage.scaleToFit(595.28, 841.89); // A4 Size at 72 PPI

      const page = pdfDoc.addPage([595.28, 841.89]);

      // Center the image if it doesn't take up the full height
      const x = (page.getWidth() / 2) - (imgDims.width / 2);
      const y = page.getHeight() - imgDims.height; // Top aligned

      page.drawImage(pngImage, {
        x,
        y: y > 0 ? y : 0,
        width: imgDims.width,
        height: imgDims.height,
      });

      // 3. Open the PDF in a new tab/window
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      const newWindow = window.open(url, "_blank");
      
      if (!newWindow) {
        // Fallback for popup blockers
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      // Clean up the URL object after a short delay to ensure it loads
      setTimeout(() => URL.revokeObjectURL(url), 10000);

      toast.success("PDF generated successfully!");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={generatePDF} disabled={isGenerating} variant="outline">
      <DownloadIcon className="w-4 h-4 mr-2" />
      {isGenerating ? "Generating..." : buttonLabel}
    </Button>
  );
};
