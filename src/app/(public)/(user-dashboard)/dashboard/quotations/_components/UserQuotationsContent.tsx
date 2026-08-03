"use client";

import { useState } from "react";
import { format } from "date-fns";
import { FileText, Download, Eye, FileSignature, Calendar } from "lucide-react";
import { IQuotation } from "@/types/Quotation/quotation.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserQuotationsContentProps {
  initialQuotations: IQuotation[];
}

export const UserQuotationsContent = ({
  initialQuotations,
}: UserQuotationsContentProps) => {
  const [quotations] = useState<IQuotation[]>(initialQuotations || []);

  const formatTk = (amount: number) =>
    new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" })
      .format(amount)
      .replace("BDT", "৳");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "SENT":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "REJECTED":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "DRAFT":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  if (!quotations || quotations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-card/40 backdrop-blur-sm border border-border/50 rounded-3xl">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <FileSignature size={40} className="text-primary opacity-80" />
        </div>
        <h2 className="text-2xl font-bold mb-3 tracking-tight">
          No Quotations Found
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          You don&apos;t have any quotations associated with your account yet.
          When you request a service or project, your quotations will appear
          here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Quotations</h1>
          <p className="text-muted-foreground mt-1">
            View and download your project quotations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotations.map((quotation) => (
          <div
            key={quotation._id}
            className="group relative bg-card/40 hover:bg-card/60 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={18} className="text-primary" />
                    <h3 className="font-bold text-lg tracking-tight">
                      {quotation.quotationNumber || "Quotation"}
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={14} className="mr-2 opacity-70" />
                    {format(new Date(quotation.issueDate), "MMM dd, yyyy")}
                  </div>
                </div>
                <Badge className={getStatusColor(quotation.status)}>
                  {quotation.status}
                </Badge>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-border/40">
                  <span className="text-sm text-muted-foreground">
                    Total Amount
                  </span>
                  <span className="font-bold text-lg">
                    {formatTk(quotation.total)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Client</span>
                  <span className="font-medium">{quotation.clientName}</span>
                </div>
                {quotation.validUntil && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Valid Until
                    </span>
                    <span className="font-medium text-amber-500">
                      {format(new Date(quotation.validUntil), "MMM dd, yyyy")}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                {quotation.pdfUrl && (
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl group-hover:border-primary/50 transition-colors"
                    onClick={() => window.open(quotation.pdfUrl, "_blank")}
                  >
                    <Eye size={16} className="mr-2" />
                    View PDF
                  </Button>
                )}
                {quotation.pdfUrl && (
                  <Button
                    className="flex-1 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white"
                    onClick={async () => {
                      try {
                        const res = await fetch(quotation.pdfUrl || "");
                        const blob = await res.blob();
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.style.display = "none";
                        link.href = url;
                        link.download = `Quotation_${quotation.quotationNumber}.pdf`;
                        document.body.appendChild(link);
                        link.click();
                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(link);
                      } catch (error) {
                        console.error("Failed to download PDF:", error);
                        window.open(quotation.pdfUrl, "_blank");
                      }
                    }}
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
