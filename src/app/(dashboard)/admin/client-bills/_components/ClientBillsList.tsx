"use client";

import React, { useState } from "react";
import {
  ILicense,
  IClientBillsSummary,
} from "@/services/License/license.interface";
import ApproveModal from "@/app/(dashboard)/admin/licenses/_components/ApproveModal";
import ExtendLicenseModal from "@/app/(dashboard)/admin/licenses/_components/ExtendLicenseModal";
import RecordPaymentModal from "@/app/(dashboard)/admin/licenses/_components/RecordPaymentModal";
import PaymentHistoryModal from "@/app/(dashboard)/admin/licenses/_components/PaymentHistoryModal";
import {
  DollarSign,
  Clock,
  ShieldCheck,
  Bell,
  Search,
  ExternalLink,
  CheckCircle2,
  ShieldAlert,
  Calendar,
  Check,
  CreditCard,
  History,
  Mail,
} from "lucide-react";
import { sendLicenseInvoiceEmail } from "@/services/License/license";
import { toast } from "sonner";

interface ClientBillsListProps {
  summary: IClientBillsSummary;
}

export const ClientBillsList: React.FC<ClientBillsListProps> = ({
  summary,
}) => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const [approvingLicense, setApprovingLicense] = useState<ILicense | null>(
    null,
  );
  const [extendingLicense, setExtendingLicense] = useState<ILicense | null>(
    null,
  );
  const [recordingPaymentLicense, setRecordingPaymentLicense] =
    useState<ILicense | null>(null);
  const [historyLicense, setHistoryLicense] = useState<ILicense | null>(null);

  const filteredLicenses = summary.licenses.filter((lic) => {
    const matchesSearch =
      lic.clientName.toLowerCase().includes(search.toLowerCase()) ||
      lic.clientDomain.toLowerCase().includes(search.toLowerCase()) ||
      lic.clientEmail.toLowerCase().includes(search.toLowerCase()) ||
      (lic.lastPaymentTrxId &&
        lic.lastPaymentTrxId.toLowerCase().includes(search.toLowerCase()));

    if (filterStatus === "PENDING_APPROVAL") {
      return matchesSearch && Boolean(lic.lastPaymentTrxId);
    }
    if (filterStatus !== "ALL") {
      return matchesSearch && lic.status === filterStatus;
    }
    return matchesSearch;
  });

  const handleSendEmail = async (lic: ILicense) => {
    try {
      const res = await sendLicenseInvoiceEmail(lic._id);
      if (res?.success) {
        toast.success(
          `Subscription bill invoice email sent to ${lic.clientName}!`,
        );
      } else {
        toast.error(res?.message || "Failed to send email");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to send email notice");
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-card p-6 rounded-xl border border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Client Bills & Subscription Payments
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track client website maintenance charges, review bKash payments,
            issue bill invoices, and extend active subscriptions.
          </p>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border/80 p-5 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Revenue Collected
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-foreground">
            {summary.totalRevenueCollected.toLocaleString()} BDT
          </div>
          <div className="text-xs text-muted-foreground">
            From approved client bill payments
          </div>
        </div>

        <div className="bg-card border border-border/80 p-5 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Pending Dues
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
            {summary.totalPendingDues.toLocaleString()} BDT
          </div>
          <div className="text-xs text-muted-foreground">
            Overdue or unpaid maintenance fees
          </div>
        </div>

        <div className="bg-card border border-border/80 p-5 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Active Subscriptions
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-foreground">
            {summary.activeSubscriptions}
          </div>
          <div className="text-xs text-muted-foreground">
            Active client website licenses
          </div>
        </div>

        <div className="bg-card border border-border/80 p-5 rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Pending Approvals
            </span>
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
              <Bell className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-pink-600 dark:text-pink-400">
            {summary.paymentsPendingApproval}
          </div>
          <div className="text-xs text-muted-foreground">
            Submitted bKash TrxIDs to verify
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-4 rounded-xl border border-border">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by client, domain, email, or TrxID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: "ALL", label: "All Bills" },
            { id: "PENDING_APPROVAL", label: "Pending Approval" },
            { id: "DUE", label: "Due" },
            { id: "SUSPENDED", label: "Suspended" },
            { id: "ACTIVE", label: "Active" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterStatus(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterStatus === f.id
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Client Bills Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b border-border text-xs uppercase text-muted-foreground font-semibold">
              <tr>
                <th className="px-4 py-3">Client / Domain</th>
                <th className="px-4 py-3">Plan / Fee</th>
                <th className="px-4 py-3">Due Date / Time Left</th>
                <th className="px-4 py-3">bKash TrxID</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Bill Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLicenses.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-muted-foreground text-sm"
                  >
                    No client bills found matching the current search/filter.
                  </td>
                </tr>
              ) : (
                filteredLicenses.map((lic) => {
                  const now = new Date();
                  const due = new Date(lic.dueDate);
                  const diffTime = due.getTime() - now.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                  let badge;
                  if (diffDays < 0) {
                    badge = (
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900">
                        Expired {Math.abs(diffDays)}d ago
                      </span>
                    );
                  } else if (diffDays <= 30) {
                    badge = (
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                        {diffDays} days left
                      </span>
                    );
                  } else {
                    const months = Math.floor(diffDays / 30);
                    badge = (
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                        {months}mo left
                      </span>
                    );
                  }

                  return (
                    <tr
                      key={lic._id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="font-semibold text-foreground">
                          {lic.clientName}
                        </div>
                        <a
                          href={`https://${lic.clientDomain}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {lic.clientDomain}{" "}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>

                      <td className="px-4 py-3 font-semibold text-foreground">
                        {lic.monthlyFee} BDT / mo
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-xs font-medium inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                          {due.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="mt-1">{badge}</div>
                      </td>

                      <td className="px-4 py-3">
                        {(() => {
                          const pendingTrx = lic.lastPaymentTrxId;
                          const lastVerifiedTrx =
                            lic.paymentHistory && lic.paymentHistory.length > 0
                              ? lic.paymentHistory[
                                  lic.paymentHistory.length - 1
                                ]?.trxId
                              : null;

                          if (pendingTrx) {
                            return (
                              <div className="space-y-1">
                                <span className="inline-block px-2.5 py-1 rounded bg-pink-100 dark:bg-pink-950/70 text-pink-700 dark:text-pink-300 font-mono font-bold text-xs border border-pink-300 dark:border-pink-800 animate-pulse">
                                  {pendingTrx}
                                </span>
                                <div className="text-[10px] text-pink-600 dark:text-pink-400 font-semibold">
                                  ⚠️ Pending Approval
                                </div>
                              </div>
                            );
                          }

                          if (lastVerifiedTrx) {
                            return (
                              <div className="space-y-1">
                                <span className="inline-block px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs border border-emerald-300 dark:border-emerald-800">
                                  {lastVerifiedTrx}
                                </span>
                                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                                  ✓ Verified Paid
                                </div>
                              </div>
                            );
                          }

                          return (
                            <span className="text-xs text-muted-foreground italic bg-muted px-2 py-0.5 rounded border border-border">
                              No TrxID
                            </span>
                          );
                        })()}
                      </td>

                      <td className="px-4 py-3">
                        {lic.status === "ACTIVE" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" /> Active
                          </span>
                        )}
                        {lic.status === "DUE" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                            <Clock className="w-3 h-3" /> Due
                          </span>
                        )}
                        {lic.status === "SUSPENDED" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                            <ShieldAlert className="w-3 h-3" /> Suspended
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <button
                            onClick={() => setApprovingLicense(lic)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold transition inline-flex items-center gap-1"
                            title="Approve Submitted bKash Payment & Extend Access"
                          >
                            <Check className="w-3 h-3" /> Approve
                          </button>

                          <button
                            onClick={() => setRecordingPaymentLicense(lic)}
                            className="px-2.5 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded text-xs font-semibold transition inline-flex items-center gap-1"
                            title="Record Bill Payment"
                          >
                            <CreditCard className="w-3 h-3" /> Record Bill
                          </button>

                          <button
                            onClick={() => setExtendingLicense(lic)}
                            className="px-2.5 py-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded text-xs font-semibold transition inline-flex items-center gap-1"
                            title="Extend Expiration Date"
                          >
                            <Clock className="w-3 h-3" /> Extend
                          </button>

                          <button
                            onClick={() => setHistoryLicense(lic)}
                            className="p-1.5 bg-muted hover:bg-muted/80 text-foreground rounded transition"
                            title="View Payment History"
                          >
                            <History className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleSendEmail(lic)}
                            className="p-1.5 bg-muted hover:bg-muted/80 text-foreground rounded transition"
                            title="Send Email Bill Invoice"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approval Modal */}
      <ApproveModal
        lic={approvingLicense}
        onOpenChange={(open) => {
          if (!open) setApprovingLicense(null);
        }}
      />

      {/* Extend License Modal */}
      <ExtendLicenseModal
        lic={extendingLicense}
        onOpenChange={(open) => {
          if (!open) setExtendingLicense(null);
        }}
      />

      {/* Record Payment Modal */}
      <RecordPaymentModal
        lic={recordingPaymentLicense}
        onOpenChange={(open) => {
          if (!open) setRecordingPaymentLicense(null);
        }}
      />

      {/* Payment History Modal */}
      <PaymentHistoryModal
        lic={historyLicense}
        onOpenChange={(open) => {
          if (!open) setHistoryLicense(null);
        }}
      />
    </div>
  );
};

export default ClientBillsList;
