import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { BlogsList } from "@/app/(dashboard)/admin/blogs/_components/BlogsList";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";

export const metadata: Metadata = {
  title: "Blog Management | Admin Dashboard",
  description: "Manage your articles and blog posts from the admin dashboard.",
};

const AdminBlogsPage = async (props: {
  searchParams: Promise<TSearchParamsPromise>;
}) => {
  const searchParams = await props.searchParams;
  const params = (await searchParams) as Record<string, string>;

  return (
    <AdminPageWrapper>
      <BlogsList searchParams={params} />
    </AdminPageWrapper>
  );
};

export default AdminBlogsPage;
