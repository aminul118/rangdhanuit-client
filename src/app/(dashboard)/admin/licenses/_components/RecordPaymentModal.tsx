"use client";

import React, { useState, useEffect } from "react";
import { ILicense } from "@/services/License/license.interface";
import { recordLicensePayment } from "@/services/License/license";
import { CreditCard, DollarSign, X } from "lucide-react";
import { toast } from "sonner";

interface RecordPaymentModalProps {
  lic: ILicense | null;
  onOpenChange: (open: boolean) => void;
}

export const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({
  lic,
  onOpenChange,
}) => {
  const [monthsExtended, setMonthsExtended] = useState<number>(1);
  const [amount, setAmount] = useState<number>(0);
  const [trxId, setTrxId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("bKash");
  const [notes, setNotes] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lic) {
      const defaultMonths = lic.billingMonths || 1;
      setMonthsExtended(defaultMonths);
      setAmount((lic.monthlyFee || 0) * defaultMonths);
      setTrxId(lic.lastPaymentTrxId || "");
      setNotes("");
    }
  }, [lic]);

  if (!lic) return null;

  const handleMonthsChange = (m: number) => {
    setMonthsExtended(m);
    setAmount((lic.monthlyFee || 0) * m);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await recordLicensePayment(lic._id, {
        amount,
        trxId: trxId.trim() || undefined,
        monthsExtended,
        paymentMethod,
        notes: notes.trim() || undefined,
      });

      if (res?.success) {
        toast.success(
          `Recorded ${amount} BDT bill payment for ${lic.clientName}!`,
        );
        onOpenChange(false);
      } else {
        toast.error(res?.message || "Failed to record payment");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to record payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border p-6 rounded-2xl max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:bg-muted transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Record Client Bill Payment
            </h2>
            <p className="text-xs text-muted-foreground">
              Client:{" "}
              <strong className="text-foreground">{lic.clientName}</strong> (
              {lic.clientDomain})
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Select Months to Clear:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 3, 6, 12].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleMonthsChange(m)}
                  className={`p-2.5 rounded-lg border text-xs font-bold transition ${
                    monthsExtended === m
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-muted text-foreground"
                  }`}
                >
                  {m} {m === 1 ? "Month" : "Months"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Payment Amount (BDT):
              </label>
              <input
                type="number"
                min={0}
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Payment Method:
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="bKash">bKash</option>
                <option value="Nagad">Nagad</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Transaction ID (Optional):
            </label>
            <input
              type="text"
              placeholder="e.g. BKS982347192"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Notes (Optional):
            </label>
            <input
              type="text"
              placeholder="e.g. Paid via bKash personal send money"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 bg-muted text-foreground text-xs font-medium rounded-lg hover:bg-muted/80 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition inline-flex items-center gap-1.5 shadow-xs disabled:opacity-50"
            >
              <DollarSign className="w-4 h-4" />
              {loading ? "Recording..." : `Confirm Payment (${amount} BDT)`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordPaymentModal;
