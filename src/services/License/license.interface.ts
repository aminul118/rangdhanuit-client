export type TLicenseStatus = "ACTIVE" | "DUE" | "SUSPENDED";
export type TBillingCycle = "MONTHLY" | "ANNUAL" | "BIANNUAL" | "CUSTOM";

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
