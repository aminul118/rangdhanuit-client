"use client";

import { useState } from "react";
import PlateRichEditor from "@/components/rich-text/core/rich-editor";
import { Label } from "@/components/ui/label";
import SingleImageUploader from "@/components/ui/single-image-uploader";
import SingleVideoUploader from "@/components/ui/single-video-uploader";
import { IPortfolio } from "@/types";
import { FaGithub, FaGlobe, FaYoutube, FaVideo } from "react-icons/fa";
import {
  Cpu,
  Wand2,
  Image as ImageIcon,
  Save,
  Plus,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isValidImageSrc, getYoutubeEmbedUrl } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import SubmitButton from "@/components/common/form/SubmitButton";
import SeoFormCard from "@/components/common/form/SeoFormCard";

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
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || "");
  const [videoFile, setVideoFile] = useState<File | string | null>(
    initialData?.videoUrl || null,
  );

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

    if (thumbnail) formData.append("thumbnail", thumbnail);

    // Add video if it's a new file
    if (videoFile instanceof File) {
      formData.append("video", videoFile);
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl pb-20">
      {/* General Information */}
      <Card className="border-border/50 shadow-sm bg-card/50">
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
          <CardDescription>
            Basic details and metadata about your project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
              Project Title <span className="text-destructive">*</span>
            </Label>
            <Input
              name="title"
              defaultValue={initialData?.title}
              placeholder="e.g. Next.js E-Commerce Platform"
              className="text-base h-12 font-medium"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
              <Cpu size={14} /> Core Technology Stack{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              name="technologies"
              defaultValue={initialData?.technologies}
              placeholder="e.g. Next.js, React, Node.js (Comma separated)"
              className="min-h-[100px] resize-y"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Links & Media */}
      <Card className="border-border/50 shadow-sm bg-card/50">
        <CardHeader>
          <CardTitle>Links & Media Resources</CardTitle>
          <CardDescription>
            External repository, live URLs, and multimedia assets.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                <FaGlobe size={14} /> Live Deployment URL
              </Label>
              <Input
                name="liveLink"
                defaultValue={initialData?.liveLink}
                placeholder="https://yourapp.com"
                className="h-11"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                <FaGithub size={14} /> GitHub Repository
              </Label>
              <Input
                name="github"
                defaultValue={initialData?.github}
                placeholder="https://github.com/username/repo"
                className="h-11"
              />
            </div>
            <div className="space-y-3 flex flex-col">
              <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                <FaYoutube size={14} /> YouTube Video URL
              </Label>
              <div className="space-y-4 flex-1 flex flex-col">
                <Input
                  name="youtubeUrl"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="h-11 shrink-0"
                />
                {youtubeUrl && getYoutubeEmbedUrl(youtubeUrl) ? (
                  <div className="relative w-full flex-1 min-h-[200px] overflow-hidden rounded-xl border bg-black">
                    <iframe
                      src={getYoutubeEmbedUrl(youtubeUrl) || ""}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="absolute top-0 left-0 h-full w-full"
                    />
                  </div>
                ) : (
                  <div className="bg-muted/50 text-muted-foreground flex flex-1 min-h-[200px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed">
                    <span className="text-sm">
                      YouTube preview will appear here
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 flex flex-col">
              <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                <FaVideo size={14} /> Upload Project Video
              </Label>
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="h-11 shrink-0 hidden md:block"></div>{" "}
                {/* Spacer to align with YouTube input */}
                <div className="flex-1 flex flex-col [&>div]:flex-1 [&>div>div]:h-full min-h-[200px]">
                  <SingleVideoUploader
                    defaultValue={initialData?.videoUrl}
                    onChange={setVideoFile}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 mt-6 border-t border-border/50">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
              <ImageIcon size={14} /> Project Thumbnail Image
            </Label>
            <div className="max-w-md">
              <SingleImageUploader
                defaultValue={
                  isValidImageSrc(initialData?.thumbnail)
                    ? initialData?.thumbnail
                    : undefined
                }
                onChange={setThumbnail}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description Editor */}
      <Card className="border-border/50 shadow-sm bg-card/50 overflow-hidden">
        <CardHeader>
          <CardTitle>Detailed Case Study</CardTitle>
          <CardDescription>
            Comprehensive project description, challenges, and implementation
            details.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-0 sm:pb-6">
          <div className="px-6 border-t border-border/50 py-4">
            <PlateRichEditor
              value={content}
              onChange={setContent}
              height={500}
            />
          </div>
        </CardContent>
      </Card>

      {/* SEO Information */}
      <SeoFormCard initialData={initialData?.seo} />

      {/* Project Prominence */}
      <Card className="border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)] bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-6">
            <div className="space-y-1">
              <Label
                htmlFor="isFeatured"
                className="text-base font-bold flex items-center gap-2 text-foreground cursor-pointer"
              >
                <Wand2 size={18} className="text-primary" /> Showcase as
                Featured Project
              </Label>
              <p className="text-sm text-muted-foreground">
                Highlight this project on your main portfolio landing page to
                attract more visibility.
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
            label={isEdit ? "Update Project" : submitLabel}
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

export default PortfolioForm;
