"use client";

import { useState } from "react";
import { isValidImageSrc } from "@/lib/utils";
import { FormField } from "@/components/common/form";
import PlateRichEditor from "@/components/rich-text/core/rich-editor";
import { Label } from "@/components/ui/label";
import SingleImageUploader from "@/components/ui/single-image-uploader";
import { IService } from "@/types";
import { motion } from "framer-motion";
import { Info, Sparkles } from "lucide-react";
import { CreationSuiteWrapper } from "@/components/common/layouts/CreationSuiteWrapper";
import { Input } from "@/components/ui/input";

interface ServiceFormProps {
  initialData?: IService;
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
  submitLabel: string;
}

const ServiceForm = ({
  initialData,
  onSubmit,
  loading,
  submitLabel,
}: ServiceFormProps) => {
  const [content, setContent] = useState(initialData?.content || "");
  const [imageFile, setImageFile] = useState<File | string | null>(null);
  const [iconFile, setIconFile] = useState<File | string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("content", content);
    
    if (imageFile instanceof File) {
      form.append("image", imageFile);
    }
    if (iconFile instanceof File) {
      form.append("icon", iconFile);
    }
    
    await onSubmit(form);
  };

  return (
    <CreationSuiteWrapper
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel={submitLabel}
      heroLabel="Visual Background / Thumbnail"
      heroImage={
        <SingleImageUploader
          defaultValue={isValidImageSrc(initialData?.image) ? initialData?.image : undefined}
          onChange={setImageFile}
        />
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Title & Underline */}
        <div className="space-y-3">
          <Input
            id="title"
            name="title"
            defaultValue={initialData?.title || ""}
            placeholder="Define your technological excellence..."
            className="text-3xl md:text-4xl font-black border-none bg-transparent p-0 h-auto focus-visible:ring-0 placeholder:opacity-40 tracking-tighter"
          />
          <div className="h-0.5 w-full bg-border/20 relative">
            <div className="absolute left-0 top-0 h-full w-32 bg-linear-to-r from-primary to-transparent" />
          </div>
        </div>

        {/* Strategic Metadata: Icon & Teaser */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Icon Section (3 cols) */}
          <div className="md:col-span-4 space-y-4">
            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 ml-1.5 flex items-center gap-2">
              <Sparkles size={12} className="text-primary" />
              Service Icon
            </Label>
            <div className="p-4 rounded-[2rem] bg-background/50 border border-white/5 shadow-inner min-h-[160px] flex items-center justify-center">
               <SingleImageUploader
                defaultValue={isValidImageSrc(initialData?.icon) ? initialData?.icon : undefined}
                onChange={setIconFile}
              />
            </div>
          </div>

          {/* Teaser Section (8 cols) */}
          <div className="md:col-span-8 space-y-4">
            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 ml-1.5 flex items-center gap-2">
              <Info size={12} className="opacity-40" />
              Concise Teaser
            </Label>
            <FormField
              id="description"
              name="description"
              label=""
              placeholder="Capture strategic attention in a single high-impact sentence..."
              defaultValue={initialData?.description || ""}
              required
            />
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Optimization</p>
                    <p className="text-xs text-muted-foreground/80">Every asset is auto-compressed for speed.</p>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Impact</p>
                    <p className="text-xs text-muted-foreground/80">Premium icons enhance visual trust.</p>
                </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Editor Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="group relative pt-8"
      >
        <div className="absolute -left-12 top-0 bottom-0 w-px bg-border/20 group-hover:bg-primary/20 transition-colors" />
        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 ml-1.5 mb-4 block">
          Full Detailed Editorial
        </Label>
        <PlateRichEditor value={content} onChange={setContent} height={800} />
      </motion.div>
    </CreationSuiteWrapper>
  );
};

export default ServiceForm;
