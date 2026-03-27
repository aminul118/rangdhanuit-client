'use client';

import { Column } from '@/components/common/table/TableManageMent';
import { IPortfolio } from '@/types';
import Image from 'next/image';
import ProjectActions from './ProjectActions';

const ProjectTableColumn: Column<IPortfolio>[] = [
  {
    header: 'SI',
    accessor: (_, i) => i + 1,
  },
  {
    header: 'Thumbnail',
    accessor: (p) =>
      p.image ? (
        <Image
          src={p.image}
          alt={p.title}
          width={60}
          height={40}
          className="h-8 rounded-md object-cover"
        />
      ) : (
        <div className="h-8 w-12 bg-muted rounded-md" />
      ),
  },
  {
    header: 'Title',
    accessor: (p) => p.title,
    sortKey: 'title',
  },
  {
    header: 'Featured',
    accessor: (p) =>
      p.isFeatured ? (
        <span className="text-green-600 font-medium">Yes</span>
      ) : (
        <span className="text-gray-500">No</span>
      ),
  },
  {
    header: 'Date & Time',
    accessor: (p) => new Date(p.createdAt).toLocaleDateString(),
  },
  {
    header: 'Actions',
    accessor: (p) => <ProjectActions project={p} />,
  },
];

export default ProjectTableColumn;
