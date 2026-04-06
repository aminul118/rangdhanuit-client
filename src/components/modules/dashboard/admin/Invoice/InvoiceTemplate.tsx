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
  clientAddress?: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  notes?: string;
}

interface Props {
  data: InvoiceData;
  templateRef: React.RefObject<HTMLDivElement | null>;
}

export const InvoiceTemplate = ({ data, templateRef }: Props) => {
  return (
    <div className="hidden">
      <div className="absolute top-0 left-[-9999px]">
        <div
          ref={templateRef}
          className="bg-white text-black p-12 mx-auto"
          style={{ width: "800px", minHeight: "1120px", fontFamily: "sans-serif" }}
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-primary pb-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold uppercase tracking-wider text-primary">
                INVOICE
              </h1>
              <p className="text-gray-600 mt-1 font-medium">{data.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-800">Rangdhanu IT</h2>
              <p className="text-sm text-gray-600">Dhaka, Bangladesh</p>
              <p className="text-sm text-gray-600">contact@rangdhanuit.com</p>
            </div>
          </div>

          {/* Client & Dates */}
          <div className="flex justify-between mb-10 text-sm">
            <div>
              <p className="text-gray-500 font-semibold mb-1 uppercase text-xs">Billed To:</p>
              <p className="font-bold text-lg text-gray-800">{data.clientName}</p>
              {data.clientAddress && (
                <p className="text-gray-600 w-48 leading-relaxed whitespace-pre-wrap">
                  {data.clientAddress}
                </p>
              )}
            </div>
            <div className="text-right space-y-2">
              <div>
                <p className="text-gray-500 font-semibold uppercase text-xs">Date of Issue:</p>
                <p className="font-medium text-gray-800">
                  {data.issueDate ? format(data.issueDate, "dd MMM yyyy") : ""}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold uppercase text-xs">Due Date:</p>
                <p className="font-medium text-gray-800">
                  {data.dueDate ? format(data.dueDate, "dd MMM yyyy") : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3 rounded-l-md">Description</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-right">Unit Price</th>
                  <th className="px-4 py-3 text-right rounded-r-md">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.lineItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-4 text-gray-800">{item.description}</td>
                    <td className="px-4 py-4 text-center text-gray-600">{item.quantity}</td>
                    <td className="px-4 py-4 text-right text-gray-600">
                      BDT {item.unitPrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-right font-medium text-gray-800">
                      BDT {item.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-12">
            <div className="w-64 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>BDT {data.subtotal.toLocaleString()}</span>
              </div>
              {data.tax > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Tax:</span>
                  <span>BDT {data.tax.toLocaleString()}</span>
                </div>
              )}
              {data.discount > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Discount:</span>
                  <span>- BDT {data.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg text-primary border-t pt-3">
                <span>Total:</span>
                <span>BDT {data.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {data.notes && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-gray-500 font-semibold uppercase text-xs mb-2">Notes</h3>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{data.notes}</p>
            </div>
          )}

          {/* Footer signature */}
          <div className="mt-16 pt-8 text-center text-gray-400 text-xs">
            <p>Thank you for your business!</p>
            <p>Rangdhanu IT • 123 Tech Avenue, Dhaka • contact@rangdhanuit.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
