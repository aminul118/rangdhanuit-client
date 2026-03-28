"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/common/form";
import { toast } from "sonner";
import { getPortfolioById, updatePortfolio } from "@/services/Portfolio/portfolios";
import { IPortfolio } from "@/types";
import PlateRichEditor from "@/components/rich-text/core/rich-editor";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import SingleImageUploader from "@/components/ui/single-image-uploader";

const EditPortfolioForm = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [project, setProject] = useState<IPortfolio | null>(null);
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getPortfolioById(id);
        if (res.success) {
          setProject(res.data);
          setDescription(res.data.description || "");
          setIsFeatured(res.data.isFeatured || false);
        }
      } catch {
        toast.error("Failed to fetch project details");
      } finally {
        setFetching(false);
      }
    };
    fetchProject();
  }, [id]);

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
      const res = await updatePortfolio(id, formData);
      if (res.success) {
        toast.success("Portfolio updated successfully!");
        router.push("/admin/portfolios");
        router.refresh();
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update portfolio";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-muted-foreground">Project not found</h2>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card/50 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-400/80 ml-1">
                Project Title
              </label>
              <Input
                name="title"
                defaultValue={project.title}
                placeholder="E-commerce Website"
                required
                className="h-14 text-xl rounded-2xl bg-white/5 border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-400/80 ml-1">
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
              <label className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-400/80 ml-1">
                Thumbnail Image
              </label>
              <SingleImageUploader 
                defaultValue={project.image}
                onChange={(file) => setImageFile(file)} 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-400/80 ml-1">
                Live Project Link
              </label>
              <Input
                name="link"
                defaultValue={project.link}
                placeholder="https://github.com/..."
                className="rounded-xl bg-white/5 border-white/10 focus:border-indigo-500/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-400/80 ml-1">
                Technologies
              </label>
              <Input
                name="technologies"
                defaultValue={project.technologies?.join(", ")}
                placeholder="Next.js, Tailwind, MongoDB"
                required
                className="rounded-xl bg-white/5 border-white/10 focus:border-indigo-500/50 transition-all"
              />
              <p className="text-[10px] text-muted-foreground ml-1 uppercase tracking-wider opacity-60">Separate with commas</p>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl">
                <Label
                  htmlFor="isFeatured"
                  className="text-sm font-bold uppercase tracking-wider cursor-pointer text-foreground/80"
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
              label="Update Project"
              loadingLabel="Updating..."
              isLoading={loading}
              className="w-full h-14 text-lg font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)] transition-all mt-4"
            />
          </div>

          <div className="p-6 rounded-[2rem] border border-indigo-500/10 bg-indigo-500/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <span className="text-indigo-400 font-bold">!</span>
            </div>
            <p className="text-xs text-indigo-300/80 leading-relaxed">
              Updating the project will immediately change how it appears in the public portfolio.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditPortfolioForm;
