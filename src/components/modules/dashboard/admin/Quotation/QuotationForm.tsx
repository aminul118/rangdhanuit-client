"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  Sparkles,
  Building2,
  CreditCard,
  Layout,
  History,
  Headset,
  DownloadCloud,
} from "lucide-react";
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
  quotationSchemaZodValidation,
  QuotationFormValues,
} from "@/zod/quotation.validation";
import SubmitButton from "@/components/common/form/SubmitButton";
import { useRef } from "react";
import { HTMLToPDF } from "@/components/common/PDFGenerator";
import { QuotationTemplate } from "./QuotationTemplate";

interface QuotationFormProps {
  initialData?: Partial<QuotationFormValues>;
  onSubmit: (data: QuotationFormValues) => Promise<void>;
  loading: boolean;
  submitLabel?: string;
}

const QuotationForm = ({
  initialData,
  onSubmit,
  loading,
  submitLabel = "Generate Quotation",
}: QuotationFormProps) => {
  const templateRef = useRef<HTMLDivElement>(null);
  const form = useForm<QuotationFormValues>({
    resolver: zodResolver(quotationSchemaZodValidation),
    defaultValues: {
      clientName: initialData?.clientName || "",
      clientAddress: initialData?.clientAddress || "",
      clientEmail: initialData?.clientEmail || "",
      clientPhone: initialData?.clientPhone || "",
      projectName: initialData?.projectName || "",
      description: initialData?.description || "",
      deliverables: initialData?.deliverables || "",
      startDate: initialData?.startDate || undefined,
      endDate: initialData?.endDate || undefined,
      totalCost: initialData?.totalCost || 0,
      advancePercentage: initialData?.advancePercentage || 50,
      midwayPercentage: initialData?.midwayPercentage || 30,
      completionPercentage: initialData?.completionPercentage || 20,
      paymentMethod:
        initialData?.paymentMethod || "Bank Transfer / Mobile Banking",
      revisions: initialData?.revisions || 3,
      supportDays: initialData?.supportDays || 30,
    },
  });

  const allValues = form.watch();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        {/* Client & Project Identity */}
        <div className="glass-premium p-8 rounded-[2.5rem] border border-border/50 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />
          <h3 className="text-xl font-black mb-8 h-10 flex items-center gap-3 text-white uppercase tracking-[0.2em] border-b border-white/5">
            <Building2 className="text-indigo-500" size={24} />
            Client & Project Identity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5 flex items-center gap-2">
                    <Sparkles size={12} className="opacity-40" />
                    Project Vision Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Next-Gen E-commerce Platform"
                      className="h-14 rounded-2xl bg-white/5 border-white/10 text-lg font-bold"
                      {...field}
                    />
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
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5">
                    Business / Client Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe or Acme Inc."
                      className="rounded-xl"
                      {...field}
                    />
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
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5">
                    Primary Contact
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+880 1XXX XXXXXX"
                      className="rounded-xl"
                      {...field}
                    />
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
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5">
                    Digital Contact (Email)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="client@vision.com"
                      className="rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5">
                    Physical / Legal Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Street, City, Country"
                      className="rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Strategic Scope & Architecture */}
        <div className="glass-premium p-8 rounded-[2.5rem] border border-border/50 shadow-2xl relative overflow-hidden group">
          <h3 className="text-xl font-black mb-8 h-10 flex items-center gap-3 text-white uppercase tracking-[0.2em] border-b border-white/5">
            <Layout className="text-purple-500" size={24} />
            Strategic Scope & Architecture
          </h3>

          <div className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5">
                    Strategic Overview
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Define the high-level goals and challenges this project addresses..."
                      className="min-h-[120px] rounded-2xl bg-white/5 border-white/10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliverables"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5">
                    Core Deliverables (Markdown Supported)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="- Responsive Web Application&#10;- Integrated API Suite&#10;- Custom Admin Dashboard"
                      className="min-h-[160px] rounded-2xl bg-white/5 border-white/10 font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5 mb-2">
                      Initiation Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal h-12 rounded-xl bg-white/5 border-white/10",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select Launch Date</span>
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
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5 mb-2">
                      Completion Deadline
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal h-12 rounded-xl bg-white/5 border-white/10",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select Deadline</span>
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
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Financial Investment & Success Terms */}
        <div className="glass-premium p-8 rounded-[2.5rem] border border-border/50 shadow-2xl relative overflow-hidden group">
          <h3 className="text-xl font-black mb-8 h-10 flex items-center gap-3 text-white uppercase tracking-[0.2em] border-b border-white/5">
            <CreditCard className="text-emerald-500" size={24} />
            Financial Investment & Terms
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="totalCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5">
                    Total Project Value
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        className="h-14 pl-12 rounded-2xl bg-emerald-500/5 border-emerald-500/20 text-emerald-400 font-black text-xl"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/50 font-bold">
                        BDT
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5">
                    Preferred Asset Transfer Method
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bank Transfer, Wire, etc."
                      className="h-14 rounded-2xl bg-white/5 border-white/10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 p-6 bg-white/5 rounded-[1.5rem] border border-white/5">
            <FormField
              control={form.control}
              name="advancePercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold text-zinc-400 uppercase">
                    Initiation (%)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="midwayPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold text-zinc-400 uppercase">
                    Development (%)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="completionPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold text-zinc-400 uppercase">
                    Launch (%)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FormField
              control={form.control}
              name="revisions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5 flex items-center gap-2">
                    <History size={12} /> Optimization Cycles
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Number of revisions"
                      className="rounded-xl"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supportDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5 flex items-center gap-2">
                    <Headset size={12} /> Priority Support (Days)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Post-launch support"
                      className="rounded-xl"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-8">
          <HTMLToPDF
            contentRef={templateRef}
            fileName={`${allValues.projectName || "Proposal"}.pdf`}
            buttonLabel="Preview & Download Proposal"
            icon={
              <DownloadCloud className="w-5 h-5 mr-3 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            }
          />
          <SubmitButton
            label={submitLabel}
            isLoading={loading}
            className="w-auto px-16 h-16 text-xl rounded-[2rem]"
          />
        </div>
      </form>

      {/* Hidden template for PDF generation */}
      <QuotationTemplate data={allValues as any} templateRef={templateRef} />
    </Form>
  );
};

export default QuotationForm;
