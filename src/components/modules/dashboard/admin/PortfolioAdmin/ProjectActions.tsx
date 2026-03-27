'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deletePortfolio } from '@/services/Portfolio/portfolios';
import { IPortfolio } from '@/types';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const ProjectActions = ({ project }: { project: IPortfolio }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const res = await deletePortfolio(project._id);
        if (res.success) {
          toast.success('Project deleted successfully');
          router.refresh();
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to delete project';
        toast.error(message);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/admin/portfolios/edit/${project._id}`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectActions;
