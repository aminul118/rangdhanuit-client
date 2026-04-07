import { Column } from "@/components/common/table/TableManageMent";
import { IPartner } from "@/types";
import Image from "next/image";
import PartnerActions from "./PartnerActions";
import TableTimestamp from "@/components/common/table/TableTimestamp";

const getPartnerTableColumns = (
  onEdit: (partner: IPartner) => void,
): Column<IPartner>[] => [
  {
    header: "SI",
    accessor: (_, i) => i + 1,
    sortKey: "createdAt",
    className: "w-12 text-center",
  },
  {
    header: "Logo",
    accessor: (p) => {
      const hasLogo = typeof p.logo === "string" && p.logo.trim() !== "";

      return (
        <div
          className="h-10 w-16 relative flex items-center justify-center bg-muted rounded-md p-1 border border-border/50"
          suppressHydrationWarning
        >
          {hasLogo ? (
            <Image
              src={p.logo!}
              alt={p.name}
              width={60}
              height={32}
              style={{ height: "auto" }}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="text-muted-foreground/50 font-bold text-xs">
              {p.name?.charAt(0).toUpperCase() || "P"}
            </div>
          )}
        </div>
      );
    },
    sortKey: "logo",
    className: "w-24",
  },
  {
    header: "Partner Name",
    accessor: (p) => (
      <div className="max-w-[200px]">
        <h4 className="text-foreground font-medium line-clamp-1">{p.name}</h4>
      </div>
    ),
    sortKey: "name",
    className: "min-w-[150px]",
  },
  {
    header: "Website Link",
    accessor: (p) =>
      p.link ? (
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline line-clamp-1 max-w-[200px] text-xs"
        >
          {p.link}
        </a>
      ) : (
        <span className="text-muted-foreground text-xs italic">No link</span>
      ),
    sortKey: "link",
    className: "min-w-[150px]",
  },
  {
    header: "Created At",
    accessor: (p) => <TableTimestamp date={p.createdAt} />,
    sortKey: "createdAt",
    className: "w-32",
  },
  {
    header: "Actions",
    accessor: (p) => <PartnerActions partner={p} onEdit={onEdit} />,
    className: "w-24 text-center",
  },
];

export default getPartnerTableColumns;
