"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ILicense } from "@/services/License/license.interface";
import { IMeta } from "@/types";
import { Plus } from "lucide-react";
import TablePagination from "@/components/common/pagination/TablePagination";
import LicenseTable from "./LicenseTable";
import LicenseFormModal from "./LicenseFormModal";
import ApproveModal from "./ApproveModal";
import ExtendLicenseModal from "./ExtendLicenseModal";
import RecordPaymentModal from "./RecordPaymentModal";
import PaymentHistoryModal from "./PaymentHistoryModal";

interface LicensesListProps {
  licenses: ILicense[];
  meta?: IMeta;
}

export const LicensesList: React.FC<LicensesListProps> = ({
  licenses,
  meta,
}) => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<ILicense | null>(null);
  const [approvingLicense, setApprovingLicense] = useState<ILicense | null>(
    null,
  );
  const [extendingLicense, setExtendingLicense] = useState<ILicense | null>(
    null,
  );
  const [recordingPaymentLicense, setRecordingPaymentLicense] =
    useState<ILicense | null>(null);
  const [historyLicense, setHistoryLicense] = useState<ILicense | null>(null);

  const handleEdit = (lic: ILicense) => {
    setSelectedLicense(lic);
    setIsFormModalOpen(true);
  };

  const handleApprove = (lic: ILicense) => {
    setApprovingLicense(lic);
  };

  const handleExtend = (lic: ILicense) => {
    setExtendingLicense(lic);
  };

  const handleRecordPayment = (lic: ILicense) => {
    setRecordingPaymentLicense(lic);
  };

  const handleViewHistory = (lic: ILicense) => {
    setHistoryLicense(lic);
  };

  const handleFormModalChange = (open: boolean) => {
    setIsFormModalOpen(open);
    if (!open) setSelectedLicense(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-xl border border-border shadow-xs">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Client Website Licenses
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage custom client maintenance fees, multi-year plans, bKash
            payments, and admin access locks.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setSelectedLicense(null);
              setIsFormModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition shadow-xs text-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4 shrink-0" /> Add Client Website
          </button>
        </div>
      </div>

      {/* License Table */}
      <LicenseTable
        licenses={licenses}
        onEdit={handleEdit}
        onApprove={handleApprove}
        onExtend={handleExtend}
        onRecordPayment={handleRecordPayment}
        onViewHistory={handleViewHistory}
      />

      {meta && <TablePagination meta={meta} />}

      {/* Form Modal (Add / Edit) */}
      <LicenseFormModal
        isOpen={isFormModalOpen}
        onOpenChange={handleFormModalChange}
        initialData={selectedLicense}
      />

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

export default LicensesList;
