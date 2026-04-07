import React from "react";
import { format } from "date-fns";

export interface QuotationData {
  clientName: string;
  clientAddress: string;
  clientEmail?: string;
  clientPhone: string;
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
  status?: string;
}

interface Props {
  data: QuotationData;
  templateRef: React.RefObject<HTMLDivElement | null>;
}

export const QuotationTemplate = ({ data, templateRef }: Props) => {
  // Theme Colors
  const DARK_BLUE = "#0B3A67";
  const LIGHT_BLUE = "#EAF4F8";
  const ROW_BLUE = "#DCEFF6";
  const SOFT_GRAY = "#F4F6F8";
  const TEXT_COLOR = "#000000";

  const status = data.status || "DRAFT";
  const statusColor = 
    status === "ACCEPTED" ? "#7DBA6D" : 
    status === "SENT" ? "#F0B429" : 
    status === "REJECTED" ? "#D64545" :
    "#999999";

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[-100]">
      <div className="absolute top-0 left-[-9999px]">
        <div
          ref={templateRef}
          className="bg-white text-slate-900 p-0 mx-auto overflow-hidden shadow-2xl transition-all duration-500"
          style={{ width: "850px", minHeight: "1200px", fontFamily: "'Inter', sans-serif" }}
        >
          {/* Header Section */}
          <div style={{ backgroundColor: DARK_BLUE }} className="h-[140px] px-16 flex justify-between items-center relative">
             <div className="flex flex-col">
                <h1 className="text-white text-4xl font-black tracking-tighter m-0 uppercase">Service Quotation</h1>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-[0.3em] mt-2">Strategic Project Agreement</p>
             </div>
             <div className="text-right text-white space-y-1">
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mb-1">Document Date</p>
                <p className="text-xl font-black">{format(new Date(), "dd MMMM, yyyy")}</p>
             </div>
          </div>

          <div className="p-16">
            {/* Introduction Box */}
            <div style={{ backgroundColor: LIGHT_BLUE }} className="mb-12 p-8 rounded-[2rem] border border-[#B0CFE0] italic text-slate-600 text-sm leading-loose relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 blur-3xl -mr-12 -mt-12" />
                <p className="mb-4 relative z-10">
                    This Strategic Service Agreement is formalized on this{" "}
                    <span className="font-bold text-slate-900 underline decoration-[#B0CFE0] decoration-2">{format(new Date(), "do")}</span> day of{" "}
                    <span className="font-bold text-slate-900 underline decoration-[#B0CFE0] decoration-2">{format(new Date(), "MMMM, yyyy")}</span>.
                </p>
                <div className="grid grid-cols-[auto_1fr] gap-4 mb-4 relative z-10">
                    <span style={{ color: DARK_BLUE }} className="font-black uppercase text-[10px] mt-1 tracking-widest">Provider</span>
                    <p>
                        <strong className="text-slate-900 leading-none">Rangdhanu IT</strong>, an elite software development firm specializing in bespoke digital solutions, 
                        headquartered in Dhaka, Bangladesh.
                    </p>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-4 relative z-10">
                    <span style={{ color: DARK_BLUE }} className="font-black uppercase text-[10px] mt-1 tracking-widest">Recipient</span>
                    <div>
                        <p className="font-bold text-slate-900">{data.clientName || "[Client Name]"}</p>
                        <p className="text-xs mt-1 font-medium opacity-70">{data.clientAddress} • {data.clientPhone}</p>
                    </div>
                </div>
            </div>

            {/* Project Architecture */}
            <div className="grid grid-cols-2 gap-12 mb-12">
                <div className="col-span-2 border-l-[6px] pl-8 py-2" style={{ borderColor: DARK_BLUE }}>
                    <h2 style={{ color: DARK_BLUE }} className="text-[10px] font-black uppercase tracking-[0.4em] mb-3">Project Architecture</h2>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{data.projectName || "Conceptual Project"}</h3>
                </div>
                
                <div className="space-y-8">
                    <section>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Technical Description</h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">{data.description || "Project scope definition pending final review."}</p>
                    </section>
                    <section>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Timeline & Execution</h4>
                        <div className="flex gap-12 text-sm">
                            <div className="flex flex-col">
                                <span style={{ color: DARK_BLUE }} className="text-[10px] font-black uppercase tracking-widest opacity-60">Kickoff</span>
                                <span className="font-black text-slate-800 mt-1">{data.startDate ? format(new Date(data.startDate), "dd MMM yyyy") : "Immediate"}</span>
                            </div>
                            <div className="flex flex-col">
                                <span style={{ color: DARK_BLUE }} className="text-[10px] font-black uppercase tracking-widest opacity-60">Completion</span>
                                <span className="font-black text-slate-800 mt-1">{data.endDate ? format(new Date(data.endDate), "dd MMM yyyy") : "Project Dependent"}</span>
                            </div>
                        </div>
                    </section>
                </div>

                <div style={{ backgroundColor: DARK_BLUE }} className="text-white p-10 rounded-[2.5rem] shadow-xl shadow-indigo-100/50">
                    <h4 className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Core Deliverables</h4>
                    <ul className="space-y-4">
                        {(data.deliverables || "Core system components").split(',').map((item, i) => (
                            <li key={i} className="text-xs flex gap-4 font-medium opacity-90 items-start">
                                <span className="text-indigo-400 font-black mt-0.5">❯</span> 
                                <span>{item.trim()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Financial Investment */}
            <div className="mb-16">
                <h2 style={{ color: DARK_BLUE }} className="text-[10px] font-black uppercase tracking-[0.4em] mb-8">Financial Investment</h2>
                <div className="grid grid-cols-4 gap-6">
                    <div style={{ backgroundColor: DARK_BLUE }} className="col-span-2 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-900/20">
                        <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em]">Total Project Valuation</span>
                        <p className="text-5xl font-black mt-3 tracking-tighter">
                            {data.totalCost?.toLocaleString()} <span className="text-sm font-bold text-indigo-400">tk</span>
                        </p>
                    </div>
                    <div style={{ backgroundColor: SOFT_GRAY }} className="p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-center items-center text-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Advance</span>
                        <p className="text-2xl font-black text-slate-800 mt-1">{data.advancePercentage}%</p>
                    </div>
                    <div style={{ backgroundColor: ROW_BLUE }} className="p-8 rounded-[2.5rem] border border-[#B0CFE0] flex flex-col justify-center items-center text-center">
                        <span style={{ color: DARK_BLUE }} className="text-[9px] font-bold uppercase tracking-widest opacity-60">Completion</span>
                        <p style={{ color: DARK_BLUE }} className="text-2xl font-black mt-1">{data.completionPercentage}%</p>
                    </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-50 pt-8">
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Method: {data.paymentMethod}</span>
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Revisions: {data.revisions} Rounds</span>
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Priority Support: {data.supportDays} Days</span>
                </div>
            </div>

            {/* Status Seal */}
            <div className="absolute right-12 bottom-48">
                <div 
                    style={{ 
                        borderColor: statusColor, 
                        color: statusColor,
                        transform: "rotate(-15deg)",
                        opacity: 0.6
                    }}
                    className="border-[6px] rounded-3xl px-10 py-4 flex flex-col items-center justify-center font-black select-none pointer-events-none"
                >
                    <span className="text-4xl tracking-tighter uppercase">{status}</span>
                    <div style={{ backgroundColor: statusColor }} className="h-1.5 w-full mt-2 rounded-full opacity-30" />
                    <span className="text-[10px] tracking-[0.4em] font-black mt-2 opacity-60 uppercase">Official Project Record</span>
                </div>
            </div>

            {/* Terms & Intellectual Property */}
            <div className="grid grid-cols-2 gap-16 text-[11px] text-slate-400 mb-20 leading-relaxed border-t border-slate-50 pt-16">
                <section>
                    <h4 style={{ color: DARK_BLUE }} className="font-black uppercase mb-3 tracking-widest">Intellectual Property</h4>
                    <p>Full digital assets and source code ownership transfer to the client upon 100% financial settlement. Rangdhanu IT retains the right to use non-sensitive architectural highlights for self-promotional purposes.</p>
                </section>
                <section>
                    <h4 style={{ color: DARK_BLUE }} className="font-black uppercase mb-3 tracking-widest">Project Termination</h4>
                    <p>Work commenced implies non-refundable initial strategic investment. Termination requires 7 days notice. Mutual respect and agile collaboration are prioritized throughout the execution lifecycle.</p>
                </section>
            </div>

            {/* Signatures */}
            <div className="mt-auto pt-16 border-t-[3px] border-slate-50 grid grid-cols-2 gap-40">
                <div className="text-center">
                    <div className="h-20 flex items-end justify-center border-b-2 border-slate-100 mb-6 px-4">
                        <p className="text-sm font-serif italic text-slate-300">Authorized Digital Signature</p>
                    </div>
                    <p style={{ color: DARK_BLUE }} className="text-xs font-black text-center uppercase tracking-[0.3em]">Rangdhanu IT</p>
                    <p className="text-[10px] text-slate-400 text-center mt-2 font-bold tracking-widest uppercase">Service Provider</p>
                </div>
                <div className="text-center">
                    <div className="h-20 border-b-2 border-slate-100 mb-6 flex items-end justify-center font-bold text-slate-200">
                        <span className="text-xs italic uppercase tracking-tighter">Seal & Date</span>
                    </div>
                    <p className="text-xs font-black text-slate-900 text-center uppercase tracking-[0.3em]">{data.clientName || "Client Representative"}</p>
                    <p className="text-[10px] text-slate-400 text-center mt-2 font-bold tracking-widest uppercase">Acknowledged & Accepted</p>
                </div>
            </div>

            {/* Design Footer Stick */}
            <div 
                style={{ backgroundColor: DARK_BLUE }} 
                className="mt-20 h-12 -mx-16 mb-[-64px] flex items-center px-16 justify-between overflow-hidden"
            >
                <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.5em]">This Proposal is valid for 15 days from the date of issuance</p>
                <div className="flex gap-4">
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="w-1 h-1 rounded-full bg-white/40" />
                    <div className="w-1 h-1 rounded-full bg-white/60" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
