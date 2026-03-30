import { IService } from "@/types/Service/service.types";
import TableTimestamp from "@/components/common/table/TableTimestamp";
import Image from "next/image";
import {
  Laptop,
  Smartphone,
  Compass,
  Palette,
  TrendingUp,
  ShieldCheck,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Column } from "@/components/common/table/TableManageMent";

const IconMap: Record<string, React.ElementType> = {
  Laptop,
  Smartphone,
  Compass,
  Palette,
  TrendingUp,
  ShieldCheck,
};

export const ServiceTableColumns = (
  handleDelete: (id: string) => void,
): Column<IService>[] => [
  {
    header: "Service",
    sortKey: "title",
    accessor: (service: IService) => {
      const Icon = IconMap[service.icon] || Laptop;
      return (
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon size={16} className="text-white" />
            </div>
          </div>
          <div>
            <p className="font-bold text-sm leading-tight mb-1">
              {service.title}
            </p>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-1">
              <Icon size={10} className="text-indigo-400" />
              {service.icon}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    header: "Description",
    accessor: (service: IService) => (
      <div className="max-w-[300px]">
        <p className="text-xs text-muted-foreground line-clamp-1 italic">
          &quot;{service.description}&quot;
        </p>
      </div>
    ),
  },
  {
    header: "Timeline",
    sortKey: "createdAt",
    accessor: (service: IService) => (
      <TableTimestamp date={service.createdAt} />
    ),
  },
  {
    header: "Actions",
    className: "text-right",
    accessor: (service: IService) => {
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-indigo-500/10 hover:text-indigo-500 rounded-full"
              >
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 p-2 rounded-2xl border-white/10 bg-background/80 backdrop-blur-xl"
            >
              <DropdownMenuItem asChild>
                <Link
                  href={`/services/${service.slug}`}
                  target="_blank"
                  className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View Public</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/admin/services/edit/${service._id}`}
                  className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-xl hover:bg-indigo-500/10 hover:text-indigo-500 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Details</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(service._id)}
                className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-xl text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Service</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
