import React from "react";
import { format } from "date-fns";

export interface QuotationData {
  clientName: string;
  clientAddress: string;
  projectName: string;
  description: string;
  deliverables: string;
  startDate?: Date;
  endDate?: Date;
  totalCost: number;
  advancePercentage: number;
  midwayPercentage: number;
  completionPercentage: number;
  paymentMethod: string;
  revisions: number;
  supportDays: number;
}

interface Props {
  data: QuotationData;
  templateRef: React.RefObject<HTMLDivElement | null>;
}

export const QuotationTemplate = ({ data, templateRef }: Props) => {
  return (
    <div className="hidden">
      {/* 
        We render it in a container that's absolutely positioned off-screen, 
        so html2canvas can capture it without disrupting the UI.
      */}
      <div className="absolute top-0 left-[-9999px]">
        <div
          ref={templateRef}
          className="bg-white text-black p-12 mx-auto"
          style={{ width: "800px", minHeight: "1120px", fontFamily: "sans-serif" }}
        >
          {/* Header */}
          <div className="text-center border-b-2 border-primary pb-6 mb-8">
            <h1 className="text-3xl font-bold uppercase tracking-wider text-primary">
              Rangdhanu IT
            </h1>
            <p className="text-gray-600 mt-2">
              Professional Software Development & Service Agreement
            </p>
          </div>

          <div className="mb-6 text-right text-sm text-gray-500">
            Date: {format(new Date(), "dd MMMM, yyyy")}
          </div>

          <div className="mb-8 text-sm leading-relaxed">
            <p>
              This Agreement is made on this{" "}
              <strong>{format(new Date(), "do")}</strong> day of{" "}
              <strong>{format(new Date(), "MMMM, yyyy")}</strong>
            </p>
            <br />
            <p>BETWEEN</p>
            <p>
              <strong>Rangdhanu IT</strong>, a software service provider, having
              its principal place of business at Dhaka, Bangladesh (hereinafter
              referred to as the &quot;Service Provider&quot;),
            </p>
            <br />
            <p>AND</p>
            <p>
              <strong>{data.clientName || "[Client Name]"}</strong>, having its
              address at <strong>{data.clientAddress || "[Client Address]"}</strong>{" "}
              (hereinafter referred to as the &quot;Client&quot;).
            </p>
          </div>

          <div className="space-y-6 text-sm">
            <section>
              <h2 className="text-lg font-bold border-b pb-1 mb-2">
                1. Scope of Work
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Project Name:</strong> {data.projectName}
                </li>
                <li>
                  <strong>Description:</strong> {data.description}
                </li>
                <li>
                  <strong>Deliverables:</strong> {data.deliverables}
                </li>
                <li>
                  <strong>Timeline:</strong>{" "}
                  {data.startDate ? format(data.startDate, "dd MMM yyyy") : "TBD"}{" "}
                  - {data.endDate ? format(data.endDate, "dd MMM yyyy") : "TBD"}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold border-b pb-1 mb-2">
                2. Payment Terms
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Total Project Cost:</strong> BDT{" "}
                  {data.totalCost?.toLocaleString()}
                </li>
                <li>
                  <strong>Payment Structure:</strong>
                  <ul className="list-circle pl-5 mt-1 space-y-1">
                    <li>{data.advancePercentage}% Advance</li>
                    {data.midwayPercentage > 0 && (
                      <li>{data.midwayPercentage}% Midway</li>
                    )}
                    <li>{data.completionPercentage}% Upon Completion</li>
                  </ul>
                </li>
                <li>
                  <strong>Payment Method:</strong> {data.paymentMethod}
                </li>
              </ul>
              <p className="mt-2 text-xs italic text-gray-500">
                Failure to pay on time may result in project suspension.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold border-b pb-1 mb-2">
                3. Revisions Policy
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  The Client is entitled to <strong>{data.revisions}</strong>{" "}
                  rounds of revisions.
                </li>
                <li>Additional revisions will be charged separately.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold border-b pb-1 mb-2">
                4. Intellectual Property
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Full ownership of the final product will be transferred to the
                  Client only after full payment is received.
                </li>
                <li>
                  The Service Provider retains the right to showcase the work in
                  its portfolio.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold border-b pb-1 mb-2">
                5. Maintenance & Support
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Free support period: <strong>{data.supportDays}</strong> days
                  after delivery.
                </li>
                <li>
                  Ongoing maintenance will require a separate agreement or fee.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold border-b pb-1 mb-2">
                6. Liability & Termination
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Either party may terminate this agreement with written notice.</li>
                <li>
                  Advance payments are non-refundable once work has started.
                </li>
                <li>
                  The Service Provider shall not be liable for any indirect or
                  consequential losses or third-party service failures (hosting,
                  APIs, etc.).
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t flex justify-between">
            <div className="text-center">
              <div className="border-b border-black w-48 mb-2"></div>
              <p className="font-bold">Service Provider</p>
              <p className="text-xs">Rangdhanu IT</p>
            </div>
            <div className="text-center">
              <div className="border-b border-black w-48 mb-2"></div>
              <p className="font-bold">Client</p>
              <p className="text-xs">{data.clientName || "Authorized Signatory"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
