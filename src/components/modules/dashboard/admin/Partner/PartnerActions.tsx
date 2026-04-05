import { deletePartner } from "@/services/Partner/partner";
import { IPartner } from "@/types";
import { TableActionDropdown } from "@/components/common/table/TableActionDropdown";
import { ExternalLink, Edit } from "lucide-react";

interface PartnerActionsProps {
  partner: IPartner;
  onEdit: (partner: IPartner) => void;
}

const PartnerActions = ({ partner, onEdit }: PartnerActionsProps) => {
  return (
    <TableActionDropdown
      deleteAction={async () => await deletePartner(partner._id)}
      deleteConfirmMessage={`Are you sure you want to delete ${partner.name}? This action will permanently remove them from your partner list.`}
      deleteSuccessMessage="Partner deleted successfully."
      customItems={[
        {
          label: "Edit Details",
          onClick: () => onEdit(partner),
          icon: Edit,
          className: "focus:text-indigo-500 focus:bg-indigo-500/10",
        },
        ...(partner.link
          ? [
              {
                label: "Visit Website",
                href: partner.link,
                icon: ExternalLink,
                className: "focus:text-blue-500 focus:bg-blue-500/10",
              } as const,
            ]
          : []),
      ]}
    />
  );
};

export default PartnerActions;
