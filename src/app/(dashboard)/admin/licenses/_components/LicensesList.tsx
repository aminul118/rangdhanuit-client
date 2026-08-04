"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ILicense } from "@/services/License/license.interface";
import { IMeta } from "@/types";
import { Plus, BookOpen } from "lucide-react";
import TablePagination from "@/components/common/pagination/TablePagination";
import LicenseTable from "./LicenseTable";
import LicenseFormModal from "./LicenseFormModal";
import ApproveModal from "./ApproveModal";

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

  const handleEdit = (lic: ILicense) => {
    setSelectedLicense(lic);
    setIsFormModalOpen(true);
  };

  const handleApprove = (lic: ILicense) => {
    setApprovingLicense(lic);
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
          <Link
            href="/admin/licenses/instructions"
            className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-lg transition text-sm border border-border/60 whitespace-nowrap"
          >
            <BookOpen className="w-4 h-4 text-primary shrink-0" /> Setup
            Instructions
          </Link>

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
    </div>
  );
};

export default LicensesList;
