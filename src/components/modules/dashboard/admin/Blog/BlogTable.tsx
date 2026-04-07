"use client";

import TableManageMent from "@/components/common/table/TableManageMent";
import BlogTableColumn from "./BlogTableColumn";
import { IBlog } from "@/types";

interface BlogTableProps {
  blogs: IBlog[];
}

const BlogTable = ({ blogs }: BlogTableProps) => {
  return (
    <TableManageMent
      columns={BlogTableColumn}
      data={blogs}
      getRowKey={(b) => b._id!}
      emptyMessage="No blogs found. Start by writing your first article!"
    />
  );
};

export default BlogTable;
