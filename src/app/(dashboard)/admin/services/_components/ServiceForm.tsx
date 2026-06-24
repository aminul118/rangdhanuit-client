"use client";

import { useState } from "react";
import PlateRichEditor from "@/components/rich-text/core/rich-editor";
import { Label } from "@/components/ui/label";
import SingleImageUploader from "@/components/ui/single-image-uploader";
import { IService } from "@/types";
import {
  Save,
  Plus,
  FileText,
  Image as ImageIcon,
  Briefcase,
  LayoutTemplate,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isValidImageSrc } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import SubmitButton from "@/components/common/form/SubmitButton";

interface ServiceFormProps {
  initialData?: IService;
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
  submitLabel: string;
}

const ServiceForm = ({
  initialData,
  onSubmit,
  loading,
  submitLabel,
}: ServiceFormProps) => {
  const [content, setContent] = useState(initialData?.content || "");
  const [imageFile, setImageFile] = useState<File | string | null>(null);
  const [iconFile, setIconFile] = useState<File | string | null>(null);

  const [seo, setSeo] = useState({
    title: initialData?.seo?.title || "",
    description: initialData?.seo?.description || "",
    keywords: initialData?.seo?.keywords || "",
  });

  const isEdit = !!initialData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("content", content);

    // Append SEO data as a JSON string
    form.append("seo", JSON.stringify(seo));

    if (imageFile instanceof File) {
      form.append("image", imageFile);
    }
    if (iconFile instanceof File) {
      form.append("icon", iconFile);
    }

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl pb-20">
      {/* General Information */}
      <Card className="border-border/50 shadow-sm bg-card/50">
        <CardHeader>
          <CardTitle>Service Information</CardTitle>
          <CardDescription>
            Basic details defining your technological offering.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
              Service Title <span className="text-destructive">*</span>
            </Label>
            <Input
              name="title"
              defaultValue={initialData?.title}
              placeholder="e.g. Enterprise Web Development"
              className="text-base h-12 font-medium"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
              <Briefcase size={14} /> Concise Teaser{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              name="description"
              defaultValue={initialData?.description}
              placeholder="Capture strategic attention in a single high-impact sentence..."
              className="min-h-[80px] resize-y"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Visuals */}
      <Card className="border-border/50 shadow-sm bg-card/50">
        <CardHeader>
          <CardTitle>Service Visuals</CardTitle>
          <CardDescription>
            Upload an identifying icon and a primary background image.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                <LayoutTemplate size={14} /> Service Icon
              </Label>
              <div className="p-4 rounded-xl bg-background/50 border border-border shadow-inner">
                <SingleImageUploader
                  defaultValue={
                    isValidImageSrc(initialData?.icon)
                      ? initialData?.icon
                      : undefined
                  }
                  onChange={setIconFile}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                <ImageIcon size={14} /> Background / Thumbnail
              </Label>
              <div className="p-4 rounded-xl bg-background/50 border border-border shadow-inner">
                <SingleImageUploader
                  defaultValue={
                    isValidImageSrc(initialData?.image)
                      ? initialData?.image
                      : undefined
                  }
                  onChange={setImageFile}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Information */}
      <Card className="border-border/50 shadow-sm bg-card/50">
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
          <CardDescription>
            Optimize this service page for search engines.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
              SEO Title
            </Label>
            <Input
              value={seo.title}
              onChange={(e) => setSeo({ ...seo, title: e.target.value })}
              placeholder="e.g. Enterprise Web Development Services | Rangdhanu IT"
              className="text-base"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
              SEO Description
            </Label>
            <Textarea
              value={seo.description}
              onChange={(e) => setSeo({ ...seo, description: e.target.value })}
              placeholder="A brief description for search engine results (meta description)..."
              className="resize-y"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
              SEO Keywords
            </Label>
            <Input
              value={seo.keywords}
              onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
              placeholder="e.g. web development, enterprise, software, rangdhanu it"
              className="text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Editorial Content */}
      <Card className="border-border/50 shadow-sm bg-card/50 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            Full Detailed Editorial
          </CardTitle>
          <CardDescription>
            Comprehensive description of the service and what it includes.
          </CardDescription>
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

      {/* Action Bar */}
      <div className="flex justify-end pt-2">
        <div className="w-full sm:w-auto">
          <SubmitButton
            label={isEdit ? "Update Service" : submitLabel}
            loadingLabel={isEdit ? "Updating..." : "Saving..."}
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

export default ServiceForm;
