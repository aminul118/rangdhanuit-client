"use client";

import useSearchParamsValues from "@/hooks/useSearchParamsValues";
import { Suspense } from "react";

const EmailDisplayContent = () => {
  const { values } = useSearchParamsValues("email");
  const email = values.email || "";
  return <span className="text-indigo-400 font-bold">{email}</span>;
};

export const EmailDisplay = () => {
  return (
    <Suspense fallback={<span className="text-indigo-400 font-bold">...</span>}>
      <EmailDisplayContent />
    </Suspense>
  );
};
