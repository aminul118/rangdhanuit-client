import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { BlogsList } from "@/components/modules/dashboard/admin/Blog/BlogsList";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";

export const metadata: Metadata = {
  title: "Blog Management | Admin Dashboard",
  description: "Manage your articles and blog posts from the admin dashboard.",
};

const AdminBlogsPage = async ({
  searchParams,
}: {
  searchParams: TSearchParamsPromise;
}) => {
  const params = (await searchParams) as Record<string, string>;

  return (
    <AdminPageWrapper
      skeletonColumns={[
        { width: "w-12" }, // SI
        { width: "w-16" }, // Cover
        { width: "w-full" }, // Title
        { width: "w-32" }, // Category
        { width: "w-24" }, // Status
        { width: "w-24" }, // Views
        { width: "w-10" }, // Actions
      ]}
    >
      <BlogsList searchParams={params} />
    </AdminPageWrapper>
  );
};

export default AdminBlogsPage;
