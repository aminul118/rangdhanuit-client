"use client";

import { type Value, TrailingBlockPlugin } from "platejs";
import { type TPlateEditor } from "platejs/react";

import { AlignKit } from "@/components/rich-text/kits/align-kit";
import { BasicBlocksKit } from "@/components/rich-text/kits/basic-blocks-kit";
import { BasicMarksKit } from "@/components/rich-text/kits/basic-marks-kit";
import { CalloutKit } from "@/components/rich-text/kits/callout-kit";
import { CodeBlockKit } from "@/components/rich-text/kits/code-block-kit";
import { ColumnKit } from "@/components/rich-text/kits/column-kit";
import { DateKit } from "@/components/rich-text/kits/date-kit";
import { FontKit } from "@/components/rich-text/kits/font-kit";
import { LineHeightKit } from "@/components/rich-text/kits/line-height-kit";
import { LinkKit } from "@/components/rich-text/kits/link-kit";
import { ListKit } from "@/components/rich-text/kits/list-kit";
import { MarkdownKit } from "@/components/rich-text/kits/markdown-kit";
import { MathKit } from "@/components/rich-text/kits/math-kit";
import { MediaKit } from "@/components/rich-text/kits/media-kit";
import { MentionKit } from "@/components/rich-text/kits/mention-kit";
import { TableKit } from "@/components/rich-text/kits/table-kit";
import { TocKit } from "@/components/rich-text/kits/toc-kit";
import { ToggleKit } from "@/components/rich-text/kits/toggle-kit";

/**
 * A minimal, read-only plugin set for public-facing content.
 * Excludes interactive editor features like toolbars, slash commands,
 * block handles, and drag-and-drop.
 */
export const ReadOnlyViewerKit = [
  // Elements
  ...BasicBlocksKit,
  ...CodeBlockKit,
  ...TableKit,
  ...ToggleKit,
  ...TocKit,
  ...MediaKit,
  ...CalloutKit,
  ...ColumnKit,
  ...MathKit,
  ...DateKit,
  ...LinkKit,
  ...MentionKit,

  // Marks
  ...BasicMarksKit,
  ...FontKit,

  // Block Style
  ...ListKit,
  ...AlignKit,
  ...LineHeightKit,

  // Essential Structural Plugins
  TrailingBlockPlugin,

  // Parsers (Static only)
  ...MarkdownKit,
];

export type ReadOnlyViewer = TPlateEditor<
  Value,
  (typeof ReadOnlyViewerKit)[number]
>;
