import { IService } from "@/types";
import TableTimestamp from "@/components/common/table/TableTimestamp";
import Image from "next/image";
import {
  Laptop,
  Smartphone,
  Compass,
  Palette,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { Column } from "@/components/common/table/TableManageMent";
import { TableActionDropdown } from "@/components/common/table/TableActionDropdown";
import { ApiResponse } from "@/types";

const IconMap: Record<string, React.ElementType> = {
  Laptop,
  Smartphone,
  Compass,
  Palette,
  TrendingUp,
  ShieldCheck,
};

export const ServiceTableColumns = (
  handleDelete: (slug: string) => Promise<ApiResponse<unknown>>,
): Column<IService>[] => [
    {
      header: "Service",
      sortKey: "title",
      accessor: (service: IService) => {
        const isUrlIcon = service.icon?.startsWith("http");
        const Icon = !isUrlIcon ? IconMap[service.icon] || Laptop : null;

        return (
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="48px"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {isUrlIcon ? (
                  <div className="relative w-6 h-6">
                    <Image
                      src={service.icon}
                      alt="icon"
                      fill
                      className="object-contain invert brightness-0"
                    />
                  </div>
                ) : (
                  Icon && <Icon size={16} className="text-white" />
                )}
              </div>
            </div>
            <div>
              <p className="font-bold text-sm leading-tight mb-1">
                {service.title}
              </p>
              <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-1.5">
                {isUrlIcon ? (
                  <div className="relative w-3 h-3 opacity-60">
                    <Image
                      src={service.icon}
                      alt="icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  Icon && <Icon size={10} className="text-primary" />
                )}
                <span className="truncate max-w-[100px]">
                  {isUrlIcon ? "Custom Optimized Icon" : service.icon}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Description",
      sortKey: "description",
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
            <TableActionDropdown
              viewLink={`/services/${service.slug}`}
              editLink={`/admin/services/edit/${service.slug}`}
              deleteAction={async () => handleDelete(service.slug)}
              deleteConfirmMessage="Are you sure you want to delete this service? This action cannot be undone."
              deleteSuccessMessage="Service successfully removed from the portal."
            />
          </div>
        );
      },
    },
  ];
