import { ReactNode } from "react";
import TableWrapper from "@/components/common/layouts/TableWrapper";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMeta } from "@/components/common/pagination/TablePagination";

interface ManagementListWrapperProps {
  children: ReactNode;
  title: string;
  description: string;
  meta?: IMeta;
  addBtn?: {
    label: string;
    link: string;
    icon?: ReactNode;
  };
  modal?: ReactNode;
}

export const ManagementListWrapper = ({
  children,
  title,
  description,
  meta,
  addBtn,
  modal,
}: ManagementListWrapperProps) => {
  return (
    <TableWrapper
      title={title}
      description={description}
      meta={meta}
      action={
        modal ||
        (addBtn && (
          <Link href={addBtn.link}>
            <Button className="bg-primary hover:opacity-90 transition-all rounded-2xl h-11 px-6 font-bold shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)]">
              {addBtn.icon || <Plus className="mr-2" size={20} />}
              {addBtn.label}
            </Button>
          </Link>
        ))
      }
    >
      {children}
    </TableWrapper>
  );
};
