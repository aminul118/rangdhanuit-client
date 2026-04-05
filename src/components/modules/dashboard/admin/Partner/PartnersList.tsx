"use client";

import { useState } from "react";
import PartnerTable from "./PartnerTable";
import { ManagementListWrapper } from "@/components/common/layouts/ManagementListWrapper";
import { IPartner, IMeta } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PartnerFormModal from "./PartnerFormModal";

interface PartnersListProps {
  partners: IPartner[];
  meta?: IMeta;
}

export const PartnersList = ({ partners, meta }: PartnersListProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <ManagementListWrapper
        title="Partner Management"
        description="Manage your business partners and showcase their logos on the website."
        meta={meta}
        modal={
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary hover:opacity-90 transition-all rounded-2xl h-11 px-6 font-bold shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)]"
          >
            <Plus className="mr-2" size={20} />
            Add Partner
          </Button>
        }
      >
        <PartnerTable partners={partners} />
      </ManagementListWrapper>

      <PartnerFormModal
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
    </>
  );
};
