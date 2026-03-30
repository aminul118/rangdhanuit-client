import { Suspense } from "react";
import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { BlogsList } from "@/components/modules/dashboard/admin/Blog/BlogsList";
import { TableSkeleton } from "@/components/common/loader/TableSkeleton";

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
    <div className="min-h-[calc(100vh-80px)] p-6">
      <Suspense
        fallback={
          <TableSkeleton
            columns={[
              { width: "w-12" }, // SI
              { width: "w-16" }, // Cover
              { width: "w-full" }, // Title
              { width: "w-32" }, // Category
              { width: "w-24" }, // Status
              { width: "w-24" }, // Views
              { width: "w-10" }, // Actions
            ]}
          />
        }
      >
        <BlogsList searchParams={params} />
      </Suspense>
    </div>
  );
};

export default AdminBlogsPage;
