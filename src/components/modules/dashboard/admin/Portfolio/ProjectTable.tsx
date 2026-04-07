"use client";

import TableManageMent from "@/components/common/table/TableManageMent";
import ProjectTableColumn from "./ProjectTableColumn";
import { IPortfolio } from "@/types";

interface ProjectTableProps {
  portfolios: IPortfolio[];
}

const ProjectTable = ({ portfolios }: ProjectTableProps) => {
  return (
    <TableManageMent
      columns={ProjectTableColumn}
      data={portfolios}
      getRowKey={(p) => p._id!}
      emptyMessage="No projects found. Start by adding one!"
    />
  );
};

export default ProjectTable;
