"use client";

import { BlogEditorKit } from "@/components/rich-text/kits/blog-editor-kit";
import { Editor } from "@/components/rich-text/ui/editor";
import { Plate, usePlateEditor } from "platejs/react";
import { useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface IHtml {
  content: string;
  className?: string;
}

const HtmlContent = ({ content, className }: IHtml) => {
  const { isPlate, value } = useMemo(() => {
    if (!content || typeof content !== "string")
      return { isPlate: false, value: null };
    if (!content.trim().startsWith("[")) return { isPlate: false, value: null };

    try {
      const parsed = JSON.parse(content);
      return { isPlate: Array.isArray(parsed), value: parsed };
    } catch {
      return { isPlate: false, value: null };
    }
  }, [content]);

  const editor = usePlateEditor({
    plugins: BlogEditorKit,
    value: value || undefined,
  });

  if (isPlate) {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className={className}>
          <Plate editor={editor} readOnly>
            <Editor variant="none" className="focus:outline-none" />
          </Plate>
        </div>
      </DndProvider>
    );
  }

  return (
    <div
      suppressHydrationWarning
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HtmlContent;
