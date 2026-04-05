"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PlateRichEditor from "@/components/rich-text/core/rich-editor";
import SingleImageUploader from "@/components/ui/single-image-uploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IBlog } from "@/types";
import { CreationSuiteWrapper } from "@/components/common/layouts/CreationSuiteWrapper";
import { Sparkles, Info, Tag } from "lucide-react";

interface BlogFormProps {
  initialData?: IBlog;
  onSubmit: (data: FormData) => Promise<void>;
  loading: boolean;
  submitLabel?: string;
}

const BlogForm = ({
  initialData,
  onSubmit,
  loading,
  submitLabel = "Publish Article",
}: BlogFormProps) => {
  const [content, setContent] = useState(initialData?.content || "");
  const [featuredImageFile, setFeaturedImageFile] = useState<File | string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("content", content);
    
    if (featuredImageFile instanceof File) {
      form.append("image", featuredImageFile); // Backend expects 'image' field for multer
    }
    
    await onSubmit(form);
  };

  return (
    <CreationSuiteWrapper
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel={submitLabel}
      heroLabel="Master Editorial Visual"
      heroImage={
        <SingleImageUploader
          defaultValue={initialData?.featuredImage}
          onChange={setFeaturedImageFile}
        />
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        {/* Title & Underline */}
        <div className="space-y-4">
          <Input
            name="title"
            defaultValue={initialData?.title}
            placeholder="Articulate your technical vision..."
            className="text-4xl md:text-5xl font-black border-none bg-transparent p-0 h-auto focus-visible:ring-0 placeholder:opacity-30 tracking-tighter"
          />
          <div className="h-0.5 w-full bg-border/20 relative">
            <div className="absolute left-0 top-0 h-full w-40 bg-linear-to-r from-primary to-transparent shadow-[0_0_15px_rgba(var(--primary),0.4)]" />
          </div>
        </div>

        {/* Discovery Metadata: Category & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <Label
              htmlFor="category"
              className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/70 ml-1.5 flex items-center gap-2"
            >
              <Info size={12} className="text-primary/60" />
              Strategic Domain
            </Label>
            <Select
              name="category"
              defaultValue={initialData?.category || "tech"}
            >
              <SelectTrigger className="font-bold h-14 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 transition-all px-6">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border/50 rounded-2xl shadow-2xl backdrop-blur-xl">
                <SelectItem value="tech" className="focus:bg-primary/20 rounded-xl transition-colors">Technology</SelectItem>
                <SelectItem value="design" className="focus:bg-primary/20 rounded-xl transition-colors">Design</SelectItem>
                <SelectItem value="software" className="focus:bg-primary/20 rounded-xl transition-colors">Software</SelectItem>
                <SelectItem value="ai" className="focus:bg-primary/20 rounded-xl transition-colors">Artificial Intelligence</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label
              htmlFor="tags"
              className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/70 ml-1.5 flex items-center gap-2"
            >
              <Tag size={12} className="text-primary/60" />
              Meta Identifiers
            </Label>
            <Input 
                name="tags" 
                defaultValue={initialData?.tags?.join(", ")}
                placeholder="tech, strategy, future..." 
                className="h-14 rounded-2xl border-white/5 bg-white/5 focus-visible:bg-white/10 transition-all px-6 font-medium"
            />
          </div>
        </div>
      </motion.div>

      {/* Editorial Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="group relative pt-12"
      >
        <div className="absolute -left-12 top-0 bottom-0 w-px bg-border/20 group-hover:bg-primary/20 transition-colors" />
        <div className="flex items-center gap-3 mb-6 ml-1.5">
            <Sparkles size={14} className="text-primary animate-pulse" />
            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/80">
              In-Depth Narrative
            </Label>
        </div>
        <PlateRichEditor value={content} onChange={setContent} height={800} />
      </motion.div>
    </CreationSuiteWrapper>
  );
};

export default BlogForm;
