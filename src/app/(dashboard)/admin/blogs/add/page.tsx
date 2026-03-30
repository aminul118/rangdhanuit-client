import { Metadata } from "next";
import AddBlogForm from "@/components/modules/dashboard/admin/Blog/AddBlogForm";

export const metadata: Metadata = {
  title: "Write Article | Admin Dashboard",
  description: "Create a new blog post for your website.",
};

export default function AddBlogPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] p-6">
      <AddBlogForm />
    </div>
  );
}
