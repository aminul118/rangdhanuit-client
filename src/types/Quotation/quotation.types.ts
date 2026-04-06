export interface IQuotation {
  _id: string;
  clientName: string;
  clientAddress: string;
  clientEmail?: string;
  projectName: string;
  description: string;
  deliverables: string;
  startDate?: string | Date;
  endDate?: string | Date;
  totalCost: number;
  advancePercentage: number;
  midwayPercentage: number;
  completionPercentage: number;
  paymentMethod: string;
  revisions: number;
  supportDays: number;
  status: string;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}
