"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { isValidImageSrc } from "@/lib/utils";
import SingleImageUploader from "@/components/ui/single-image-uploader";
import { IPartner } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import SubmitButton from "@/components/common/form/SubmitButton";
import { Save, Plus, Building2 } from "lucide-react";
import { FaGlobe } from "react-icons/fa";

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
  const isEdit = !!initialData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (image) form.append("image", image);
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-border/50 shadow-sm bg-card/50">
        <CardHeader>
          <CardTitle>Partner Details</CardTitle>
          <CardDescription>
            Basic information about the partnership.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
              <Building2 size={14} /> Partner Name{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              name="name"
              defaultValue={initialData?.name}
              placeholder="e.g. Google, Microsoft, TechCorp"
              className="text-base h-12 font-medium"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
              <FaGlobe size={14} /> Website URL
            </Label>
            <Input
              name="link"
              defaultValue={initialData?.link}
              placeholder="https://partner-website.com"
              className="h-11"
            />
          </div>

          <div className="space-y-4 pt-6 mt-6 border-t border-border/50">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
              Partner Logo Image <span className="text-destructive">*</span>
            </Label>
            <div className="max-w-md">
              <SingleImageUploader
                defaultValue={
                  isValidImageSrc(initialData?.logo)
                    ? initialData?.logo
                    : undefined
                }
                onChange={setImage}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-2">
        <div className="w-full sm:w-auto">
          <SubmitButton
            label={isEdit ? "Update Partner" : submitLabel}
            loadingLabel={isEdit ? "Updating..." : "Saving..."}
            isLoading={loading}
            icon={isEdit ? <Save size={18} /> : <Plus size={18} />}
            size="lg"
            className="w-full sm:w-64"
          />
        </div>
      </div>
    </form>
  );
};

export default PartnerForm;
