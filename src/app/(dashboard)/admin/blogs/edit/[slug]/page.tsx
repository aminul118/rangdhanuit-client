import { Metadata } from "next";
import { TParamsPromise } from "@/types";
import EditBlogForm from "@/components/modules/dashboard/admin/Blog/EditBlogForm";

interface EditBlogPageProps {
  params: TParamsPromise<{ slug: string }>;
}

export const metadata: Metadata = {
  title: "Edit Article | Admin Dashboard",
  description: "Modify your blog article content and settings.",
};

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-[calc(100vh-80px)] p-6">
      <EditBlogForm slug={slug} />
    </div>
  );
}
