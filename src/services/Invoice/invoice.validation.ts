import { z } from "zod";

export const invoiceLineItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Price cannot be negative"),
  total: z.number(),
});

export const installmentSchema = z.object({
  installmentName: z.string().min(1, "Installment Name is required"),
  dueDate: z.date({ message: "Due Date is required" }),
  amount: z.number().min(0, "Amount cannot be negative"),
  status: z.enum(["PENDING", "PAID", "OVERDUE"]),
});

export const paymentSchema = z.object({
  amount: z.number().min(0),
  paymentDate: z.date(),
  paymentType: z.enum([
    "1st Installment",
    "2nd Installment",
    "Partial Payment",
    "Full Payment",
    "Others",
  ]),
  notes: z.string().optional(),
});

export const invoiceSchemaZodValidation = z.object({
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
  invoiceNumber: z.string().min(1, "Invoice Number is required"),
  issueDate: z.date({ message: "Issue Date is required" }),
  dueDate: z.date({ message: "Due Date is required" }),
  showBankDetails: z.boolean().default(false).optional(),
  isFullyPaid: z.boolean().default(false).optional(),
  lineItems: z
    .array(invoiceLineItemSchema)
    .min(1, "At least one line item is required"),
  installments: z.array(installmentSchema).optional(),
  payments: z.array(paymentSchema).optional(),
  subtotal: z.number().min(0),
  tax: z.number().min(0),
  discount: z.number().min(0),
  total: z.number().min(0),
  notes: z.string().optional().or(z.literal("")),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchemaZodValidation>;
