"use client";

import { getBlogById, updateBlog } from "@/services/Blog/blogs";
import BlogForm from "./BlogForm";
import useActionHandler from "@/hooks/useActionHandler";
import { EditFormWrapper } from "@/components/common/wrapper/EditFormWrapper";
import { IBlog } from "@/types";

const EditBlogForm = ({ id }: { id: string }) => {
  const { executePost, isPending } = useActionHandler();

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

  return (
    <EditFormWrapper<IBlog>
      id={id}
      fetcher={getBlogById}
      title="Edit Existing Article"
      subtitle="Refine your content and settings to reflect your latest insights."
      backLink="/admin/blogs"
      notFoundMessage="The article you looking for might have been removed or moved."
    >
      {(blog: IBlog) => (
        <BlogForm
          key={blog._id}
          initialData={blog}
          onSubmit={handleUpdate}
          loading={isPending}
          submitLabel="Update Article"
        />
      )}
    </EditFormWrapper>
  );
};

export default EditBlogForm;
