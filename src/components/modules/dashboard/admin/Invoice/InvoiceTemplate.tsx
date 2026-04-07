import React from "react";
import { format } from "date-fns";

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceData {
  clientName: string;
  clientEmail?: string;
  clientPhone: string;
  clientAddress?: string;
  projectStartTime?: Date;
  projectApproximateFinishTime?: Date;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  notes?: string;
  status?: string; // PAID, PENDING, OVERDUE, etc.
}

interface Props {
  data: InvoiceData;
  templateRef: React.RefObject<HTMLDivElement | null>;
}

export const InvoiceTemplate = ({ data, templateRef }: Props) => {
  // Theme Colors
  const DARK_BLUE = "#0B3A67";
  const LIGHT_BLUE = "#EAF4F8";
  const ROW_BLUE = "#DCEFF6";
  const SOFT_GRAY = "#F4F6F8";
  const TEXT_COLOR = "#000000";

  const status = data.status || "PENDING";
  const statusColor = 
    status === "PAID" ? "#7DBA6D" : 
    status === "PENDING" ? "#F0B429" : 
    "#D64545";

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[-100]">
      <div className="absolute top-0 left-[-9999px]">
        <div
          ref={templateRef}
          className="bg-white text-slate-900 p-0 mx-auto overflow-hidden shadow-2xl transition-all duration-500"
          style={{ width: "800px", minHeight: "1120px", fontFamily: "'Inter', sans-serif" }}
        >
          {/* Header Section */}
          <div style={{ backgroundColor: DARK_BLUE }} className="h-[120px] px-12 flex justify-between items-center relative">
             <div className="flex flex-col">
                <h1 className="text-white text-5xl font-black tracking-tighter m-0">INVOICE</h1>
             </div>
             <div className="text-right text-white space-y-1">
                <div className="flex justify-end gap-3 text-sm">
                    <span className="font-bold opacity-70 uppercase tracking-widest">Invoice No</span>
                    <span className="font-black">{data.invoiceNumber || "#---"}</span>
                </div>
                <div className="flex justify-end gap-3 text-sm">
                    <span className="font-bold opacity-70 uppercase tracking-widest">Issue Date</span>
                    <span className="font-medium">{data.issueDate ? format(new Date(data.issueDate), "dd MMM, yyyy") : "N/A"}</span>
                </div>
                {data.dueDate && (
                    <div className="flex justify-end gap-3 text-sm">
                        <span className="font-bold opacity-70 uppercase tracking-widest text-red-300">Due Date</span>
                        <span className="font-bold text-red-200">{format(new Date(data.dueDate), "dd MMM, yyyy")}</span>
                    </div>
                )}
             </div>
          </div>

          <div className="p-12">
            {/* Addresses Section */}
            <div className="flex justify-between mb-16 px-2">
                <div>
                    <h3 style={{ color: DARK_BLUE }} className="text-xs font-black uppercase tracking-[0.2em] mb-3">From</h3>
                    <div className="text-sm font-medium space-y-1">
                        <p className="text-lg font-black text-slate-900">Rangdhanu IT</p>
                        <p className="text-slate-500">Web & Digital Solutions</p>
                        <p className="text-slate-500">+880 1XXXXXXXXX</p>
                        <p className="text-slate-500">www.rangdhanuit.com</p>
                    </div>
                </div>
                <div className="text-right">
                    <h3 style={{ color: DARK_BLUE }} className="text-xs font-black uppercase tracking-[0.2em] mb-3">Bill To</h3>
                    <div className="text-sm font-medium space-y-1">
                        <p className="text-lg font-black text-slate-900">{data.clientName || "[Client Name]"}</p>
                        <p className="text-slate-500">{data.clientPhone || "[Phone]"}</p>
                        {data.clientEmail && <p className="text-slate-500">{data.clientEmail}</p>}
                        {data.clientAddress && <p className="text-slate-500 max-w-[250px] ml-auto">{data.clientAddress}</p>}
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <div className="mb-12 overflow-hidden rounded-xl">
                <table className="w-full text-sm text-left border-collapse">
                    <thead style={{ backgroundColor: DARK_BLUE }} className="text-white uppercase text-[10px] font-black tracking-widest">
                        <tr>
                            <th className="px-6 py-5">Item Description</th>
                            <th className="px-6 py-5 text-center">Quantity</th>
                            <th className="px-6 py-5 text-center">Price</th>
                            <th className="px-6 py-5 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.lineItems.length > 0 ? (
                            data.lineItems.map((item, index) => (
                                <tr 
                                    key={index} 
                                    style={{ backgroundColor: index % 2 === 0 ? LIGHT_BLUE : ROW_BLUE }}
                                    className="transition-colors border-b border-white/20"
                                >
                                    <td className="px-6 py-4 font-bold text-slate-800">{item.description}</td>
                                    <td className="px-6 py-4 text-center font-medium text-slate-600">{item.quantity}</td>
                                    <td className="px-6 py-4 text-center font-medium text-slate-600">{item.unitPrice.toLocaleString()} tk</td>
                                    <td className="px-6 py-4 text-right font-black text-slate-900">{item.total.toLocaleString()} tk</td>
                                </tr>
                            ))
                        ) : (
                            <tr style={{ backgroundColor: LIGHT_BLUE }}>
                                <td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic">No line items provided</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Totals Section */}
            <div className="flex justify-between items-start mt-12 relative">
                {/* Status Seal / Stamp */}
                <div className="absolute left-[340px] top-4">
                    <div 
                        style={{ 
                            borderColor: statusColor, 
                            color: statusColor,
                            transform: "rotate(-20deg)",
                            opacity: 0.8
                        }}
                        className="border-[6px] rounded-2xl px-6 py-2 flex flex-col items-center justify-center font-black select-none pointer-events-none origin-center"
                    >
                        <span className="text-4xl tracking-tighter uppercase">{status}</span>
                        <div style={{ backgroundColor: statusColor }} className="h-1 w-full mt-1 rounded-full opacity-30" />
                        <span className="text-[10px] tracking-[0.3em] font-black mt-1 opacity-50 uppercase">Verified Official</span>
                    </div>
                </div>

                <div className="max-w-[320px]">
                   {data.notes && (
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 style={{ color: DARK_BLUE }} className="text-[10px] font-black uppercase tracking-widest mb-3">Notes & Observations</h4>
                        <p className="text-xs text-slate-600 leading-relaxed italic">{data.notes}</p>
                      </div>
                   )}
                </div>

                <div style={{ backgroundColor: SOFT_GRAY }} className="w-[280px] rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Sub Total</span>
                            <span className="font-black text-slate-800">{data.subtotal.toLocaleString()} tk</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Tax</span>
                            <span className="font-black text-slate-800">{data.tax.toLocaleString()} tk</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Discount</span>
                            <span className="font-black text-emerald-600">-{data.discount.toLocaleString()} tk</span>
                        </div>
                    </div>
                    <div style={{ backgroundColor: DARK_BLUE }} className="px-6 py-5 flex justify-between items-center text-white">
                        <span className="text-xs font-black uppercase tracking-widest">Grand Total</span>
                        <span className="text-2xl font-black">{data.total.toLocaleString()} tk</span>
                    </div>
                </div>
            </div>

            {/* Payment Information */}
            <div style={{ backgroundColor: LIGHT_BLUE }} className="mt-20 p-8 rounded-[2.5rem] border border-[#B0CFE0] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 blur-3xl -mr-12 -mt-12" />
                <h3 style={{ color: DARK_BLUE }} className="text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: DARK_BLUE }} />
                    Payment Information
                </h3>
                <div className="grid grid-cols-2 gap-12 relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#B0CFE0] -translate-x-1/2" />
                    
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Banking (Bkash)</h4>
                        <div className="space-y-1 text-sm font-medium">
                            <p className="flex justify-between pr-8 text-slate-500">Number: <span className="text-slate-900 font-black">01XXXXXXXXX</span></p>
                            <p className="flex justify-between pr-8 text-slate-500">Type: <span className="text-slate-900 font-bold">Personal</span></p>
                            <p className="flex justify-between pr-8 text-slate-500">Reference: <span className="text-indigo-600 font-black">{data.invoiceNumber || "N/A"}</span></p>
                        </div>
                    </div>

                    <div className="space-y-4 pl-6">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bank Transfer</h4>
                        <div className="space-y-1 text-sm font-medium">
                            <p className="flex justify-between text-slate-500">Bank: <span className="text-slate-900 font-black">BRAC BANK PLC</span></p>
                            <p className="flex justify-between text-slate-500">Name: <span className="text-slate-900 font-bold uppercase text-[10px]">Rangdhanu IT</span></p>
                            <p className="flex justify-between text-slate-500">A/C: <span className="text-slate-900 font-black tracking-tighter">105XXXXXXXXX</span></p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Design Footer Stick */}
            <div 
                style={{ backgroundColor: DARK_BLUE }} 
                className="mt-20 h-10 -mx-12 mb-[-48px] flex items-center px-12"
            >
                <p className="text-white/50 text-[9px] font-bold uppercase tracking-[0.5em]">Electronic Generated Document • No Signature Required</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
