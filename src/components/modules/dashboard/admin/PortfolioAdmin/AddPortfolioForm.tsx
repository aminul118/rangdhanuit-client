"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField, SubmitButton } from "@/components/common/form";
import { toast } from "sonner";
import { createPortfolio } from "@/services/Portfolio/portfolios";
import PlateRichEditor from "@/components/rich-text/core/rich-editor";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SingleImageUploader from "@/components/ui/single-image-uploader";

const AddPortfolioForm = () => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Append managed state values to FormData
    formData.append("description", description);
    formData.append("isFeatured", String(isFeatured));
    if (imageFile) {
      formData.append("image", imageFile);
    }
    
    try {
      const res = await createPortfolio(formData);
      if (res.success) {
        toast.success("Portfolio added successfully!");
        router.push("/admin/portfolios");
        router.refresh();
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to add portfolio";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card/50 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
            <FormField
              id="title"
              name="title"
              label="Project Title"
              placeholder="E-commerce Website"
              required
              size="xl"
            />

            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500/80 ml-1.5">
                Description
              </label>
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden focus-within:border-indigo-500/50 transition-all">
                <PlateRichEditor
                  value={description}
                  onChange={setDescription}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-6">
          <div className="bg-card/50 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500/80 ml-1.5">
                Thumbnail Image
              </label>
              <SingleImageUploader onChange={(file) => setImageFile(file)} />
            </div>

            <FormField
              id="link"
              name="link"
              label="Live Project Link"
              placeholder="https://github.com/..."
              size="xl"
            />

            <div className="space-y-2">
              <FormField
                id="technologies"
                name="technologies"
                label="Technologies"
                placeholder="Next.js, Tailwind, MongoDB"
                required
                size="xl"
              />
              <p className="text-[10px] text-muted-foreground ml-2.5 uppercase tracking-wider opacity-60">Separate with commas</p>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl">
                <Label
                  htmlFor="isFeatured"
                  className="text-xs font-bold uppercase tracking-wider cursor-pointer text-foreground/80"
                >
                  Featured Project
                </Label>
                <Checkbox
                  id="isFeatured"
                  onCheckedChange={(checked) => setIsFeatured(!!checked)}
                  checked={isFeatured}
                  className="rounded-md border-white/20 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 w-6 h-6 transition-all"
                />
              </div>
            </div>

            <SubmitButton
              label="Publish Project"
              loadingLabel="Publishing..."
              isLoading={loading}
              size="xl"
              className="mt-4"
            />
          </div>

          <div className="p-6 rounded-[2rem] border border-indigo-500/10 bg-indigo-500/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <span className="text-indigo-400 font-bold">!</span>
            </div>
            <p className="text-xs text-indigo-300/80 leading-relaxed">
              Your project will be visible in the portfolio section immediately after publishing.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddPortfolioForm;
