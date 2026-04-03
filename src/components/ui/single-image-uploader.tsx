import { Button } from "@/components/ui/button";
import { useFileUpload, formatBytes } from "@/hooks/use-file-upload";
import {
  AlertCircleIcon,
  ImageIcon,
  UploadIcon,
  XIcon,
  Sparkles,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageDropProps {
  onChange: (file: File | string | null) => void;
  defaultValue?: string;
}

const SingleImageUploader = ({ onChange, defaultValue }: ImageDropProps) => {
  const maxSizeMB = 10;
  const maxSize = maxSizeMB * 1024 * 1024;

  const initialFiles = defaultValue
    ? [
        {
          name: "Thumbnail",
          size: 0,
          type: "image/jpeg",
          url: defaultValue,
          id: "initial-thumbnail",
        },
      ]
    : [];

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
    initialFiles,
  });

  const previewUrl = files[0]?.preview || null;

  // Propagate value to parent
  useEffect(() => {
    if (files.length > 0) {
      const currentFile = files[0].file;
      if (currentFile instanceof File) {
        onChange(currentFile);
      } else {
        // Keeping it consistent with the user's requirement to pass initial URL
        onChange(currentFile.url);
      }
    } else {
      onChange(null);
    }
  }, [files, onChange]);

  return (
    <div className="flex flex-col gap-4 group/uploader w-full">
      <div className="relative group/container w-full">
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
              ? "hsl(var(--primary)/0.1)"
              : "hsl(var(--background)/1)",
          }}
          className="relative flex min-h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-[40px] border-2 border-dashed transition-all duration-500 backdrop-blur-xl shadow-2xl"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
          />

          <AnimatePresence mode="wait">
            {previewUrl ? (
              <motion.div
                key="preview-split-info"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] w-full h-full min-h-[320px]"
              >
                {/* Left Side: Asset Information (Information Pane) */}
                <motion.div
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col justify-center items-start p-10 space-y-7"
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2.5 text-primary">
                      <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 shadow-sm">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.35em]">
                        Information Pane
                      </span>
                    </div>

                    <h4 className="text-2xl font-black tracking-tight text-white line-clamp-1">
                      {files[0]?.file?.name || "Selected Showcase"}
                    </h4>
                  </div>

                  <div className="flex flex-col space-y-5 w-full">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase font-black text-zinc-600 tracking-[0.3em]">
                        Device Specs
                      </p>
                      <div className="flex items-center gap-4 text-xs font-black text-zinc-400">
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-primary/60" />
                          <span>
                            {files[0]?.file instanceof File
                              ? formatBytes(files[0].file.size)
                              : "Cached URL"}
                          </span>
                        </div>
                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                        <span className="uppercase tracking-widest">
                          {files[0]?.file?.type.split("/")[1] || "WebP"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-6 flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-2xl border-2 font-black px-8 py-6 hover:bg-white/5 active:scale-95 transition-all text-[11px] uppercase tracking-widest shadow-xl"
                        onClick={openFileDialog}
                      >
                        Modify Asset
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="size-14 rounded-2xl border border-white/10 active:scale-95 transition-all shadow-2xl"
                        onClick={() => removeFile(files[0]?.id)}
                      >
                        <XIcon className="size-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Center: Vertical Separator (The user's reference) */}
                <div className="hidden md:flex flex-col items-center justify-center py-6">
                  <div className="w-px h-full border-l-2 border-dashed border-zinc-800/80" />
                </div>

                {/* Right Side: High-Quality Image Preview */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-full h-full min-h-[350px] flex items-center justify-center p-8 lg:p-14 overflow-hidden"
                >
                  {/* Ambient Blur Background */}
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                      key={`ambient-${previewUrl}`}
                      src={previewUrl}
                      alt="Ambient glow"
                      fill
                      className="object-cover blur-[120px] opacity-20 transition-all duration-1000"
                    />
                  </div>

                  {/* Main Preview Container */}
                  <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-white/5 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.7)] bg-zinc-950/20 flex items-center justify-center backdrop-blur-sm">
                    <Image
                      key={`main-${previewUrl}`}
                      src={previewUrl}
                      alt="Project visual preview"
                      fill
                      className="object-contain p-2 hover:scale-[1.02] transition-transform duration-700 ease-out"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse-slow" />
                  <div className="relative bg-background/50 backdrop-blur-md size-20 flex items-center justify-center rounded-3xl border border-white/5 shadow-2xl group-hover/uploader:scale-110 transition-transform duration-700">
                    <ImageIcon className="size-10 text-primary opacity-80" />
                  </div>
                  <Sparkles className="absolute -top-3 -right-3 size-6 text-indigo-400 animate-pulse" />
                </div>

                <h3 className="text-xl font-black tracking-tight mb-3">
                  Drop your masterpiece
                </h3>
                <p className="text-muted-foreground text-sm font-bold uppercase tracking-[0.25em] leading-relaxed max-w-sm mb-12 opacity-60">
                  Drag your project visuals <br />
                  <span className="text-[10px]">(Max. {maxSizeMB}MB)</span>
                </p>

                <Button
                  type="button"
                  size="lg"
                  className="rounded-2xl px-10 py-7 text-sm font-black bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 uppercase tracking-[0.2em] shadow-2xl border-b-2 border-primary-foreground/20"
                  onClick={openFileDialog}
                >
                  <UploadIcon className="mr-3 size-4" />
                  Launch Uploader
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-10 left-0 right-0 flex justify-center"
          >
            <div className="bg-destructive/10 text-destructive border border-destructive/20 px-6 py-2 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md">
              <AlertCircleIcon className="size-4 text-destructive" />
              <span>{errors[0]}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SingleImageUploader;
