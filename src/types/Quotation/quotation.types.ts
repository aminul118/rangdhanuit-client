export interface IQuotationLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface IQuotation {
  _id: string;
  clientName: string;
  clientEmail?: string;
  clientPhone: string;
  clientAddress?: string;
  projectStartTime?: string | Date;
  projectApproximateFinishTime?: string | Date;
  quotationNumber: string;
  issueDate: string | Date;
  validUntil?: string | Date;
  lineItems: IQuotationLineItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: string;
  notes?: string;
  pdfUrl?: string;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}
