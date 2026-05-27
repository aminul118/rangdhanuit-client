import { ReactNode } from "react";

interface AdminPageWrapperProps {
  children: ReactNode;
  padding?: string;
}

export const AdminPageWrapper = ({
  children,
  padding = "",
}: AdminPageWrapperProps) => {
  return (
    <div className={`min-h-[calc(100vh-80px)] ${padding}`}>{children}</div>
  );
};
