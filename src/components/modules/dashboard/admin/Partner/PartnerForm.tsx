"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { isValidImageSrc } from "@/lib/utils";
import SingleImageUploader from "@/components/ui/single-image-uploader";
import { IPartner } from "@/types";
import { CreationSuiteWrapper } from "@/components/common/layouts/CreationSuiteWrapper";

interface PartnerFormProps {
  initialData?: IPartner;
  onSubmit: (data: FormData) => Promise<void>;
  loading: boolean;
  submitLabel?: string;
}

const PartnerForm = ({
  initialData,
  onSubmit,
  loading,
  submitLabel = "Save Partner",
}: PartnerFormProps) => {
  const [image, setImage] = useState<File | string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (image) form.append("image", image);
    await onSubmit(form);
  };

  return (
    <CreationSuiteWrapper
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel={submitLabel}
      heroLabel="Partner Logo"
      variant="compact"
      heroImage={
        <SingleImageUploader
          defaultValue={
            isValidImageSrc(initialData?.logo) ? initialData?.logo : undefined
          }
          onChange={setImage}
          variant="compact"
        />
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="space-y-2.5">
          <Label
            htmlFor="name"
            className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground ml-1"
          >
            Partner Name
          </Label>
          <Input
            name="name"
            id="name"
            defaultValue={initialData?.name}
            placeholder="e.g. Google, Microsoft, TechCorp"
            required
          />
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="link"
            className="text-xs uppercase tracking-widest text-muted-foreground font-bold"
          >
            Website URL (Optional)
          </Label>
          <Input
            name="link"
            id="link"
            defaultValue={initialData?.link}
            placeholder="https://partner-website.com"
          />
        </div>
      </motion.div>
    </CreationSuiteWrapper>
  );
};

export default PartnerForm;
