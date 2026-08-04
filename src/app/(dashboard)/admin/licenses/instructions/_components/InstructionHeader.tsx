"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { instructionTabs } from "./instructionSnippets";

interface InstructionHeaderProps {
  activeTab: string;
  onSelectTab: (
    tabId: "env" | "checker" | "modal" | "layout" | "subscription",
  ) => void;
}

export const InstructionHeader: React.FC<InstructionHeaderProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 p-6 sm:p-8 rounded-3xl border border-border/80 relative shadow-xs">
      <Link
        href="/admin/licenses"
        className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Licenses Table
      </Link>

      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white shadow-md shadow-primary/20">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            License Setup & Security Guide{" "}
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20">
              100% Server Secure 🔒
            </span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Follow this 5-step setup guide. Copy-paste snippets into any client
            project to issue licenses and display subscription history.
          </p>
        </div>
      </div>

      {/* Step Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
        {instructionTabs.map((t, idx) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTab(t.id as any)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-card text-primary border-primary shadow-sm shadow-primary/10 ring-2 ring-primary/20"
                  : "bg-card/40 text-muted-foreground border-border/60 hover:bg-card hover:text-foreground"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {idx + 1}
              </span>
              <span className="truncate">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
