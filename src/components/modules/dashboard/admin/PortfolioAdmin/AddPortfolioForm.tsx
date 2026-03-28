"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/common/form";
import { toast } from "sonner";
import { createPortfolio } from "@/services/Portfolio/portfolios";
import { ICreatePortfolio } from "@/types";

const AddPortfolioForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: ICreatePortfolio = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      link: (formData.get("link") as string) || undefined,
      technologies: (formData.get("technologies") as string)
        .split(",")
        .map((t) => t.trim()),
    };

    try {
      const res = await createPortfolio(data);
      if (res.success) {
        toast.success("Portfolio added successfully!");
        router.push("/admin/portfolios");
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
      className="space-y-6 max-w-2xl mx-auto bg-card p-8 rounded-[2rem] border shadow-xl backdrop-blur-xl bg-white/5 border-white/10"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Project Title</label>
          <Input name="title" placeholder="E-commerce Website" required className="rounded-2xl bg-white/5 border-white/10 focus:border-indigo-500/50" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Description</label>
          <Textarea
            name="description"
            placeholder="A brief description of the project..."
            required
            className="rounded-2xl bg-white/5 border-white/10 focus:border-indigo-500/50 min-h-[120px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Image URL</label>
          <Input
            name="image"
            placeholder="https://example.com/image.jpg"
            required
            className="rounded-2xl bg-white/5 border-white/10 focus:border-indigo-500/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Project Link</label>
          <Input name="link" placeholder="https://github.com/..." className="rounded-2xl bg-white/5 border-white/10 focus:border-indigo-500/50" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
            Technologies (comma separated)
          </label>
          <Input
            name="technologies"
            placeholder="Next.js, Tailwind, MongoDB"
            required
            className="rounded-2xl bg-white/5 border-white/10 focus:border-indigo-500/50"
          />
        </div>
      </div>
      
      <SubmitButton
        label="Add Portfolio Project"
        loadingLabel="Adding..."
        isLoading={loading}
        size="lg"
      />
    </form>
  );
};

export default AddPortfolioForm;
