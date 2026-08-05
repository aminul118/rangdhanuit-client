"use client";

import React, { useState } from "react";
import { ILicense } from "@/services/License/license.interface";
import { extendLicenseDuration } from "@/services/License/license";
import { Calendar, Clock, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

interface ExtendLicenseModalProps {
  lic: ILicense | null;
  onOpenChange: (open: boolean) => void;
}

export const ExtendLicenseModal: React.FC<ExtendLicenseModalProps> = ({
  lic,
  onOpenChange,
}) => {
  const [selectedMonths, setSelectedMonths] = useState<number>(1);
  const [customDate, setCustomDate] = useState<string>("");
  const [isCustomDate, setIsCustomDate] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  if (!lic) return null;

  const currentDueDate = new Date(lic.dueDate);
  const formattedCurrentDue = currentDueDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleExtend = async () => {
    setLoading(true);
    try {
      let res;
      if (isCustomDate && customDate) {
        res = await extendLicenseDuration(lic._id, { newDueDate: customDate });
      } else {
        res = await extendLicenseDuration(lic._id, { months: selectedMonths });
      }

      if (res?.success) {
        toast.success(`License for ${lic.clientName} successfully extended!`);
        onOpenChange(false);
      } else {
        toast.error(res?.message || "Failed to extend license");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to extend license duration");
    } finally {
      setLoading(false);
    }
  };

  const presetDurations = [
    { months: 1, label: "1 Month", sub: "Monthly" },
    { months: 3, label: "3 Months", sub: "Quarterly" },
    { months: 6, label: "6 Months", sub: "Half Year" },
    { months: 12, label: "12 Months", sub: "1 Year" },
    { months: 24, label: "24 Months", sub: "2 Years" },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border p-6 rounded-2xl max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:bg-muted transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Extend License Expiration
            </h2>
            <p className="text-xs text-muted-foreground">
              Client:{" "}
              <strong className="text-foreground">{lic.clientName}</strong> (
              {lic.clientDomain})
            </p>
          </div>
        </div>

        <div className="bg-muted/40 border border-border/60 p-3.5 rounded-xl mb-5 flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-medium flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" /> Current Expiration
            Date:
          </span>
          <span className="font-bold text-foreground font-mono bg-background px-2.5 py-1 rounded border border-border">
            {formattedCurrentDue}
          </span>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-semibold text-foreground">
            Select Extension Duration:
          </label>

          <div className="grid grid-cols-3 gap-2.5">
            {presetDurations.map((item) => (
              <button
                key={item.months}
                type="button"
                onClick={() => {
                  setIsCustomDate(false);
                  setSelectedMonths(item.months);
                }}
                className={`p-3 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-0.5 ${
                  !isCustomDate && selectedMonths === item.months
                    ? "border-primary bg-primary/10 text-primary shadow-xs ring-1 ring-primary"
                    : "border-border/80 hover:bg-muted/80 text-foreground"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] font-normal text-muted-foreground">
                  {item.sub}
                </span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => setIsCustomDate(true)}
              className={`p-3 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center gap-0.5 ${
                isCustomDate
                  ? "border-primary bg-primary/10 text-primary shadow-xs ring-1 ring-primary"
                  : "border-border/80 hover:bg-muted/80 text-foreground"
              }`}
            >
              <span>Custom Date</span>
              <span className="text-[10px] font-normal text-muted-foreground">
                Pick Date
              </span>
            </button>
          </div>

          {isCustomDate && (
            <div className="pt-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Select Exact Expiration Date:
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-border mt-6">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 bg-muted text-foreground text-xs font-medium rounded-lg hover:bg-muted/80 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExtend}
            disabled={loading || (isCustomDate && !customDate)}
            className="px-5 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:opacity-90 transition inline-flex items-center gap-1.5 shadow-xs disabled:opacity-50"
          >
            <Clock className="w-3.5 h-3.5" />
            {loading
              ? "Extending..."
              : isCustomDate
                ? "Extend to Custom Date"
                : `Extend Access (+${selectedMonths} Mo)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtendLicenseModal;
