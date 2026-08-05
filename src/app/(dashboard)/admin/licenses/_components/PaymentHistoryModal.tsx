"use client";

import React from "react";
import { ILicense } from "@/services/License/license.interface";
import { History, X, CheckCircle2, Calendar } from "lucide-react";

interface PaymentHistoryModalProps {
  lic: ILicense | null;
  onOpenChange: (open: boolean) => void;
}

export const PaymentHistoryModal: React.FC<PaymentHistoryModalProps> = ({
  lic,
  onOpenChange,
}) => {
  if (!lic) return null;

  const history = lic.paymentHistory || [];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border p-6 rounded-2xl max-w-lg w-full shadow-2xl relative max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:bg-muted transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4 shrink-0">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Client Payment History
            </h2>
            <p className="text-xs text-muted-foreground">
              Client:{" "}
              <strong className="text-foreground">{lic.clientName}</strong> (
              {lic.clientDomain})
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-3 my-2">
          {history.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-border rounded-xl">
              <History className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium text-muted-foreground">
                No recorded payment history yet.
              </p>
            </div>
          ) : (
            history.map((record, index) => (
              <div
                key={record._id || index}
                className="bg-muted/30 border border-border/70 p-3.5 rounded-xl flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground">
                      {record.amount} BDT
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/50 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Paid
                    </span>
                  </div>
                  {record.trxId && (
                    <div className="font-mono text-muted-foreground">
                      TrxID:{" "}
                      <span className="font-semibold text-foreground">
                        {record.trxId}
                      </span>
                    </div>
                  )}
                  {record.notes && (
                    <div className="text-muted-foreground italic">
                      &quot;{record.notes}&quot;
                    </div>
                  )}
                </div>

                <div className="text-right shrink-0 space-y-1">
                  <div className="text-muted-foreground inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-primary" />
                    {new Date(record.paidAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-[11px] font-medium text-foreground">
                    Extended +{record.monthsExtended} Mo (
                    {record.paymentMethod || "bKash"})
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-4 border-t border-border mt-auto shrink-0 flex justify-end">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 bg-muted text-foreground text-xs font-medium rounded-lg hover:bg-muted/80 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryModal;
