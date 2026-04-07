import { z } from "zod";

export const quotationSchemaZodValidation = z.object({
  clientName: z.string().min(1, "Client Name is required"),
  clientAddress: z.string().min(1, "Client Address is required"),
  clientEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  clientPhone: z.string().min(1, "Client Phone is required"),
  projectName: z.string().min(1, "Project Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  deliverables: z.string().min(1, "Deliverables are required"),
  startDate: z.date().optional().nullable(),
  endDate: z.date().optional().nullable(),
  totalCost: z.number().min(0),
  advancePercentage: z.number().min(0).max(100),
  midwayPercentage: z.number().min(0).max(100),
  completionPercentage: z.number().min(0).max(100),
  paymentMethod: z.string().min(1, "Payment Method is required"),
  revisions: z.number().min(0),
  supportDays: z.number().min(0),
});

export type QuotationFormValues = z.infer<typeof quotationSchemaZodValidation>;
