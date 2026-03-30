"use client";

import { useEffect, useState } from "react";
import { getBlogById, updateBlog } from "@/services/Blog/blogs";
import { IBlog } from "@/types";
import { Loader2 } from "lucide-react";
import BlogForm from "./BlogForm";
import CreationHeader from "@/components/common/wrapper/CreationHeader";
import useActionHandler from "@/hooks/useActionHandler";

const EditBlogForm = ({ id }: { id: string }) => {
  const [fetching, setFetching] = useState(true);
  const [blog, setBlog] = useState<IBlog | null>(null);
  const { executePost, isPending } = useActionHandler();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        if (res.success) {
          setBlog(res.data);
        }
      } catch {
        // Error handled by getBlogById or toast
      } finally {
        setFetching(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (formData: FormData) => {
    await executePost({
       action: () => updateBlog(id, formData),
       success: {
         message: "Blog updated successfully!",
         redirectPath: "/admin/blogs",
         isRefresh: true
       }
    });
  };

  if (fetching) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-32 glass-premium rounded-[3rem] border border-white/5 mx-auto max-w-4xl">
        <h2 className="text-3xl font-black tracking-tight text-white/90">Article not found</h2>
        <p className="text-zinc-500 mt-4 font-bold">The article you looking for might have been removed or moved.</p>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto pb-32 px-4 md:px-0">
      <CreationHeader 
        title="Edit Existing Article"
        subtitle={`Currently refining "${blog.title}". Update the content and settings to reflect your latest insights.`}
        backLink="/admin/blogs"
      />

      <BlogForm
        key={blog._id}
        initialData={blog}
        onSubmit={handleUpdate}
        loading={isPending}
        submitLabel="Update Article"
      />
    </div>
  );
};

export default EditBlogForm;
