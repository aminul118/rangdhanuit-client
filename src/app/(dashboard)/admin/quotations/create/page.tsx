"use client";

import React, { useRef, useState } from "react";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";
import { HTMLToPDF } from "@/components/common/PDFGenerator";
import { QuotationTemplate, QuotationData } from "@/components/modules/dashboard/admin/Quotation/QuotationTemplate";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createQuotation } from "@/services/Quotation/quotation";
import { Save } from "lucide-react";
import useActionHandler from "@/hooks/useActionHandler";

const CreateQuotationPage = () => {
  const templateRef = useRef<HTMLDivElement>(null);
  const { executePost, isPending } = useActionHandler();
  
  const [data, setData] = useState<QuotationData>(() => ({
    clientName: "TechCorp Ltd.",
    clientAddress: "123 Business Avenue, Dhaka",
    projectName: "E-Commerce Platform",
    description: "Design and development of a custom React/Node.js eCommerce platform.",
    deliverables: "Web UI, Admin Dashboard, REST API, Payment Gateway Integration",
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    totalCost: 150000,
    advancePercentage: 50,
    midwayPercentage: 0,
    completionPercentage: 50,
    paymentMethod: "Bank Transfer",
    revisions: 3,
    supportDays: 30,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    executePost({
      action: async () => await createQuotation(data),
      success: {
        message: "Quotation saved successfully!",
        redirectPath: "/admin/quotations",
      },
      errorMessage: "Failed to save quotation"
    });
  };

  return (
    <AdminPageWrapper skeletonColumns={[{ width: "w-full" }]}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Quotation</h1>
          <p className="text-muted-foreground">Draft an agreement and generate PDF</p>
        </div>
        <div className="flex gap-3">
          <HTMLToPDF contentRef={templateRef} fileName={`${data.clientName.replace(/\s+/g, '_')}_Quotation.pdf`} />
          <Button onClick={handleSave} disabled={isPending}>
            <Save className="w-4 h-4 mr-2" />
            {isPending ? "Saving..." : "Save to Database"}
          </Button>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm border border-border flex flex-col gap-6">
        <h2 className="text-lg font-semibold border-b border-border pb-2 text-foreground">Client Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Client Name</Label>
            <Input name="clientName" value={data.clientName} onChange={handleChange} />
          </div>
          <div>
            <Label>Client Address</Label>
            <Input name="clientAddress" value={data.clientAddress} onChange={handleChange} />
          </div>
        </div>

        <h2 className="text-lg font-semibold border-b border-border pb-2 mt-4 text-foreground">Project Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <Label>Project Name</Label>
            <Input name="projectName" value={data.projectName} onChange={handleChange} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <Label>Description</Label>
            <Textarea name="description" value={data.description} onChange={handleChange} className="h-20" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <Label>Deliverables</Label>
            <Textarea name="deliverables" value={data.deliverables} onChange={handleChange} className="h-20" />
          </div>
          <div>
            <Label>Total Cost (BDT)</Label>
            <Input type="number" name="totalCost" value={data.totalCost} onChange={handleChange} />
          </div>
          <div>
            <Label>Revisions</Label>
            <Input type="number" name="revisions" value={data.revisions} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Hidden PDF content */}
      <QuotationTemplate data={data} templateRef={templateRef} />
    </AdminPageWrapper>
  );
};

export default CreateQuotationPage;
