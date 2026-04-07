export interface IInvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
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
  status: string;
  notes?: string;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}
