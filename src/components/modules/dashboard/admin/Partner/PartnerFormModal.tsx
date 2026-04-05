"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PartnerForm from "./PartnerForm";
import { IPartner } from "@/types";
import { createPartner, updatePartner } from "@/services/Partner/partner";
import useActionHandler from "@/hooks/useActionHandler";

interface PartnerFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: IPartner | null;
}

const PartnerFormModal = ({
  isOpen,
  onOpenChange,
  initialData,
}: PartnerFormModalProps) => {
  const { executePost, isPending } = useActionHandler();
  const isEdit = !!initialData;

  const handleSubmit = async (formData: FormData) => {
    const action = isEdit
      ? () => updatePartner(initialData._id, formData)
      : () => createPartner(formData);

    await executePost({
      action,
      success: {
        message: isEdit
          ? "Partner updated successfully! Details are now current."
          : "Partner created successfully! Your collaboration is now live.",
        isRefresh: true,
        onSuccess: () => onOpenChange(false),
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="w-[95vw] max-w-5xl max-h-[92vh] flex flex-col overflow-hidden bg-background/95 backdrop-blur-3xl border-white/5 rounded-[2.5rem] p-0 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border"
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div className="bg-linear-to-br from-primary via-primary/80 to-primary/60 p-10 text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)] transition-all duration-700" />
            <DialogHeader className="relative z-10">
              <DialogTitle className="text-3xl font-black tracking-tighter">
                {isEdit ? "Edit Partner" : "Add Partner"}
              </DialogTitle>
              <DialogDescription className="text-primary-foreground/70 text-sm mt-3 font-medium uppercase tracking-[0.2em] max-w-md">
                {isEdit
                  ? "Update your collaboration profile for maximum visibility."
                  : "Initialize a new strategic partnership in your network."}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-8">
            <PartnerForm
              initialData={initialData || undefined}
              onSubmit={handleSubmit}
              loading={isPending}
              submitLabel={isEdit ? "Update Partner" : "Create Partner"}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerFormModal;
