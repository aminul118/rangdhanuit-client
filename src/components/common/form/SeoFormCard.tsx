"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SeoFormCardProps {
  initialData?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  className?: string;
}

export default function SeoFormCard({
  initialData,
  className,
}: SeoFormCardProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [keywords, setKeywords] = useState(initialData?.keywords || "");

  const TITLE_IDEAL = 60;
  const DESC_IDEAL = 160;
  const KEYWORDS_IDEAL = 100; // soft limit just for warning

  return (
    <Card className={cn("border-border/50 shadow-sm bg-card/50", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search size={18} className="text-primary" />
          Search Engine Optimization (SEO)
        </CardTitle>
        <CardDescription>
          Improve your content's visibility on search engines.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* SEO Title */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
              SEO Title <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2 text-xs font-medium">
              {title.length > TITLE_IDEAL && (
                <span className="text-destructive flex items-center gap-1">
                  <AlertTriangle size={12} /> Too long
                </span>
              )}
              <span
                className={
                  title.length > TITLE_IDEAL
                    ? "text-destructive"
                    : "text-muted-foreground"
                }
              >
                {title.length} / {TITLE_IDEAL}
              </span>
            </div>
          </div>
          <Input
            name="seo.title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Next.js E-Commerce Platform | Professional Portfolio"
            className={cn(
              "text-base h-11",
              title.length > TITLE_IDEAL &&
                "border-destructive focus-visible:ring-destructive",
            )}
            required
          />
        </div>

        {/* SEO Keywords */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
              SEO Keywords <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2 text-xs font-medium">
              {keywords.length > KEYWORDS_IDEAL && (
                <span className="text-amber-500 flex items-center gap-1">
                  <AlertTriangle size={12} /> Getting long
                </span>
              )}
              <span
                className={
                  keywords.length > KEYWORDS_IDEAL
                    ? "text-amber-500"
                    : "text-muted-foreground"
                }
              >
                {keywords.length} chars
              </span>
            </div>
          </div>
          <Input
            name="seo.keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. next.js, react, e-commerce, portfolio"
            className={cn(
              "h-11",
              keywords.length > KEYWORDS_IDEAL &&
                "border-amber-500/50 focus-visible:ring-amber-500/50",
            )}
            required
          />
        </div>

        {/* SEO Description */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
              SEO Description <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2 text-xs font-medium">
              {description.length > DESC_IDEAL && (
                <span className="text-destructive flex items-center gap-1">
                  <AlertTriangle size={12} /> Too long
                </span>
              )}
              <span
                className={
                  description.length > DESC_IDEAL
                    ? "text-destructive"
                    : "text-muted-foreground"
                }
              >
                {description.length} / {DESC_IDEAL}
              </span>
            </div>
          </div>
          <Textarea
            name="seo.description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description for search engine snippets (150-160 characters)"
            className={cn(
              "min-h-[80px] resize-y",
              description.length > DESC_IDEAL &&
                "border-destructive focus-visible:ring-destructive",
            )}
            required
          />
        </div>
      </CardContent>
    </Card>
  );
}
