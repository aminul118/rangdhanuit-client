import { z } from "zod";

export const quotationLineItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Price cannot be negative"),
  total: z.number(),
});

export const quotationSchemaZodValidation = z.object({
  clientName: z.string().min(1, "Client Name is required"),
  clientEmail: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  clientPhone: z.string().min(1, "Client Phone is required"),
  clientAddress: z.string().optional().or(z.literal("")),
  projectStartTime: z.date().optional().nullable(),
  projectApproximateFinishTime: z.date().optional().nullable(),
  quotationNumber: z.string().optional(),
  issueDate: z.date({ message: "Issue Date is required" }),
  validUntil: z.date().optional().nullable(),
  status: z.enum(["DRAFT", "SENT", "ACCEPTED", "REJECTED"]).optional(),
  lineItems: z
    .array(quotationLineItemSchema)
    .min(1, "At least one line item is required"),
  subtotal: z.number().min(0),
  tax: z.number().min(0),
  discount: z.number().min(0),
  total: z.number().min(0),
  notes: z.string().optional().or(z.literal("")),
});

export type QuotationFormValues = z.infer<typeof quotationSchemaZodValidation>;
