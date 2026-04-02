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
import { IBlog } from "@/types/Blog/blog.types";
import { CreationSuiteWrapper } from "@/components/common/layouts/CreationSuiteWrapper";

interface BlogFormProps {
  initialData?: IBlog;
  onSubmit: (data: FormData) => Promise<void>;
  loading: boolean;
  submitLabel?: string;
}

const BlogFormModern = ({
  initialData,
  onSubmit,
  loading,
  submitLabel = "Publish Article",
}: BlogFormProps) => {
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("content", content);
    if (image) form.append("image", image);
    await onSubmit(form);
  };

  return (
    <CreationSuiteWrapper
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel={submitLabel}
      heroLabel="Article Cover Image"
      heroImage={
        <SingleImageUploader
          defaultValue={initialData?.featuredImage}
          onChange={setImage}
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
            name="title"
            defaultValue={initialData?.title}
            placeholder="Article Title..."
          />
          <div className="h-px w-full bg-border/50 relative">
            <div className="absolute left-0 top-0 h-full w-24 bg-linear-to-r from-primary to-transparent" />
          </div>
        </div>

        {/* Row: Category & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label
              htmlFor="category"
              className="text-xs uppercase tracking-widest text-muted-foreground font-bold"
            >
              Article Category
            </Label>
            <Select
              name="category"
              defaultValue={initialData?.category || "tech"}
            >
              <SelectTrigger className="font-bold">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border/50">
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="ai">Artificial Intelligence</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="tags"
              className="text-xs uppercase tracking-widest text-zinc-500 font-bold"
            >
              Tags & Keywords
            </Label>
            <Input name="tags" placeholder="react, nextjs, design..." />
          </div>
        </div>
      </motion.div>

      {/* Rich Text Editor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="group relative"
      >
        <div className="absolute -left-12 top-0 bottom-0 w-px bg-border/50 group-hover:bg-primary/20 transition-colors" />
        <PlateRichEditor value={content} onChange={setContent} height={600} />
      </motion.div>
    </CreationSuiteWrapper>
  );
};

export default BlogFormModern;
