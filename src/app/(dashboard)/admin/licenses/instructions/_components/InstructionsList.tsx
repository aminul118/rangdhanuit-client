"use client";

import React, { useState } from "react";
import { InstructionHeader } from "./InstructionHeader";
import { SecurityBanner } from "./SecurityBanner";
import { CodeBlock } from "./CodeBlock";
import { instructionTabs } from "./instructionSnippets";

export const InstructionsList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "env" | "checker" | "modal" | "layout" | "subscription" | "testing"
  >("env");

  const activeTabData =
    instructionTabs.find((t) => t.id === activeTab) || instructionTabs[0];

  return (
    <div className="space-y-6">
      <InstructionHeader activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Security Best Practices Banner (Only on Env tab) */}
      {activeTab === "env" && <SecurityBanner />}

      {/* Modular Code Block */}
      <CodeBlock filename={activeTabData.filename} code={activeTabData.code} />
    </div>
  );
};
