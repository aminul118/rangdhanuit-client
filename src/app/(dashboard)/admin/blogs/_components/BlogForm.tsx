"use client";

import { useState } from "react";
import PlateRichEditor from "@/components/rich-text/core/rich-editor";
import { Label } from "@/components/ui/label";
import SingleImageUploader from "@/components/ui/single-image-uploader";
import { IBlog } from "@/types";
import {
  Sparkles,
  Info,
  Tag,
  Save,
  Plus,
  FileText,
  Image as ImageIcon,
  Wand2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isValidImageSrc } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import SubmitButton from "@/components/common/form/SubmitButton";
import SeoFormCard from "@/components/common/form/SeoFormCard";

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
  const [featuredImageFile, setFeaturedImageFile] = useState<
    File | string | null
  >(null);

  const isEdit = !!initialData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("content", content);

    // Construct SEO object
    const seo = {
      title: formData.get("seo.title"),
      description: formData.get("seo.description"),
      keywords: formData.get("seo.keywords"),
    };
    formData.append("seo", JSON.stringify(seo));

    // Remove individual SEO fields from formData so backend doesn't get confused
    formData.delete("seo.title");
    formData.delete("seo.description");
    formData.delete("seo.keywords");

    if (featuredImageFile instanceof File) {
      formData.append("image", featuredImageFile); // Backend expects 'image' field for multer
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl pb-20">
      {/* General Information */}
      <Card className="border-border/50 shadow-sm bg-card/50">
        <CardHeader>
          <CardTitle>Article Information</CardTitle>
          <CardDescription>
            Basic details and categorization for your article.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
              Article Title <span className="text-destructive">*</span>
            </Label>
            <Input
              name="title"
              defaultValue={initialData?.title}
              placeholder="e.g. The Future of Next.js and React"
              className="text-base h-12 font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                <Info size={14} /> Strategic Domain{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Select
                name="category"
                defaultValue={initialData?.category || "tech"}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="ai">Artificial Intelligence</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                <Tag size={14} /> Meta Identifiers
              </Label>
              <Input
                name="tags"
                defaultValue={initialData?.tags?.join(", ")}
                placeholder="tech, strategy, future (Comma separated)"
                className="h-11"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visuals */}
      <Card className="border-border/50 shadow-sm bg-card/50">
        <CardHeader>
          <CardTitle>Editorial Visuals</CardTitle>
          <CardDescription>
            Upload a high-quality featured image for the article.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-md">
            <SingleImageUploader
              defaultValue={
                isValidImageSrc(initialData?.featuredImage)
                  ? initialData?.featuredImage
                  : undefined
              }
              onChange={setFeaturedImageFile}
            />
          </div>
        </CardContent>
      </Card>

      {/* Editorial Content */}
      <Card className="border-border/50 shadow-sm bg-card/50 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            In-Depth Narrative
          </CardTitle>
          <CardDescription>Comprehensive article content.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-0 sm:pb-6">
          <div className="px-6 border-t border-border/50 py-4">
            <PlateRichEditor
              value={content}
              onChange={setContent}
              height={800}
            />
          </div>
        </CardContent>
      </Card>

      {/* SEO Information */}
      <SeoFormCard initialData={initialData?.seo} />

      {/* Article Prominence */}
      <Card className="border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)] bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-6">
            <div className="space-y-1">
              <Label
                htmlFor="isFeatured"
                className="text-base font-bold flex items-center gap-2 text-foreground cursor-pointer"
              >
                <Wand2 size={18} className="text-primary" /> Showcase as
                Featured Article
              </Label>
              <p className="text-sm text-muted-foreground">
                Highlight this article on your main blog landing page to attract
                more readers.
              </p>
            </div>
            <div className="flex items-center shrink-0">
              <input
                type="checkbox"
                name="isFeatured"
                id="isFeatured"
                defaultChecked={initialData?.isFeatured}
                className="w-6 h-6 rounded-md border-primary text-primary focus:ring-primary cursor-pointer accent-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Bar */}
      <div className="flex justify-end pt-2">
        <div className="w-full sm:w-auto">
          <SubmitButton
            label={isEdit ? "Update Article" : submitLabel}
            loadingLabel={isEdit ? "Updating..." : "Publishing..."}
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

export default BlogForm;
