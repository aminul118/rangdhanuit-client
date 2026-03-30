import { Metadata } from "next";
import { TParamsPromise } from "@/types";
import EditBlogForm from "@/components/modules/dashboard/admin/Blog/EditBlogForm";

interface EditBlogPageProps {
  params: TParamsPromise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Article | Admin Dashboard",
  description: "Modify your blog article content and settings.",
};

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-[calc(100vh-80px)] p-6">
      <EditBlogForm id={id} />
    </div>
  );
}
