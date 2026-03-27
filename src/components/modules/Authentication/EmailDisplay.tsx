"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EmailDisplayContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  return <span className="text-indigo-400 font-bold">{email}</span>;
}

export function EmailDisplay() {
  return (
    <Suspense fallback={<span className="text-indigo-400 font-bold">...</span>}>
      <EmailDisplayContent />
    </Suspense>
  );
}
