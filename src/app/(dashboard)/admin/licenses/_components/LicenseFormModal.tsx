"use client";

import React, { useState, useEffect } from "react";
import {
  ILicense,
  ICreateLicenseInput,
  IUpdateLicenseInput,
  TBillingCycle,
} from "@/services/License/license.interface";
import { createLicense, updateLicense } from "@/services/License/license";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface LicenseFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: ILicense | null;
}

export const LicenseFormModal: React.FC<LicenseFormModalProps> = ({
  isOpen,
  onOpenChange,
  initialData,
}) => {
  const isEdit = !!initialData;
  const [loading, setLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [formData, setFormData] = useState<ICreateLicenseInput>({
    clientName: "",
    clientDomain: "",
    clientEmail: "",
    monthlyFee: 1000,
    billingCycle: "MONTHLY",
    billingMonths: 1,
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    notes: "",
  });

  const [editFormData, setEditFormData] = useState<IUpdateLicenseInput>({});

  useEffect(() => {
    if (initialData) {
      setEditFormData({
        clientName: initialData.clientName,
        clientDomain: initialData.clientDomain,
        clientEmail: initialData.clientEmail,
        monthlyFee: initialData.monthlyFee,
        billingCycle: initialData.billingCycle || "MONTHLY",
        billingMonths: initialData.billingMonths || 1,
        dueDate: new Date(initialData.dueDate).toISOString().split("T")[0],
        status: initialData.status,
        notes: initialData.notes || "",
      });
    } else {
      setFormData({
        clientName: "",
        clientDomain: "",
        clientEmail: "",
        monthlyFee: 1000,
        billingCycle: "MONTHLY",
        billingMonths: 1,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        notes: "",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleBillingCycleChange = (cycle: TBillingCycle) => {
    let months = 1;
    if (cycle === "ANNUAL") months = 12;
    if (cycle === "BIANNUAL") months = 24;

    const newDueDate = new Date();
    newDueDate.setMonth(newDueDate.getMonth() + months);
    const formattedDueDate = newDueDate.toISOString().split("T")[0];

    if (isEdit) {
      setEditFormData((prev) => ({
        ...prev,
        billingCycle: cycle,
        billingMonths: months,
        dueDate: formattedDueDate,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        billingCycle: cycle,
        billingMonths: months,
        dueDate: formattedDueDate,
      }));
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const dateStr = selectedDate.toISOString().split("T")[0];
    if (isEdit) {
      setEditFormData((prev) => ({ ...prev, dueDate: dateStr }));
    } else {
      setFormData((prev) => ({ ...prev, dueDate: dateStr }));
    }
    setCalendarOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit && initialData) {
        const res = await updateLicense(initialData._id, editFormData);
        if (res?.success) {
          toast.success("Client details & plan updated!");
          onOpenChange(false);
        } else {
          toast.error(res?.message || "Update failed");
        }
      } else {
        const res = await createLicense(formData);
        if (res?.success) {
          toast.success("Client project license generated successfully!");
          onOpenChange(false);
        } else {
          toast.error(res?.message || "Failed to create license");
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const currentDueDateStr = isEdit
    ? editFormData.dueDate || ""
    : formData.dueDate;
  const currentDueDateObj = currentDueDateStr
    ? parseISO(currentDueDateStr)
    : new Date();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border p-6 rounded-2xl max-w-lg w-full shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {isEdit
            ? `Edit Plan - ${initialData?.clientName}`
            : "Add Client Website License"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Client Name / Company
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Acme Corporation"
              value={
                isEdit ? editFormData.clientName || "" : formData.clientName
              }
              onChange={(e) =>
                isEdit
                  ? setEditFormData({
                      ...editFormData,
                      clientName: e.target.value,
                    })
                  : setFormData({ ...formData, clientName: e.target.value })
              }
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Client Domain (Without http/https)
            </label>
            <input
              type="text"
              required
              placeholder="e.g. clientwebsite.com"
              value={
                isEdit ? editFormData.clientDomain || "" : formData.clientDomain
              }
              onChange={(e) =>
                isEdit
                  ? setEditFormData({
                      ...editFormData,
                      clientDomain: e.target.value,
                    })
                  : setFormData({ ...formData, clientDomain: e.target.value })
              }
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Client Notification Email
            </label>
            <input
              type="email"
              required
              placeholder="e.g. admin@clientwebsite.com"
              value={
                isEdit ? editFormData.clientEmail || "" : formData.clientEmail
              }
              onChange={(e) =>
                isEdit
                  ? setEditFormData({
                      ...editFormData,
                      clientEmail: e.target.value,
                    })
                  : setFormData({ ...formData, clientEmail: e.target.value })
              }
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                Subscription Plan
              </label>
              <select
                value={
                  isEdit
                    ? editFormData.billingCycle || "MONTHLY"
                    : formData.billingCycle || "MONTHLY"
                }
                onChange={(e) =>
                  handleBillingCycleChange(e.target.value as TBillingCycle)
                }
                className="w-full px-3 py-2 bg-background border border-primary/50 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="MONTHLY">Monthly (1 Month)</option>
                <option value="ANNUAL">1 Year (12 Months)</option>
                <option value="BIANNUAL">2 Years (24 Months)</option>
                <option value="CUSTOM">Custom Months</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                Monthly Fee (BDT)
              </label>
              <input
                type="number"
                required
                min={0}
                placeholder="e.g. 1500"
                value={
                  isEdit ? (editFormData.monthlyFee ?? 0) : formData.monthlyFee
                }
                onChange={(e) =>
                  isEdit
                    ? setEditFormData({
                        ...editFormData,
                        monthlyFee: Number(e.target.value),
                      })
                    : setFormData({
                        ...formData,
                        monthlyFee: Number(e.target.value),
                      })
                }
                className="w-full px-3 py-2 bg-background border border-primary/50 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Duration (Months)
              </label>
              <input
                type="number"
                min={1}
                value={
                  isEdit
                    ? editFormData.billingMonths || 1
                    : formData.billingMonths || 1
                }
                onChange={(e) => {
                  const val = Number(e.target.value);
                  const d = new Date();
                  d.setMonth(d.getMonth() + val);
                  if (isEdit) {
                    setEditFormData({
                      ...editFormData,
                      billingMonths: val,
                      dueDate: d.toISOString().split("T")[0],
                    });
                  } else {
                    setFormData({
                      ...formData,
                      billingMonths: val,
                      dueDate: d.toISOString().split("T")[0],
                    });
                  }
                }}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* shadcn/ui Calendar Date Picker with dd MMM, yyyy Format */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Calculated Due Date
              </label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-left font-semibold text-sm h-[38px] rounded-lg px-3 bg-background border-border",
                      !currentDueDateStr && "text-muted-foreground",
                    )}
                  >
                    <span>
                      {currentDueDateStr
                        ? format(currentDueDateObj, "dd MMM, yyyy")
                        : "Pick a due date"}
                    </span>
                    <CalendarIcon className="h-4 w-4 opacity-50 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[60]" align="end">
                  <Calendar
                    mode="single"
                    selected={currentDueDateObj}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 bg-muted text-xs font-medium rounded-lg hover:bg-muted/80 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition shadow-md shadow-primary/20"
            >
              {loading
                ? "Saving..."
                : isEdit
                  ? "Update Plan"
                  : "Generate License Key"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LicenseFormModal;
