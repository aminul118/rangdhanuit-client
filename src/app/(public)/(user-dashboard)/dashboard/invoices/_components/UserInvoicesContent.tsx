"use client";

import { useState } from "react";
import { format } from "date-fns";
import { FileText, Download, Eye, Receipt, Calendar } from "lucide-react";
import { IInvoice } from "@/types/Invoice/invoice.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserInvoicesContentProps {
  initialInvoices: IInvoice[];
}

export const UserInvoicesContent = ({
  initialInvoices,
}: UserInvoicesContentProps) => {
  const [invoices] = useState<IInvoice[]>(initialInvoices || []);

  const formatTk = (amount: number) =>
    new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" })
      .format(amount)
      .replace("BDT", "৳");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "PENDING":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "OVERDUE":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "CANCELLED":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getPaymentTypeBadge = (payments: any[]) => {
    if (!payments || payments.length === 0) return null;
    // Get the most recent payment type
    const latestPayment = payments[payments.length - 1];
    return (
      <Badge
        variant="outline"
        className="ml-2 bg-blue-500/10 text-blue-500 border-blue-500/20 font-medium"
      >
        {latestPayment.paymentType}
      </Badge>
    );
  };

  if (!invoices || invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-card/40 backdrop-blur-sm border border-border/50 rounded-3xl">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Receipt size={40} className="text-primary opacity-80" />
        </div>
        <h2 className="text-2xl font-bold mb-3 tracking-tight">
          No Invoices Found
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          You don't have any invoices associated with your account yet. When you
          request a service or project, your invoices will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Invoices</h1>
          <p className="text-muted-foreground mt-1">
            View and download your project invoices.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {invoices.map((invoice) => {
          const totalPaid =
            invoice.amountPaid ||
            invoice.payments?.reduce(
              (acc: number, curr: any) => acc + curr.amount,
              0,
            ) ||
            0;
          const balanceDue =
            invoice.balanceDue ?? Math.max(0, invoice.total - totalPaid);

          return (
            <div
              key={invoice._id}
              className="group relative bg-card/40 hover:bg-card/60 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText size={18} className="text-primary" />
                      <h3 className="font-bold text-lg tracking-tight">
                        {invoice.invoiceNumber || "Invoice"}
                      </h3>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar size={14} className="mr-2 opacity-70" />
                      {format(new Date(invoice.issueDate), "MMM dd, yyyy")}
                    </div>
                  </div>
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-4 border-b border-border/40">
                    <span className="text-sm text-muted-foreground">
                      Total Amount
                    </span>
                    <span className="font-bold text-lg">
                      {formatTk(invoice.total)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Amount Paid
                    </span>
                    <span className="font-medium text-emerald-500">
                      {formatTk(totalPaid)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Balance Due
                    </span>
                    <span className="font-medium text-amber-500">
                      {formatTk(balanceDue)}
                    </span>
                  </div>
                </div>

                {invoice.installments && invoice.installments.length > 0 ? (
                  <div className="mb-6 space-y-2 border-t border-border/40 pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                      Installment Schedule
                    </h4>
                    {invoice.installments.map((inst, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-700 dark:text-slate-300">
                            {inst.installmentName}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            ({format(new Date(inst.dueDate), "MMM dd, yyyy")})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">
                            {formatTk(inst.amount)}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-[10px] px-1.5 py-0 min-h-0 ${
                              inst.status === "PAID"
                                ? "border-emerald-500 text-emerald-500"
                                : inst.status === "OVERDUE"
                                  ? "border-red-500 text-red-500"
                                  : "border-amber-500 text-amber-500"
                            }`}
                          >
                            {inst.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center mb-6 min-h-[28px]">
                    {getPaymentTypeBadge(invoice.payments || [])}
                  </div>
                )}

                <div className="flex gap-3">
                  {invoice.pdfUrl && (
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl group-hover:border-primary/50 transition-colors"
                      onClick={() => window.open(invoice.pdfUrl, "_blank")}
                    >
                      <Eye size={16} className="mr-2" />
                      View PDF
                    </Button>
                  )}
                  {invoice.pdfUrl && (
                    <Button
                      className="flex-1 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white"
                      onClick={async () => {
                        try {
                          const res = await fetch(invoice.pdfUrl || "");
                          const blob = await res.blob();
                          const url = window.URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.style.display = "none";
                          link.href = url;
                          link.download = `Invoice_${invoice.invoiceNumber}.pdf`;
                          document.body.appendChild(link);
                          link.click();
                          window.URL.revokeObjectURL(url);
                          document.body.removeChild(link);
                        } catch (error) {
                          console.error("Failed to download PDF:", error);
                          window.open(invoice.pdfUrl, "_blank"); // fallback
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
          );
        })}
      </div>
    </div>
  );
};
