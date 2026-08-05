export type TLicenseStatus = "ACTIVE" | "DUE" | "SUSPENDED";
export type TBillingCycle = "MONTHLY" | "ANNUAL" | "BIANNUAL" | "CUSTOM";

export interface TPaymentRecord {
  _id?: string;
  trxId?: string;
  amount: number;
  monthsExtended: number;
  paidAt: string;
  paymentMethod?: string;
  notes?: string;
}

export interface ILicense {
  _id: string;
  clientName: string;
  clientDomain: string;
  clientEmail: string;
  apiKey: string;
  billingCycle: TBillingCycle;
  billingMonths: number;
  monthlyFee: number;
  status: TLicenseStatus;
  dueDate: string;
  lastPaymentTrxId?: string;
  lastPaymentSubmittedAt?: string;
  notes?: string;
  paymentHistory?: TPaymentRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreateLicenseInput {
  clientName: string;
  clientDomain: string;
  clientEmail: string;
  monthlyFee: number;
  billingCycle?: TBillingCycle;
  billingMonths?: number;
  dueDate: string;
  notes?: string;
}

export interface IUpdateLicenseInput {
  clientName?: string;
  clientDomain?: string;
  clientEmail?: string;
  monthlyFee?: number;
  billingCycle?: TBillingCycle;
  billingMonths?: number;
  dueDate?: string;
  status?: TLicenseStatus;
  notes?: string;
}

export interface IRecordPaymentInput {
  amount?: number;
  trxId?: string;
  monthsExtended?: number;
  paymentMethod?: string;
  notes?: string;
}

export interface IExtendLicenseInput {
  months?: number;
  newDueDate?: string;
}

export interface IClientBillsSummary {
  totalRevenueCollected: number;
  totalPendingDues: number;
  activeSubscriptions: number;
  paymentsPendingApproval: number;
  licenses: ILicense[];
}
