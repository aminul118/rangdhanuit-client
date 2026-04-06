"use client";

import React, { useRef, useState } from "react";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";
import { HTMLToPDF } from "@/components/common/PDFGenerator";
import { InvoiceTemplate, InvoiceData, InvoiceLineItem } from "@/components/modules/dashboard/admin/Invoice/InvoiceTemplate";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Save } from "lucide-react";
import { createInvoice } from "@/services/Invoice/invoice";
import useActionHandler from "@/hooks/useActionHandler";

const CreateInvoicePage = () => {
  const templateRef = useRef<HTMLDivElement>(null);
  const { executePost, isPending } = useActionHandler();
  
  const [data, setData] = useState<InvoiceData>(() => ({
    clientName: "TechCorp Ltd.",
    clientAddress: "123 Business Avenue, Dhaka",
    invoiceNumber: `INV-${Date.now()}`,
    issueDate: new Date(),
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    lineItems: [
      { description: "Web Development", quantity: 1, unitPrice: 100000, total: 100000 }
    ],
    subtotal: 100000,
    tax: 0,
    discount: 0,
    total: 100000,
    notes: "Payment due within 15 days.",
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleLineItemChange = (index: number, field: keyof InvoiceLineItem, value: string | number) => {
    const newItems = [...data.lineItems];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Auto calculate total for the line item
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    }

    // Auto calculate invoice totals
    const newSubtotal = newItems.reduce((acc, curr) => acc + curr.total, 0);
    
    setData(prev => ({
      ...prev,
      lineItems: newItems,
      subtotal: newSubtotal,
      total: newSubtotal + prev.tax - prev.discount
    }));
  };

  const addLineItem = () => {
    setData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { description: "", quantity: 1, unitPrice: 0, total: 0 }]
    }));
  };

  const removeLineItem = (index: number) => {
    const newItems = data.lineItems.filter((_, i) => i !== index);
    const newSubtotal = newItems.reduce((acc, curr) => acc + curr.total, 0);
    
    setData(prev => ({
      ...prev,
      lineItems: newItems,
      subtotal: newSubtotal,
      total: newSubtotal + prev.tax - prev.discount
    }));
  };

  const handleSave = async () => {
    executePost({
      action: async () => await createInvoice(data),
      success: {
        message: "Invoice saved successfully!",
        redirectPath: "/admin/invoices",
      },
      errorMessage: "Failed to save invoice"
    });
  };

  return (
    <AdminPageWrapper skeletonColumns={[{ width: "w-full" }]}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Invoice</h1>
          <p className="text-muted-foreground">Draft an invoice and generate PDF</p>
        </div>
        <div className="flex gap-3">
          <HTMLToPDF contentRef={templateRef} fileName={`${data.invoiceNumber}_Invoice.pdf`} buttonLabel="Download Invoice" />
          <Button onClick={handleSave} disabled={isPending}>
            <Save className="w-4 h-4 mr-2" />
            {isPending ? "Saving..." : "Save to Database"}
          </Button>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm border border-border flex flex-col gap-6">
        <h2 className="text-lg font-semibold border-b border-border pb-2 text-foreground">Invoice Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Invoice Number</Label>
            <Input name="invoiceNumber" value={data.invoiceNumber} onChange={handleChange} />
          </div>
          <div></div>
          <div>
            <Label>Client Name</Label>
            <Input name="clientName" value={data.clientName} onChange={handleChange} />
          </div>
          <div>
            <Label>Client Address</Label>
            <Input name="clientAddress" value={data.clientAddress} onChange={handleChange} />
          </div>
        </div>

        <h2 className="text-lg font-semibold border-b border-border pb-2 mt-4 flex justify-between items-center text-foreground">
          Line Items
          <Button variant="outline" size="sm" onClick={addLineItem}><Plus className="w-3 h-3 mr-1"/> Add Item</Button>
        </h2>
        
        <div className="space-y-4">
          {data.lineItems.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-end">
              <div className="flex-1">
                <Label>Description</Label>
                <Input value={item.description} onChange={(e) => handleLineItemChange(idx, 'description', e.target.value)} />
              </div>
              <div className="w-24">
                <Label>Qty</Label>
                <Input type="number" value={item.quantity} onChange={(e) => handleLineItemChange(idx, 'quantity', Number(e.target.value))} />
              </div>
              <div className="w-32">
                <Label>Price</Label>
                <Input type="number" value={item.unitPrice} onChange={(e) => handleLineItemChange(idx, 'unitPrice', Number(e.target.value))} />
              </div>
              <div className="w-32">
                <Label>Total</Label>
                <Input type="number" value={item.total} readOnly className="bg-muted text-muted-foreground" />
              </div>
              <div>
                <Button variant="destructive" size="icon" onClick={() => removeLineItem(idx)} disabled={data.lineItems.length === 1}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden PDF content */}
      <InvoiceTemplate data={data} templateRef={templateRef} />
    </AdminPageWrapper>
  );
};

export default CreateInvoicePage;
