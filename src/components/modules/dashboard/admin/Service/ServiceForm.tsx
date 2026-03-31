"use client";

import { useState } from "react";
import { FormField } from "@/components/common/form";
import PlateRichEditor from "@/components/rich-text/core/rich-editor";
import { Label } from "@/components/ui/label";
import SingleImageUploader from "@/components/ui/single-image-uploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IService } from "@/types/Service/service.types";
import { motion } from "framer-motion";
import { Info, Laptop, Smartphone, Compass, Palette, TrendingUp, ShieldCheck } from "lucide-react";

import { CreationSuiteWrapper } from "@/components/common/wrapper/CreationSuiteWrapper";
import { Input } from "@/components/ui/input";

interface ServiceFormProps {
  initialData?: IService;
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
  submitLabel: string;
}

const IconOptions = [
  { value: "Laptop", label: "Web / Desktop", icon: Laptop },
  { value: "Smartphone", label: "Mobile App", icon: Smartphone },
  { value: "Compass", label: "Strategy / Navigation", icon: Compass },
  { value: "Palette", label: "Design / UI / UX", icon: Palette },
  { value: "TrendingUp", label: "SEO / Marketing", icon: TrendingUp },
  { value: "ShieldCheck", label: "Security / Cyber", icon: ShieldCheck },
];

const ServiceForm = ({
  initialData,
  onSubmit,
  loading,
  submitLabel,
}: ServiceFormProps) => {
  const [content, setContent] = useState(initialData?.content || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedIcon, setSelectedIcon] = useState(
    initialData?.icon || "Laptop"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("content", content);
    form.append("icon", selectedIcon);
    if (imageFile) {
      form.append("image", imageFile);
    }
    await onSubmit(form);
  };

  return (
    <CreationSuiteWrapper
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel={submitLabel}
      heroLabel="Presentation Hero Visual"
      heroImage={
        <SingleImageUploader
          defaultValue={initialData?.image}
          onChange={setImageFile}
        />
      }
    >
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <Input
            id="title"
            name="title"
            defaultValue={initialData?.title}
            placeholder="Name your excellence..."
            className="text-3xl md:text-5xl font-black border-none bg-transparent p-0 h-auto"
          />
          <div className="h-px w-full bg-border/50 relative">
            <div className="absolute left-0 top-0 h-full w-24 bg-linear-to-r from-primary to-transparent" />
          </div>
        </div>

        {/* Metadata Section: Icon & Teaser */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 ml-1.5 flex items-center gap-2">
              <Info size={12} className="opacity-40" />
              Visual Icon
            </Label>
            <Select
              name="icon"
              value={selectedIcon}
              onValueChange={setSelectedIcon}
            >
              <SelectTrigger className="font-bold">
                <div className="flex items-center gap-3">
                  {selectedIcon && (
                    <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 shadow-lg">
                      {(() => {
                        const SelectedIcon =
                          IconOptions.find((o) => o.value === selectedIcon)
                            ?.icon || Laptop;
                        return <SelectedIcon size={14} />;
                      })()}
                    </div>
                  )}
                  <SelectValue placeholder="Identify your service" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-background border-border/50 rounded-2xl">
                {IconOptions.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="py-3 focus:bg-indigo-500/10 focus:text-indigo-400 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                        <opt.icon size={14} />
                      </div>
                      <span className="font-bold">{opt.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/80 ml-1.5">
              Concise Teaser
            </Label>
            <FormField
              id="description"
              name="description"
              label=""
              placeholder="Capture attention in one sentence..."
              defaultValue={initialData?.description}
              required
            />
          </div>
        </div>
      </motion.div>

      {/* Immersive Editor Region */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="group relative"
      >
        <div className="absolute -left-12 top-0 bottom-0 w-px bg-border/50 group-hover:bg-primary/20 transition-colors" />
        <PlateRichEditor value={content} onChange={setContent} height={800} />
      </motion.div>
    </CreationSuiteWrapper>
  );
};

export default ServiceForm;
