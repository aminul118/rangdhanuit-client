"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  filename: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ filename, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-md group">
      {/* Top Code Box Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900/90 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 font-mono text-zinc-300 font-semibold text-xs">
            {filename}
          </span>
        </div>

        {/* Copy Icon Button Inside Code Box Corner */}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition border border-zinc-700/50 flex items-center gap-1.5 text-[11px]"
          title="Copy snippet"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 animate-in zoom-in-50" />
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre className="p-6 font-mono text-xs text-zinc-200 overflow-x-auto leading-relaxed max-h-[580px]">
        {code}
      </pre>
    </div>
  );
};
