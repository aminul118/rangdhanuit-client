"use client";

import { useState, useEffect } from "react";
import { m as m } from "framer-motion";

const codeSnippet = `const Innovation = () => {
  const [vision, setVision] = useState("Clear");
  
  const buildFuture = (ideas: Idea[]) => {
    return ideas.map(idea => ({
      ...idea,
      status: "Optimized",
      impact: "Global"
    }));
  };

  return (
    <Project 
      name="Digital Horizons"
      velocity="Unmatched"
    />
  );
};`;

const CodeWindow = () => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    let timer: NodeJS.Timeout;
    let restartTimer: NodeJS.Timeout;
    let cancelled = false;

    const delayTimer = setTimeout(() => {
      timer = setInterval(() => {
        if (cancelled) return;
        if (index < codeSnippet.length) {
          setDisplayText(codeSnippet.substring(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
          restartTimer = setTimeout(() => {
            if (!cancelled) {
              setDisplayText("");
              setIsTyping(true);
            }
          }, 8000);
        }
      }, 120);
    }, 1000);

    return () => {
      cancelled = true;
      clearTimeout(delayTimer);
      if (timer) clearInterval(timer);
      if (restartTimer) clearTimeout(restartTimer);
    };
  }, []);

  // Simple syntax highlighter (regex-based for key terms)
  const highlightCode = (text: string) => {
    return text.split("\n").map((line, i) => (
      <div key={i} className="flex gap-4 group/line">
        <span className="w-4 text-right select-none text-[clamp(6px,1.8vw,10px)] font-mono text-muted-foreground/30 group-hover/line:text-muted-foreground/60 transition-colors">
          {i + 1}
        </span>
        <span className="font-mono text-[clamp(7px,2.2vw,14px)] whitespace-pre">
          {line
            .split(/(\s+|=|>|<|\(|\)|\{|\}|\[|\]|,|;|"|')/)
            .map((part, j) => {
              if (/const|useState|return|export|import/.test(part)) {
                return (
                  <span key={j} className="text-primary font-bold">
                    {part}
                  </span>
                );
              }
              if (/Innovation|Project|Future/.test(part)) {
                return (
                  <span key={j} className="text-violet-500 italic">
                    {part}
                  </span>
                );
              }
              if (/"[^"]*"|'[^']*'/.test(part)) {
                return (
                  <span key={j} className="text-emerald-500">
                    {part}
                  </span>
                );
              }
              if (/=>|\.\.\.|=/.test(part)) {
                return (
                  <span key={j} className="text-blue-500">
                    {part}
                  </span>
                );
              }
              if (/\d+/.test(part)) {
                return (
                  <span key={j} className="text-orange-500">
                    {part}
                  </span>
                );
              }
              return (
                <span
                  key={j}
                  className="text-foreground/80 dark:text-foreground/90"
                >
                  {part}
                </span>
              );
            })}
        </span>
      </div>
    ));
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-3xl shadow-2xl transition-all duration-500 hover:border-primary/30">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-muted/20">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/30 border border-green-500/50" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
            innovation-engine.tsx
          </span>
        </div>
        <div className="flex gap-1 opacity-20">
          <div className="w-3 h-0.5 bg-foreground" />
          <div className="w-3 h-0.5 bg-foreground" />
        </div>
      </div>

      {/* Editor Content */}
      <div className="px-2 py-6 md:p-8 min-h-[380px] max-h-[400px] scrollbar-hide md:overflow-y-hidden overflow-x-auto">
        {highlightCode(displayText)}
        {isTyping && (
          <m.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-1 h-3 md:w-2 md:h-5 bg-primary ml-1 translate-y-0.5"
          />
        )}
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:animate-shimmer pointer-events-none" />
    </div>
  );
};

export default CodeWindow;
