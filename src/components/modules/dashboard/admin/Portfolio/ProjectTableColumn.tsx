"use client";

import { Column } from "@/components/common/table/TableManageMent";
import { IPortfolio } from "@/types";
import Image from "next/image";
import ProjectActions from "./ProjectActions";
import TableTimestamp from "@/components/common/table/TableTimestamp";

const ProjectTableColumn: Column<IPortfolio>[] = [
  {
    header: "SI",
    accessor: (_, i) => i + 1,
    sortKey: "createdAt",
  },
  {
    header: "Thumbnail",
    accessor: (p) =>
      p.thumbnail ? (
        <Image
          src={p.thumbnail}
          alt={p.title}
          width={60}
          height={40}
          className="h-8 rounded-md object-cover"
        />
      ) : (
        <div className="h-8 w-12 bg-muted rounded-md" />
      ),
    sortKey: "thumbnail",
  },
  {
    header: "Title",
    accessor: (p) => p.title,
    sortKey: "title",
  },
  {
    header: "Featured",
    accessor: (p) =>
      p.isFeatured ? (
        <span className="text-green-600 font-medium">Yes</span>
      ) : (
        <span className="text-gray-500">No</span>
      ),
    sortKey: "isFeatured",
  },
  {
    header: "Date & Time",
    accessor: (p) => <TableTimestamp date={p.createdAt} />,
    sortKey: "createdAt",
  },
  {
    header: "Actions",
    accessor: (p) => <ProjectActions project={p} />,
  },
];

export default ProjectTableColumn;
