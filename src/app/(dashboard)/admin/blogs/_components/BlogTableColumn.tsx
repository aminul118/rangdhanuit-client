import { Column } from "@/components/common/table/TableManageMent";
import { IBlog } from "@/types";
import Image from "next/image";
import BlogActions from "./BlogActions";
import TableTimestamp from "@/components/common/table/TableTimestamp";
import { TableBadge } from "@/components/common/table/TableBadge";
import { Star } from "lucide-react";

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
    header: "Featured",
    accessor: (b) => (
      <div className="flex items-center justify-center">
        {b.isFeatured ? (
          <Star size={16} className="fill-amber-400 text-amber-400" />
        ) : (
          <Star size={16} className="text-muted-foreground/30" />
        )}
      </div>
    ),
    sortKey: "isFeatured",
    className: "w-20 text-center",
  },
  {
    header: "Category",
    accessor: (b) => <TableBadge>{b.category}</TableBadge>,
    sortKey: "category",
    className: "w-32",
  },
  {
    header: "Status",
    accessor: (b) => <TableBadge status={b.status}>{b.status}</TableBadge>,
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
