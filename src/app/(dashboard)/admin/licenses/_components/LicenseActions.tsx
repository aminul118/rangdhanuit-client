"use client";

import { TableActionDropdown } from "@/components/common/table/TableActionDropdown";
import {
  deleteLicense,
  sendLicenseInvoiceEmail,
  updateLicense,
} from "@/services/License/license";
import { ILicense } from "@/services/License/license.interface";
import { Check, Edit, Mail, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface LicenseActionsProps {
  lic: ILicense;
  onEdit: (lic: ILicense) => void;
  onApprove: (lic: ILicense) => void;
}

const LicenseActions = ({ lic, onEdit, onApprove }: LicenseActionsProps) => {
  const handleSendEmail = async () => {
    try {
      const res = await sendLicenseInvoiceEmail(lic._id);
      if (res?.success) {
        toast.success(`Subscription invoice email sent to ${lic.clientName}!`);
      } else {
        toast.error(res?.message || "Failed to send email");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to send email notice");
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = lic.status === "SUSPENDED" ? "ACTIVE" : "SUSPENDED";
    try {
      const res = await updateLicense(lic._id, { status: newStatus as any });
      if (res?.success) {
        toast.success(`License status changed to ${newStatus}`);
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to update status");
    }
  };

  return (
    <TableActionDropdown
      deleteAction={async () => await deleteLicense(lic._id)}
      deleteConfirmMessage={`Are you sure you want to delete license for ${lic.clientName}?`}
      deleteSuccessMessage="License removed successfully."
      customItems={[
        {
          label: "Approve & Renew Access",
          onClick: () => onApprove(lic),
          icon: Check,
          className:
            "focus:text-emerald-500 focus:bg-emerald-500/10 font-semibold",
        },
        {
          label: "Send Email Invoice",
          onClick: handleSendEmail,
          icon: Mail,
          className: "focus:text-blue-500 focus:bg-blue-500/10",
        },
        {
          label: "Edit Details & Plan",
          onClick: () => onEdit(lic),
          icon: Edit,
          className: "focus:text-indigo-500 focus:bg-indigo-500/10",
        },
        {
          label:
            lic.status === "SUSPENDED" ? "Unblock Client" : "Suspend Access",
          onClick: handleToggleStatus,
          icon: RefreshCw,
          className: "focus:text-amber-500 focus:bg-amber-500/10",
        },
      ]}
    />
  );
};

export default LicenseActions;
