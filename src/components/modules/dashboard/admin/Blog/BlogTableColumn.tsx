"use client";

import { Column } from "@/components/common/table/TableManageMent";
import { IBlog } from "@/types";
import Image from "next/image";
import BlogActions from "./BlogActions";
import { Badge } from "@/components/ui/badge";
import TableTimestamp from "@/components/common/table/TableTimestamp";

const BlogTableColumn: Column<IBlog>[] = [
  {
    header: "SI",
    accessor: (_, i) => i + 1,
    sortKey: "createdAt",
    className: "w-12 text-center",
  },
  {
    header: "Cover",
    accessor: (b) =>
      b.featuredImage ? (
        <Image
          src={b.featuredImage}
          alt={b.title}
          width={60}
          height={40}
          className="h-10 w-16 rounded-md object-cover border border-border/50"
        />
      ) : (
        <div className="h-10 w-16 bg-muted rounded-md flex items-center justify-center text-[10px] text-muted-foreground border border-border/50">
          No Image
        </div>
      ),
    sortKey: "featuredImage",
    className: "w-20",
  },
  {
    header: "Title",
    accessor: (b) => (
      <div className="max-w-[300px]">
        <h4 className="text-foreground line-clamp-1">{b.title}</h4>
      </div>
    ),
    sortKey: "title",
    className: "min-w-[200px]",
  },
  {
    header: "Category",
    accessor: (b) => (
      <Badge
        variant="outline"
        className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors"
      >
        {b.category}
      </Badge>
    ),
    sortKey: "category",
    className: "w-32",
  },
  {
    header: "Status",
    accessor: (b) => (
      <Badge
        variant={b.status === "PUBLISHED" ? "default" : "secondary"}
        className={
          b.status === "PUBLISHED"
            ? "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20 shadow-none"
            : "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20 shadow-none"
        }
      >
        {b.status}
      </Badge>
    ),
    sortKey: "status",
    className: "w-24",
  },
  {
    header: "Views",
    accessor: (b) => b.views.toLocaleString(),
    sortKey: "views",
    className: "w-24 text-center",
  },
  {
    header: "Created At",
    accessor: (b) => <TableTimestamp date={b.createdAt} />,
    sortKey: "createdAt",
    className: "w-32",
  },
  {
    header: "Actions",
    accessor: (b) => <BlogActions blog={b} />,
    className: "w-24 text-center",
  },
];

export default BlogTableColumn;
