"use client";

import { createBlog } from "@/services/Blog/blogs";
import BlogForm from "./BlogForm";
import useActionHandler from "@/hooks/useActionHandler";
import FormLayout from "@/components/common/layouts/FormLayout";

/**
 * Standard Creation Form for Blog Articles.
 * Uses the unified Action Handler and Form Layout.
 */
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
    <FormLayout
      title="Draft New Insight"
      subtitle="Share your technical expertise or industry trends. Your perspective helps build authority in the digital space."
      backLink="/admin/blogs"
    >
      <BlogForm
        onSubmit={handleCreate}
        loading={isPending}
        submitLabel="Publish Post"
      />
    </FormLayout>
  );
};

export default AddBlogForm;
