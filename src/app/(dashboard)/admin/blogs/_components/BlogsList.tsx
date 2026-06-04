import { getBlogs } from "@/services/Blog/blogs";
import BlogTable from "./BlogTable";
import { ManagementListWrapper } from "@/components/common/layouts/ManagementListWrapper";

export const BlogsList = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const res = await getBlogs(searchParams);
  const blogs = res?.data || [];
  const meta = res?.meta;

  return (
    <ManagementListWrapper
      title="Blog Management"
      description="Create, edit, and manage your articles. Reach your audience with high-quality content."
      meta={meta}
      addBtn={{
        label: "Write Article",
        link: "/admin/blogs/add",
      }}
    >
      <BlogTable blogs={blogs} />
    </ManagementListWrapper>
  );
};
