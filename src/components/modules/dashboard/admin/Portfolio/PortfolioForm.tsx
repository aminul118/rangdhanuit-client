"use client";

import { useState } from "react";
import { FormField } from "@/components/common/form";
import PlateRichEditor from "@/components/rich-text/core/rich-editor";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SingleImageUploader from "@/components/ui/single-image-uploader";
import { IPortfolio } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, X, Info, Sparkles, Wand2, Globe, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingCreationBar from "@/components/common/form/FloatingCreationBar";

interface PortfolioFormProps {
  initialData?: IPortfolio;
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
  submitLabel: string;
}

const PortfolioForm = ({
  initialData,
  onSubmit,
  loading,
  submitLabel,
}: PortfolioFormProps) => {
  const [description, setDescription] = useState(initialData?.description || "");
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const form = document.getElementById("creation-form") as HTMLFormElement;
    if (!form) return;
    const formData = new FormData(form);
    formData.append("description", description);
    formData.append("isFeatured", String(isFeatured));
    if (imageFile) {
      formData.append("image", imageFile);
    }
    await onSubmit(formData);
  };

  return (
    <form id="creation-form" onSubmit={handleSubmit} className="relative">
      <FloatingCreationBar 
        loading={loading} 
        submitLabel={submitLabel} 
      />

      {/* Mobile Settings Toggle */}
      <div className="lg:hidden fixed bottom-8 right-8 z-50">
        <Button
          type="button"
          onClick={() => setShowSidebar(true)}
          className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 shadow-2xl shadow-indigo-500/40 flex items-center justify-center p-0"
        >
          <Settings2 className="text-white" size={24} />
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Main Content Column */}
        <div className="flex-1 w-full space-y-12 bg-zinc-900/10 rounded-[3.5rem] p-8 md:p-16 border border-white/5 shadow-inner">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-12"
          >
            {/* Title Section */}
            <div className="space-y-8 group">
               <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <Wand2 size={14} className="text-indigo-400" />
                </div>
                <label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500/60">
                   Project Identity
                </label>
              </div>
              <textarea
                id="title"
                name="title"
                defaultValue={initialData?.title}
                placeholder="What did you build?"
                className="w-full bg-transparent border-none text-3xl md:text-5xl font-black tracking-tight focus:ring-0 placeholder:text-zinc-800/50 resize-none overflow-hidden min-h-[80px] leading-[1.1] transition-all duration-500 focus:glow-rainbow p-2 rounded-2xl"
                required
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
            </div>

            {/* Immersive Editor Region */}
            <div className="space-y-6">
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500/60 ml-2">
                <span>Case Study & Details</span>
                <div className="h-px flex-1 bg-indigo-500/5" />
              </div>
              
              <div className="prose prose-invert prose-lg max-w-none prose-indigo prose-headings:font-black prose-headings:tracking-tighter prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-xl prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-500/5 prose-blockquote:p-8 prose-blockquote:rounded-[2rem] transition-all duration-700 p-2 rounded-3xl group">
                <div className="rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-950/20 group-focus-within:border-indigo-500/20 group-focus-within:shadow-[0_0_50px_-12px_rgba(99,102,241,0.1)] transition-all duration-700">
                  <PlateRichEditor
                    value={description}
                    onChange={setDescription}
                    height={700}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop Sidebar / Settings Column */}
        <aside className={`
          fixed inset-y-0 right-0 z-60 w-full max-w-md bg-zinc-950/98 backdrop-blur-3xl border-l border-white/5 p-10 
          transform transition-transform duration-700 ease-in-out lg:relative lg:translate-x-0 lg:bg-transparent lg:border-none lg:p-0 lg:max-w-xs xl:max-w-sm
          ${showSidebar ? 'translate-x-0 shadow-[-50px_0_100px_-20px_rgba(0,0,0,0.5)]' : 'translate-x-full lg:translate-x-0'}
        `}>
          <div className="sticky top-12 space-y-8">
            <div className="lg:hidden flex justify-between items-center mb-8 pb-6 border-b border-white/5">
              <h2 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-white/40">Project Specs</h2>
              <Button type="button" variant="ghost" onClick={() => setShowSidebar(false)} className="p-2 hover:bg-white/5 rounded-full">
                <X size={24} />
              </Button>
            </div>

            <div className="space-y-8">
              <div className="glass-premium p-8 rounded-[2.5rem] space-y-6 hover:glow-indigo transition-all duration-700 group">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5 flex items-center gap-2 group-hover:text-indigo-400 transition-colors">
                    <Info size={12} className="opacity-40" />
                    Cover Visual
                  </label>
                  <div className="aspect-video rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/40 group-hover:border-indigo-500/20 transition-all duration-700">
                    <SingleImageUploader 
                      defaultValue={initialData?.image}
                      onChange={(file) => setImageFile(file)} 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5 flex items-center gap-2">
                    <Globe size={12} className="opacity-40" />
                    Deployment URL
                  </label>
                  <FormField
                    id="link"
                    name="link"
                    label=""
                    placeholder="https://yourapp.com"
                    defaultValue={initialData?.link}
                    size="xl"
                    className="bg-zinc-900/60 border-white/5 rounded-2xl"
                  />
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500/80 ml-1.5 flex items-center gap-2">
                    <Cpu size={12} className="opacity-40" />
                    Core Stack
                  </label>
                  <FormField
                    id="technologies"
                    name="technologies"
                    label=""
                    placeholder="e.g. Next.js, Rust, AWS"
                    defaultValue={initialData?.technologies}
                    required
                    size="xl"
                    className="bg-zinc-900/60 border-white/5 rounded-2xl"
                  />
                  <p className="text-[10px] text-zinc-600 font-bold ml-2.5 uppercase tracking-widest">
                    Comma separated
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between bg-zinc-900/40 border border-white/5 p-5 rounded-2xl group/toggle hover:border-indigo-500/20 transition-all">
                    <Label
                      htmlFor="isFeatured"
                      className="text-[10px] font-black uppercase tracking-widest cursor-pointer text-zinc-500 group-hover/toggle:text-indigo-400 transition-colors"
                    >
                      Showcase Featured
                    </Label>
                    <Checkbox
                      id="isFeatured"
                      onCheckedChange={(checked) => setIsFeatured(!!checked)}
                      checked={isFeatured}
                      className="rounded-lg border-white/10 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 w-6 h-6 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] border border-indigo-500/10 bg-indigo-500/5 hidden lg:flex items-start gap-4 hover:bg-indigo-500/10 transition-colors duration-700">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Sparkles size={18} className="text-indigo-400" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-black text-indigo-400 tracking-wider uppercase">Portfolio Tip</p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-bold">
                    Featured projects are displayed with high prominence on the homepage. Use crisp images.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md lg:hidden"
            />
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

export default PortfolioForm;
