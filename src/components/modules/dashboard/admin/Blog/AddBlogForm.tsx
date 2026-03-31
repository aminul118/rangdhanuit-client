"use client";

import { createBlog } from "@/services/Blog/blogs";
import BlogForm from "./BlogForm";
import CreationHeader from "@/components/common/wrapper/CreationHeader";

import useActionHandler from "@/hooks/useActionHandler";

const AddBlogForm = () => {
  const { executePost, isPending } = useActionHandler();

  const handleCreate = async (formData: FormData) => {
    await executePost({
      action: () => createBlog(formData),
      success: {
        message: "Blog published successfully!",
        redirectPath: "/admin/blogs",
        isRefresh: true,
      },
    });
  };

  return (
    <div className="container mx-auto pb-32 px-4 md:px-0">
      <CreationHeader
        title="Write New Article"
        subtitle="Share your thoughts and expertise with the world. Your content will be automatically optimized for reading."
        backLink="/admin/blogs"
      />

      <BlogForm
        onSubmit={handleCreate}
        loading={isPending}
        submitLabel="Publish Article"
      />
    </div>
  );
};

export default AddBlogForm;
