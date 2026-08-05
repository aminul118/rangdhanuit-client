"use client";

import React, { useState } from "react";
import { ILicense } from "@/services/License/license.interface";
import { approveLicensePayment } from "@/services/License/license";
import { toast } from "sonner";

interface ApproveModalProps {
  lic: ILicense | null;
  onOpenChange: (open: boolean) => void;
}

export const ApproveModal: React.FC<ApproveModalProps> = ({
  lic,
  onOpenChange,
}) => {
  const [approvalMonths, setApprovalMonths] = useState<number>(
    lic?.billingMonths || 1,
  );
  const [loading, setLoading] = useState(false);

  if (!lic) return null;

  const handleConfirmApproval = async () => {
    setLoading(true);
    try {
      const res = await approveLicensePayment(lic._id, approvalMonths);
      if (res?.success) {
        toast.success(
          `Payment approved! Subscription extended by ${approvalMonths} month(s).`,
        );
        onOpenChange(false);
      } else {
        toast.error(res?.message || "Approval failed");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to approve payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border p-6 rounded-2xl max-w-md w-full shadow-xl">
        <h2 className="text-xl font-bold mb-2">
          Approve Payment & Extend Access
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Client: <strong>{lic.clientName}</strong> ({lic.clientDomain})
        </p>

        {lic.lastPaymentTrxId ? (
          <div className="bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900 p-3.5 rounded-xl text-xs text-pink-800 dark:text-pink-300 mb-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                Submitted bKash TrxID
              </div>
              <strong className="font-mono text-base font-bold text-pink-700 dark:text-pink-200">
                {lic.lastPaymentTrxId}
              </strong>
            </div>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(lic.lastPaymentTrxId!);
                toast.success("TrxID copied to clipboard!");
              }}
              className="px-2.5 py-1 bg-pink-200 dark:bg-pink-900 text-pink-800 dark:text-pink-100 rounded-lg text-xs font-bold hover:opacity-90 transition"
            >
              Copy TrxID
            </button>
          </div>
        ) : (
          <div className="bg-muted p-3.5 rounded-xl text-xs text-muted-foreground mb-4">
            No pending TrxID submitted. Click confirm to extend access manually.
          </div>
        )}

        <div className="space-y-3">
          <label className="block text-xs font-semibold text-foreground">
            Select Duration to Extend Access:
          </label>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setApprovalMonths(1)}
              className={`p-3 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
                approvalMonths === 1
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:bg-muted"
              }`}
            >
              <span>1 Month</span>
              <span className="text-[10px] font-normal opacity-80">
                Monthly
              </span>
            </button>

            <button
              type="button"
              onClick={() => setApprovalMonths(12)}
              className={`p-3 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
                approvalMonths === 12
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:bg-muted"
              }`}
            >
              <span>12 Months</span>
              <span className="text-[10px] font-normal opacity-80">1 Year</span>
            </button>

            <button
              type="button"
              onClick={() => setApprovalMonths(24)}
              className={`p-3 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
                approvalMonths === 24
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:bg-muted"
              }`}
            >
              <span>24 Months</span>
              <span className="text-[10px] font-normal opacity-80">
                2 Years
              </span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mt-2 mb-1">
              Or Custom Duration (Months):
            </label>
            <input
              type="number"
              min={1}
              value={approvalMonths}
              onChange={(e) => setApprovalMonths(Number(e.target.value))}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 bg-muted text-xs font-medium rounded-lg hover:bg-muted/80 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmApproval}
            disabled={loading}
            className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition"
          >
            {loading
              ? "Approving..."
              : `Confirm Approval (+${approvalMonths} Months)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;
