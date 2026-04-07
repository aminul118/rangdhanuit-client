"use client";

import { useState } from "react";
import { FormField } from "@/components/common/form";
import PlateRichEditor from "@/components/rich-text/core/rich-editor";
import { Label } from "@/components/ui/label";
import SingleImageUploader from "@/components/ui/single-image-uploader";
import { IPortfolio } from "@/types";
import { motion } from "framer-motion";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { Cpu, Wand2 } from "lucide-react";
import { CreationSuiteWrapper } from "@/components/common/layouts/CreationSuiteWrapper";
import { Input } from "@/components/ui/input";
import { isValidImageSrc } from "@/lib/utils";

interface PortfolioFormProps {
  initialData?: IPortfolio;
  onSubmit: (data: FormData) => Promise<void>;
  loading: boolean;
  submitLabel?: string;
}

const PortfolioForm = ({
  initialData,
  onSubmit,
  loading,
  submitLabel = "Add Project",
}: PortfolioFormProps) => {
  const [content, setContent] = useState(initialData?.content || "");
  const [thumbnail, setThumbnail] = useState<File | string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("content", content);
    if (thumbnail) form.append("thumbnail", thumbnail);
    await onSubmit(form);
  };

  return (
    <CreationSuiteWrapper
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel={submitLabel}
      heroLabel="Project Showcase Image"
      heroImage={
        <SingleImageUploader
          defaultValue={
            isValidImageSrc(initialData?.thumbnail)
              ? initialData?.thumbnail
              : undefined
          }
          onChange={setThumbnail}
        />
      }
    >
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        <div className="space-y-3">
          <Input
            name="title"
            defaultValue={initialData?.title}
            placeholder="Name your masterpiece..."
          />
        </div>

        {/* Project Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5 flex items-center gap-2">
                <FaGlobe size={12} className="opacity-40" />
                Live Deployment URL
              </Label>
              <FormField
                id="liveLink"
                name="liveLink"
                label=""
                placeholder="https://yourapp.com"
                defaultValue={initialData?.liveLink}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5 flex items-center gap-2">
                <FaGithub size={12} className="opacity-40" />
                GitHub Repository
              </Label>
              <FormField
                id="github"
                name="github"
                label=""
                placeholder="https://github.com/username/repo"
                defaultValue={initialData?.github}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5 flex items-center gap-2">
                <Cpu size={12} className="opacity-40" />
                Core Technology Stack
              </Label>
              <FormField
                id="technologies"
                name="technologies"
                label=""
                placeholder="e.g. Next.js, Rust, AWS"
                defaultValue={initialData?.technologies}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5 flex items-center gap-2">
              <Wand2 size={12} className="opacity-40" />
              Project Prominence
            </Label>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/20 transition-all group">
              <label className="flex items-center gap-4 cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    defaultChecked={initialData?.isFeatured}
                    className="w-5 h-5 rounded-md border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500/20 transition-all cursor-pointer accent-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                    Showcase as Featured
                  </span>
                  <span className="text-xs text-zinc-500 font-medium leading-relaxed">
                    Highlight this project at the top of your portfolio
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project Description (Editor) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="group relative"
      >
        <div className="absolute -left-12 top-0 bottom-0 w-px bg-white/5 group-hover:bg-indigo-500/20 transition-colors" />
        <PlateRichEditor value={content} onChange={setContent} height={500} />
      </motion.div>
    </CreationSuiteWrapper>
  );
};

export default PortfolioForm;
