"use client";

import { format } from "date-fns";

export interface QuotationLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface QuotationData {
  clientName: string;
  clientEmail?: string;
  clientPhone: string;
  clientAddress?: string;
  projectStartTime?: Date;
  projectApproximateFinishTime?: Date;
  quotationNumber: string;
  issueDate: Date;
  validUntil?: Date;
  lineItems: QuotationLineItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  notes?: string;
  status?: string;
}

interface Props {
  data: QuotationData;
  templateRef: React.RefObject<HTMLDivElement | null>;
}

export const QuotationTemplate = ({ data, templateRef }: Props) => {
  const DARK_BLUE = "#0B3A67";
  const LIGHT_BLUE = "#EAF4F8";
  const ROW_BLUE = "#DCEFF6";
  const SOFT_GRAY = "#F4F6F8";

  const status = data.status || "DRAFT";
  const statusColor =
    status === "ACCEPTED"
      ? "#059669"
      : status === "SENT"
        ? "#0B3A67"
        : status === "REJECTED"
          ? "#DC2626"
          : "#6B7280";

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[-100]">
      <div className="absolute top-0 left-[-9999px]">
        <div
          ref={templateRef}
          className="bg-white text-slate-900 p-0 mx-auto overflow-hidden shadow-2xl transition-all duration-500"
          style={{
            width: "800px",
            minHeight: "1120px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <div
            style={{ backgroundColor: DARK_BLUE }}
            className="h-[120px] px-12 flex justify-between items-center relative"
          >
            <div className="flex flex-col">
              <h1 className="text-white text-5xl font-black tracking-tighter m-0">
                QUOTATION
              </h1>
            </div>
            <div className="text-right text-white space-y-1">
              <div className="flex justify-end gap-3 text-sm">
                <span className="font-bold opacity-70 uppercase tracking-widest">
                  Quotation No
                </span>
                <span className="font-black">
                  {data.quotationNumber || "#---"}
                </span>
              </div>
              <div className="flex justify-end gap-3 text-sm">
                <span className="font-bold opacity-70 uppercase tracking-widest">
                  Issue Date
                </span>
                <span className="font-medium">
                  {data.issueDate
                    ? format(new Date(data.issueDate), "dd MMM, yyyy")
                    : "N/A"}
                </span>
              </div>
              {data.validUntil && (
                <div className="flex justify-end gap-3 text-sm">
                  <span className="font-bold opacity-70 uppercase tracking-widest text-red-300">
                    Valid Until
                  </span>
                  <span className="font-bold text-red-200">
                    {format(new Date(data.validUntil), "dd MMM, yyyy")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="p-12">
            <div className="flex justify-between mb-16 px-2">
              <div>
                <h3
                  style={{ color: DARK_BLUE }}
                  className="text-xs font-black uppercase tracking-[0.2em] mb-3"
                >
                  From
                </h3>
                <div className="text-sm font-medium space-y-1">
                  <p className="text-lg font-black text-slate-900">
                    Rangdhanu IT
                  </p>
                  <p className="text-slate-500">Web & Digital Solutions</p>
                  <p className="text-slate-500">+880 1XXXXXXXXX</p>
                  <p className="text-slate-500">www.rangdhanuit.com</p>
                </div>
              </div>
              <div className="text-right">
                <h3
                  style={{ color: DARK_BLUE }}
                  className="text-xs font-black uppercase tracking-[0.2em] mb-3"
                >
                  Bill To
                </h3>
                <div className="text-sm font-medium space-y-1">
                  <p className="text-lg font-black text-slate-900">
                    {data.clientName || "[Client Name]"}
                  </p>
                  <p className="text-slate-500">
                    {data.clientPhone || "[Phone]"}
                  </p>
                  {data.clientEmail && (
                    <p className="text-slate-500">{data.clientEmail}</p>
                  )}
                  {data.clientAddress && (
                    <p className="text-slate-500 max-w-[250px] ml-auto">
                      {data.clientAddress}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-12 overflow-hidden rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <thead
                  style={{ backgroundColor: DARK_BLUE }}
                  className="text-white uppercase text-[10px] font-black tracking-widest"
                >
                  <tr>
                    <th className="px-6 py-5 text-center w-16">No</th>
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
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? LIGHT_BLUE : ROW_BLUE,
                        }}
                        className="transition-colors border-b border-white/20"
                      >
                        <td className="px-6 py-4 text-center font-bold text-slate-500">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-slate-600">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-slate-600">
                          {item.unitPrice.toLocaleString()} tk
                        </td>
                        <td className="px-6 py-4 text-right font-black text-slate-900">
                          {item.total.toLocaleString()} tk
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr style={{ backgroundColor: LIGHT_BLUE }}>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-slate-400 italic"
                      >
                        No line items provided
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-start mt-12 relative">
              <div className="absolute left-[340px] top-4">
                <div
                  style={{
                    borderColor: statusColor,
                    color: statusColor,
                    transform: "rotate(-20deg)",
                    opacity: 0.8,
                  }}
                  className="border-[6px] rounded-2xl px-6 py-2 flex flex-col items-center justify-center font-black select-none pointer-events-none origin-center"
                >
                  <span className="text-4xl tracking-tighter uppercase">
                    {status}
                  </span>
                  <div
                    style={{ backgroundColor: statusColor }}
                    className="h-1 w-full mt-1 rounded-full opacity-30"
                  />
                  <span className="text-[10px] tracking-[0.3em] font-black mt-1 opacity-50 uppercase">
                    Quotation Status
                  </span>
                </div>
              </div>

              <div className="max-w-[320px]">
                {data.notes && (
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4
                      style={{ color: DARK_BLUE }}
                      className="text-[10px] font-black uppercase tracking-widest mb-3"
                    >
                      Notes & Observations
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      {data.notes}
                    </p>
                  </div>
                )}
              </div>

              <div
                style={{ backgroundColor: SOFT_GRAY }}
                className="w-[280px] rounded-2xl overflow-hidden shadow-sm border border-slate-100"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                      Sub Total
                    </span>
                    <span className="font-black text-slate-800">
                      {data.subtotal.toLocaleString()} tk
                    </span>
                  </div>
                  {data.tax > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                        Tax ({data.tax}%)
                      </span>
                      <span className="font-black text-slate-800">
                        {Math.max(
                          0,
                          (data.subtotal - data.discount) * (data.tax / 100),
                        ).toLocaleString()}{" "}
                        tk
                      </span>
                    </div>
                  )}
                  {data.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                        Discount
                      </span>
                      <span className="font-black text-emerald-600">
                        -{data.discount.toLocaleString()} tk
                      </span>
                    </div>
                  )}
                </div>
                <div
                  style={{ backgroundColor: DARK_BLUE }}
                  className="px-6 py-5 space-y-3 text-white"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest opacity-80">
                      Grand Total
                    </span>
                    <span className="text-xl font-black">
                      {data.total.toLocaleString()} tk
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{ backgroundColor: DARK_BLUE }}
              className="mt-20 h-10 -mx-12 mb-[-48px] flex items-center px-12"
            >
              <p className="text-white/50 text-[9px] font-bold uppercase tracking-[0.5em]">
                Electronic Generated Document • No Signature Required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
