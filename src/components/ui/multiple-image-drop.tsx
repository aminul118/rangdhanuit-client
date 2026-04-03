"use client";

import { Button } from "@/components/ui/button";
import { useFileUpload, type FileMetadata } from "@/hooks/use-file-upload";
import {
  AlertCircleIcon,
  ImageIcon,
  UploadIcon,
  XIcon,
  PlusIcon,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageDropProps {
  onChange: (files: (File | string)[] | null) => void;
  defaultValues?: string[];
}

export default function MultipleImageDrop({
  onChange,
  defaultValues = [],
}: ImageDropProps) {
  const maxSizeMB = 10;
  const maxSize = maxSizeMB * 1024 * 1024;
  const maxFiles = 12;

  const initialFiles = (defaultValues || []).map((url, index) => ({
    name: `image-${index + 1}`,
    size: 0,
    type: "image/jpeg",
    url: url,
    id: `initial-${index}`,
  }));

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: true,
    maxFiles,
    initialFiles,
  });

  useEffect(() => {
    const allFiles = files.map((f) => {
      if (f.file instanceof File) {
        return f.file;
      }
      return (f.file as FileMetadata).url;
    });

    onChange(allFiles.length > 0 ? allFiles : null);
  }, [files, onChange]);

  return (
    <div className="flex flex-col gap-6 w-full group/uploader">
      <motion.div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        animate={{
          borderColor: isDragging
            ? "hsl(var(--primary))"
            : "hsl(var(--border)/0.2)",
          backgroundColor: isDragging
            ? "hsl(var(--primary)/0.05)"
            : "transparent",
        }}
        className="relative min-h-64 rounded-[40px] border-2 border-dashed p-8 transition-all duration-500 backdrop-blur-xl shadow-inner"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image files"
        />

        <AnimatePresence mode="popLayout">
          {files.length > 0 ? (
            <div className="flex flex-col gap-10">
              {/* Gallery Header with Split-View Aesthetic */}
              <div className="grid grid-cols-1 md:grid-cols-[auto_2px_1fr] items-center gap-8 px-2">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-black tracking-tight flex items-center gap-4">
                    Gallery Assets
                    <span className="text-[10px] font-black bg-primary/10 text-primary px-3.5 py-1.5 rounded-xl border border-primary/20 uppercase tracking-widest shadow-sm">
                      {files.length} / {maxFiles}
                    </span>
                  </h3>
                </div>

                <div className="hidden md:block h-12 w-px border-l-2 border-dashed border-zinc-800/80" />

                <div className="flex justify-start">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-2xl border-2 font-black px-8 py-6 hover:bg-white/5 active:scale-95 transition-all text-[11px] uppercase tracking-[0.2em] shadow-xl"
                    onClick={openFileDialog}
                    disabled={files.length >= maxFiles}
                  >
                    <PlusIcon className="size-4 mr-3" />
                    Inject New Asset
                  </Button>
                </div>
              </div>

              {/* Bento Grid */}
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
              >
                {files.map((file, idx) => (
                  <motion.div
                    key={file.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="relative aspect-square group/item rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-zinc-900/20"
                  >
                    <Image
                      key={file.preview as string}
                      src={file.preview as string}
                      alt={
                        typeof file.file === "object" && "name" in file.file
                          ? file.file.name
                          : "asset"
                      }
                      fill
                      className="object-cover transition-transform duration-1000 group-hover/item:scale-110"
                    />

                    {/* Glass Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                      <div className="flex gap-2">
                        <Button
                          variant="destructive"
                          size="icon"
                          className="size-12 rounded-2xl border border-white/10 shadow-2xl transform translate-y-8 group-hover/item:translate-y-0 transition-all duration-500 delay-75"
                          onClick={() => removeFile(file.id)}
                        >
                          <XIcon className="size-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Badge for Featured Asset (Icon only) */}
                    {idx === 0 && (
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground p-2 rounded-xl shadow-2xl border border-white/20 backdrop-blur-md">
                        <Sparkles className="size-3" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Add More Slot */}
                {files.length < maxFiles && (
                  <motion.button
                    layout
                    whileHover={{
                      scale: 0.97,
                      backgroundColor: "hsl(var(--primary)/0.05)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openFileDialog}
                    className="aspect-square rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-4 hover:border-primary/40 transition-all group/add shadow-inner bg-white/2"
                  >
                    <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover/add:bg-primary/10 group-hover/add:scale-110 transition-all duration-500">
                      <PlusIcon className="size-6 text-zinc-600 group-hover/add:text-primary" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-hover/add:text-primary">
                      Add Asset
                    </span>
                  </motion.button>
                )}
              </motion.div>
            </div>
          ) : (
            <motion.div
              key="empty-gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center p-16 text-center"
            >
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-150 animate-pulse-slow" />
                <div className="relative bg-background/50 backdrop-blur-md size-24 flex items-center justify-center rounded-[32px] border border-white/5 shadow-2xl group-hover/uploader:scale-110 transition-transform duration-1000">
                  <ImageIcon className="size-12 text-primary opacity-80" />
                </div>
                <Sparkles className="absolute -top-4 -right-4 size-8 text-indigo-400 animate-pulse" />
              </div>

              <h3 className="text-2xl font-black tracking-tight mb-4">
                Initialize your gallery
              </h3>
              <p className="text-muted-foreground text-sm font-bold uppercase tracking-[0.3em] leading-relaxed max-w-sm mb-12 opacity-60">
                Inject multiple project assets <br />
                <span className="text-[10px] opacity-40">
                  PNG, JPG or WebP (Max. {maxSizeMB}MB)
                </span>
              </p>

              <Button
                type="button"
                size="lg"
                className="rounded-2xl px-10 py-7 text-sm font-black bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 uppercase tracking-[0.2em] shadow-2xl border-b-2 border-primary-foreground/20"
                onClick={openFileDialog}
              >
                <UploadIcon className="mr-3 size-4" />
                Launch Assets
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {errors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-destructive/10 text-destructive border border-destructive/20 p-5 rounded-[24px] flex items-center gap-4 backdrop-blur-md shadow-2xl"
        >
          <div className="p-2.5 rounded-xl bg-destructive/10">
            <AlertCircleIcon className="size-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] leading-none mb-1.5">
              Collection Error
            </span>
            <span className="text-sm font-bold opacity-80">{errors[0]}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
