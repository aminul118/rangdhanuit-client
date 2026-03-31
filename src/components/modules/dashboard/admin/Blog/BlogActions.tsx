import { deleteBlog } from '@/services/Blog/blogs';
import { IBlog } from '@/types';
import { TableActionDropdown } from "@/components/common/table/TableActionDropdown";

const BlogActions = ({ blog }: { blog: IBlog }) => {
  return (
    <TableActionDropdown
      viewLink={`/blogs/${blog.slug}`}
      editLink={`/admin/blogs/edit/${blog._id}`}
      deleteAction={() => deleteBlog(blog._id as string)}
      deleteConfirmMessage="Are you sure you want to delete this blog?"
      deleteSuccessMessage="Blog post removed successfully from the portal."
    />
  );
};

export default BlogActions;
