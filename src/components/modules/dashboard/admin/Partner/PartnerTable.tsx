"use client";

import { useState } from "react";
import TableManageMent from "@/components/common/table/TableManageMent";
import getPartnerTableColumns from "./PartnerTableColumn";
import { IPartner } from "@/types";
import PartnerFormModal from "./PartnerFormModal";

interface PartnerTableProps {
  partners: IPartner[];
}

const PartnerTable = ({ partners }: PartnerTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<IPartner | null>(null);

  const handleEdit = (partner: IPartner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const handleModalChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) setSelectedPartner(null);
  };

  const columns = getPartnerTableColumns(handleEdit);

  return (
    <>
      <TableManageMent
        columns={columns}
        data={partners}
        getRowKey={(p) => p._id!}
        emptyMessage="No partners found. Showcase your collaborations by adding partners!"
      />

      <PartnerFormModal
        isOpen={isModalOpen}
        onOpenChange={handleModalChange}
        initialData={selectedPartner}
      />
    </>
  );
};

export default PartnerTable;
