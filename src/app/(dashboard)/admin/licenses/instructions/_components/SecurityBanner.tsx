"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";

export const SecurityBanner: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 animate-in fade-in">
      <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
      <div className="text-xs space-y-1">
        <h4 className="font-bold text-amber-600 dark:text-amber-400">
          Security Best Practice Guarantee:
        </h4>
        <p className="text-muted-foreground leading-relaxed">
          1. Keep <code>RANGDHANU_LICENSE_API_KEY</code> in <code>.env</code>{" "}
          without <code>NEXT_PUBLIC_</code> prefix. This ensures Next.js never
          exposes the key to client browsers.
          <br />
          2. Rangdhanu IT server enforces dual verification matching both{" "}
          <strong>API Key + Domain Name</strong>, preventing stolen keys from
          being used on unauthorized websites.
        </p>
      </div>
    </div>
  );
};
