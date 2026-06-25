export interface IInvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface IInstallment {
  installmentName: string;
  dueDate: Date | string;
  amount: number;
  status: "PENDING" | "PAID" | "OVERDUE";
}

export interface IInvoice {
  _id: string;
  quotationId?: string;
  clientName: string;
  clientEmail?: string;
  clientPhone: string;
  clientAddress?: string;
  projectStartTime?: string | Date;
  projectApproximateFinishTime?: string | Date;
  invoiceNumber: string;
  issueDate: string | Date;
  dueDate: string | Date;
  lineItems: IInvoiceLineItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  amountPaid?: number;
  balanceDue?: number;
  pdfUrl?: string;
  showBankDetails?: boolean;
  installments?: IInstallment[];
  payments?: {
    paymentDate: Date | string;
    amount: number;
    paymentType: string;
    notes?: string;
  }[];
  status: string;
  notes?: string;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}
