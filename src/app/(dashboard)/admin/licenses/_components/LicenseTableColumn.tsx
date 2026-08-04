import { Column } from "@/components/common/table/TableManageMent";
import { ILicense } from "@/services/License/license.interface";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Key,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";
import LicenseActions from "./LicenseActions";

const handleCopyKey = (key: string) => {
  navigator.clipboard.writeText(key);
  toast.success("API License Key copied to clipboard!");
};

const getLicenseTableColumns = (
  onEdit: (lic: ILicense) => void,
  onApprove: (lic: ILicense) => void,
): Column<ILicense>[] => [
  {
    header: "SI",
    accessor: (_, i) => i + 1,
    className: "w-12 text-center",
  },
  {
    header: "Client / Domain",
    accessor: (lic) => (
      <div className="space-y-0.5">
        <div className="font-semibold text-foreground">{lic.clientName}</div>
        <a
          href={`https://${lic.clientDomain}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-primary hover:underline inline-flex items-center gap-1"
        >
          {lic.clientDomain} <ExternalLink className="w-3 h-3" />
        </a>
        <div className="text-xs text-muted-foreground">{lic.clientEmail}</div>
      </div>
    ),
    sortKey: "clientName",
    className: "min-w-[200px]",
  },
  {
    header: "API Key",
    accessor: (lic) => (
      <button
        onClick={() => handleCopyKey(lic.apiKey)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-muted hover:bg-muted/80 font-mono text-xs text-muted-foreground hover:text-foreground transition border border-border/50"
        title="Click to copy API Key"
      >
        <Key className="w-3 h-3 text-primary" />
        <span>{lic.apiKey.substring(0, 12)}...</span>
        <Copy className="w-3 h-3" />
      </button>
    ),
    className: "w-40",
  },
  {
    header: "Plan / Fee",
    accessor: (lic) => (
      <div>
        <div className="font-bold text-foreground">
          {lic.monthlyFee} BDT / mo
        </div>
        <div className="mt-1">
          {lic.billingCycle === "ANNUAL" && (
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200/50">
              1 Year (12 Mo)
            </span>
          )}
          {lic.billingCycle === "BIANNUAL" && (
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/50">
              2 Years (24 Mo)
            </span>
          )}
          {lic.billingCycle === "MONTHLY" && (
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-muted text-muted-foreground">
              Monthly
            </span>
          )}
          {lic.billingCycle === "CUSTOM" && (
            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/50">
              Custom ({lic.billingMonths} Mo)
            </span>
          )}
        </div>
      </div>
    ),
    sortKey: "monthlyFee",
    className: "w-36",
  },
  {
    header: "Due Date",
    accessor: (lic) => (
      <div className="font-medium text-foreground inline-flex items-center gap-1.5 text-xs">
        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
        {new Date(lic.dueDate).toLocaleDateString()}
      </div>
    ),
    sortKey: "dueDate",
    className: "w-32",
  },
  {
    header: "bKash TrxID",
    accessor: (lic) =>
      lic.lastPaymentTrxId ? (
        <div className="space-y-1">
          <span className="inline-block px-2.5 py-0.5 rounded bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 font-mono font-bold text-xs border border-pink-200 dark:border-pink-800">
            {lic.lastPaymentTrxId}
          </span>
          {lic.lastPaymentSubmittedAt && (
            <div className="text-[11px] text-muted-foreground">
              {new Date(lic.lastPaymentSubmittedAt).toLocaleString()}
            </div>
          )}
        </div>
      ) : (
        <span className="text-xs text-muted-foreground italic">None</span>
      ),
    className: "w-36",
  },
  {
    header: "Status",
    accessor: (lic) => (
      <div>
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
      </div>
    ),
    sortKey: "status",
    className: "w-28",
  },
  {
    header: "Actions",
    accessor: (lic) => (
      <LicenseActions lic={lic} onEdit={onEdit} onApprove={onApprove} />
    ),
    className: "w-20 text-center",
  },
];

export default getLicenseTableColumns;
