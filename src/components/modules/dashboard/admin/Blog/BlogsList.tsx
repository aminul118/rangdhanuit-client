import { getBlogs } from "@/services/Blog/blogs";
import BlogTable from "./BlogTable";
import TableWrapper from "@/components/common/wrapper/TableWrapper";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function BlogsList({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const res = await getBlogs(searchParams);
  const blogs = res?.data || [];
  const meta = res?.meta;

  return (
    <TableWrapper
      title="Blog Management"
      description="Create, edit, and manage your articles. Reach your audience with high-quality content."
      meta={meta}
      action={
        <Link href="/admin/blogs/add">
          <Button className="bg-primary hover:opacity-90 transition-all rounded-2xl h-11 px-6 font-bold shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)]">
            <Plus className="mr-2" size={20} />
            Write Article
          </Button>
        </Link>
      }
    >
      <BlogTable blogs={blogs} />
    </TableWrapper>
  );
}
