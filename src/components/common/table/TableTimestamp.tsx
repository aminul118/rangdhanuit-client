"use client";

import React from "react";

interface TableTimestampProps {
  date?: string | number | Date;
}

const TableTimestamp = ({ date }: TableTimestampProps) => {
  if (!date) {
    return (
      <div className="flex flex-col gap-0.5 whitespace-nowrap opacity-40 italic text-[11px] font-medium text-muted-foreground">
        N/A
      </div>
    );
  }

  const d = new Date(date);

  return (
    <div className="flex flex-col gap-0.5 whitespace-nowrap group transition-all duration-300">
      <span className="text-[13px] font-bold text-foreground/90 group-hover:text-indigo-400 transition-colors">
        {d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>
      <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60 flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
        {d.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </span>
    </div>
  );
};

export default TableTimestamp;
