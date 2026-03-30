'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteBlog } from '@/services/Blog/blogs';
import { IBlog } from '@/types';
import { Edit, MoreHorizontal, Trash, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const BlogActions = ({ blog }: { blog: IBlog }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        const res = await deleteBlog(blog._id as string);
        if (res.success) {
          toast.success('Blog deleted successfully');
          router.refresh();
        } else {
          toast.error(res.message || 'Failed to delete blog');
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to delete blog';
        toast.error(message);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => window.open(`/blogs/${blog.slug}`, '_blank')}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/admin/blogs/edit/${blog._id}`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BlogActions;
