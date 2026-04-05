"use client";

import { getBlogBySlug, updateBlogBySlug } from "@/services/Blog/blogs";
import BlogForm from "./BlogForm";
import useActionHandler from "@/hooks/useActionHandler";
import { IBlog } from "@/types";
import { EditFormWrapper } from "@/components/common/layouts/EditFormWrapper";

interface EditBlogFormProps {
  slug: string;
  initialData?: IBlog;
}

const EditBlogForm = ({ slug, initialData }: EditBlogFormProps) => {
  const { executePost, isPending } = useActionHandler();

  const handleUpdate = async (formData: FormData) => {
    await executePost({
      action: () => updateBlogBySlug(slug, formData),
      success: {
        message: "Blog updated successfully!",
        redirectPath: "/admin/blogs",
        isRefresh: true,
      },
    });
  };

  return (
    <EditFormWrapper<IBlog>
      id={slug}
      initialData={initialData}
      fetcher={getBlogBySlug}
      title="Edit Blog Post"
      subtitle="Refine your article for maximum engagement. Review your content, images, and SEO metadata before republishing."
      backLink="/admin/blogs"
    >
      {(blog: IBlog) => (
        <BlogForm
          onSubmit={handleUpdate}
          loading={isPending}
          submitLabel="Update Blog"
          initialData={blog}
        />
      )}
    </EditFormWrapper>
  );
};

export default EditBlogForm;
