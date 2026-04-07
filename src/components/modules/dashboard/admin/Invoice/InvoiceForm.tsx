"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays, startOfToday } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Plus, Trash2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  invoiceSchemaZodValidation,
  InvoiceFormValues,
} from "@/zod/invoice.validation";
import SubmitButton from "@/components/common/form/SubmitButton";
import { useEffect, useRef } from "react";
import { HTMLToPDF } from "@/components/common/PDFGenerator";
import { InvoiceTemplate } from "./InvoiceTemplate";
import { Download } from "lucide-react";

interface InvoiceFormProps {
  initialData?: Partial<InvoiceFormValues>;
  onSubmit: (data: InvoiceFormValues) => Promise<void>;
  loading: boolean;
  submitLabel?: string;
}

const InvoiceForm = ({
  initialData,
  onSubmit,
  loading,
  submitLabel = "Save Invoice",
}: InvoiceFormProps) => {
  const templateRef = useRef<HTMLDivElement>(null);
  // Generate stable default values for hydration safety
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchemaZodValidation),
    defaultValues: {
      clientName: initialData?.clientName || "",
      clientEmail: initialData?.clientEmail || "",
      clientPhone: initialData?.clientPhone || "",
      clientAddress: initialData?.clientAddress || "",
      invoiceNumber: initialData?.invoiceNumber || "",
      issueDate: initialData?.issueDate || new Date(),
      dueDate: initialData?.dueDate || new Date(),
      lineItems: initialData?.lineItems || [
        { description: "", quantity: 1, unitPrice: 0, total: 0 },
      ],
      subtotal: initialData?.subtotal || 0,
      tax: initialData?.tax || 0,
      discount: initialData?.discount || 0,
      total: initialData?.total || 0,
      notes: initialData?.notes || "",
      projectStartTime: initialData?.projectStartTime || undefined,
      projectApproximateFinishTime:
        initialData?.projectApproximateFinishTime || undefined,
    },
  });

  // Handle client-side only initialization for new invoices
  useEffect(() => {
    if (!initialData) {
      if (!form.getValues("invoiceNumber")) {
        form.setValue("invoiceNumber", `INV-${Date.now()}`);
      }

      // Default due date (15 days from now)
      const currentDueDate = form.getValues("dueDate");
      // Check if it's just the 'now' date we set in defaultValues
      const diff = Math.abs(currentDueDate.getTime() - new Date().getTime());
      if (diff < 1000) {
        // Only if it was roughly initialized just now
        form.setValue(
          "dueDate",
          new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        );
      }
    }
  }, [initialData, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lineItems",
  });

  const watchLineItems = form.watch("lineItems") || [];
  const watchTax = form.watch("tax") || 0;
  const watchDiscount = form.watch("discount") || 0;
  const allValues = form.watch();

  // Re-calculate totals instantly for the UI to be highly responsive
  const calculatedSubtotal = watchLineItems.reduce((acc, item) => {
    const itemTotal =
      (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
    return acc + itemTotal;
  }, 0);

  const basePriceAfterDiscount = Math.max(
    0,
    calculatedSubtotal - (Number(watchDiscount) || 0),
  );
  const calculatedTaxAmount =
    basePriceAfterDiscount * ((Number(watchTax) || 0) / 100);

  const calculatedTotal = Math.max(
    0,
    basePriceAfterDiscount + calculatedTaxAmount,
  );

  // Sync totals with form state for validation/submission purpose
  useEffect(() => {
    const currentSubtotal = form.getValues("subtotal");
    const currentTotal = form.getValues("total");

    if (currentSubtotal !== calculatedSubtotal) {
      form.setValue("subtotal", calculatedSubtotal, { shouldValidate: true });
    }
    if (currentTotal !== calculatedTotal) {
      form.setValue("total", calculatedTotal, { shouldValidate: true });
    }

    // Ensure each line item's individual total is synced
    watchLineItems.forEach((item, index) => {
      const itemTotal =
        (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
      if (item.total !== itemTotal) {
        form.setValue(`lineItems.${index}.total`, itemTotal, {
          shouldValidate: true,
        });
      }
    });
  }, [calculatedSubtotal, calculatedTotal, watchLineItems, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="glass-premium p-8 rounded-[2rem] border border-border/50 shadow-2xl">
          <h3 className="text-xl font-bold mb-6 text-indigo-900 flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-600 rounded-full" />
            Client & Invoice Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="invoiceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Invoice Number
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Client Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Acme Corp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Client Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="client@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Client Phone
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="+880 1XXX XXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientAddress"
              render={({ field }) => (
                <FormItem className="lg:col-span-2">
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Client Address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Full business address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="glass-premium p-8 rounded-[2rem] border border-border/50 shadow-2xl">
          <h3 className="text-xl font-bold mb-6 text-indigo-900 flex items-center gap-2">
            <div className="w-2 h-6 bg-indigo-600 rounded-full" />
            Project Timeline & Dates
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormField
              control={form.control}
              name="issueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-slate-500">
                      Issue Date
                    </FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => field.onChange(startOfToday())}
                      className="h-6 text-[10px] uppercase font-bold text-indigo-600 hover:text-indigo-700 p-0"
                    >
                      <Zap size={10} className="mr-1" /> Today
                    </Button>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal h-11 rounded-xl",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-slate-500">
                      Due Date
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const days = parseInt(value);
                        if (!isNaN(days)) {
                          const baseDate =
                            form.getValues("issueDate") || new Date();
                          field.onChange(addDays(baseDate, days));
                        }
                      }}
                    >
                      <SelectTrigger className="h-6 w-auto border-none bg-transparent text-[10px] uppercase font-bold text-indigo-600 hover:text-indigo-700 p-0 shadow-none focus:ring-0">
                        <SelectValue placeholder="Terms" />
                      </SelectTrigger>
                      <SelectContent align="end" className="rounded-xl">
                        <SelectItem value="7" className="text-xs">
                          7 Days
                        </SelectItem>
                        <SelectItem value="15" className="text-xs">
                          15 Days
                        </SelectItem>
                        <SelectItem value="30" className="text-xs">
                          30 Days
                        </SelectItem>
                        <SelectItem value="45" className="text-xs">
                          45 Days
                        </SelectItem>
                        <SelectItem value="60" className="text-xs">
                          60 Days
                        </SelectItem>
                        <SelectItem value="90" className="text-xs">
                          90 Days
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal h-11 rounded-xl",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectStartTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                    Project Start
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal h-11 rounded-xl",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectApproximateFinishTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                    Approx. Finish
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal h-11 rounded-xl",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="glass-premium p-8 rounded-[2rem] border border-border/50 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
              <div className="w-2 h-6 bg-indigo-600 rounded-full" />
              Line Items
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({ description: "", quantity: 1, unitPrice: 0, total: 0 })
              }
              className="rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Item
            </Button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-start  p-4 rounded-2xl border  group transition-all"
              >
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`lineItems.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Project phase or service..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-24">
                  <FormField
                    control={form.control}
                    name={`lineItems.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                          Qty
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-32">
                  <FormField
                    control={form.control}
                    name={`lineItems.${index}.unitPrice`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                          Unit Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-32">
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                      Line Total
                    </FormLabel>
                    <div className="h-10 flex items-center px-3 rounded-md bg-slate-100 text-slate-500 font-bold text-sm">
                      {(
                        watchLineItems[index]?.quantity *
                          watchLineItems[index]?.unitPrice || 0
                      ).toLocaleString()}
                    </div>
                  </FormItem>
                </div>
                <div className="pt-8">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    className="rounded-xl opacity-40 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <div className="w-80 space-y-4  p-6 rounded-[1.5rem] border ">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="font-bold text-slate-900">
                  {calculatedSubtotal.toLocaleString()} BDT
                </span>
              </div>

              <FormField
                control={form.control}
                name="tax"
                render={({ field }) => (
                  <div className="space-y-1">
                    <FormItem className="flex justify-between items-center space-y-0">
                      <FormLabel className="text-sm text-slate-500 font-medium">
                        Tax (%)
                      </FormLabel>
                      <FormControl className="w-32">
                        <div className="relative">
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value) || 0)
                            }
                            className="h-8 text-right pr-6 font-bold"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                            %
                          </span>
                        </div>
                      </FormControl>
                    </FormItem>
                    <div className="flex justify-end text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Tax Amount: {calculatedTaxAmount.toLocaleString()} BDT
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center space-y-0">
                    <FormLabel className="text-sm text-slate-500 font-medium">
                      Discount
                    </FormLabel>
                    <FormControl className="w-32">
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                        className="h-8 text-right font-bold text-emerald-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="pt-4 border-t-2 border-indigo-100 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-900">
                    Total BDT
                  </span>
                  <span className="text-2xl font-black text-indigo-900">
                    {calculatedTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-premium p-8 rounded-[2rem] border border-border/50 shadow-2xl">
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Important Notes
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Add any specific instructions or terms..."
                    className="min-h-[100px] rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <SubmitButton
            label={submitLabel}
            isLoading={loading}
            className="w-auto px-12 h-14 text-lg"
          />
        </div>
      </form>

      {/* Hidden template for PDF generation */}
      <InvoiceTemplate data={allValues as any} templateRef={templateRef} />
    </Form>
  );
};

export default InvoiceForm;
