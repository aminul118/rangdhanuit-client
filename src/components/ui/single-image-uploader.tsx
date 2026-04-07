import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import {
  AlertCircleIcon,
  ImageIcon,
  UploadIcon,
  XIcon,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageDropProps {
  onChange: (file: File | string | null) => void;
  defaultValue?: string;
  variant?: "hero" | "compact";
}

const isUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;
  return (
    url.startsWith("/") ||
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  );
};

const SingleImageUploader = ({
  onChange,
  defaultValue,
  variant = "hero",
}: ImageDropProps) => {
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
              : "hsl(var(--border)/0.15)",
            backgroundColor: isDragging
              ? "hsl(var(--primary)/0.05)"
              : "hsl(var(--background)/0.3)",
          }}
          className={`${
            variant === "compact" ? "min-h-[180px]" : "min-h-[320px]"
          } relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border-2 border-dashed transition-all duration-700 backdrop-blur-3xl shadow-2xl hover:border-primary/50 group/dropzone`}
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload partner logo"
          />

          <AnimatePresence mode="wait">
            {previewUrl ? (
              <motion.div
                key="preview-split-info"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={`${
                  variant === "compact" ? "min-h-[180px]" : "min-h-[320px]"
                } grid grid-cols-1 md:grid-cols-[1.2fr_1px_1fr] w-full h-full relative z-10`}
              >
                {/* Left Side: Asset Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`${
                    variant === "compact" ? "p-6 space-y-4" : "p-10 space-y-6"
                  } flex flex-col justify-center items-start`}
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-3 text-primary">
                      <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 shadow-lg shadow-primary/5">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.3em] opacity-80 decoration-primary/30 underline underline-offset-4">
                        Vault Logic Success
                      </span>
                    </div>

                    <h4
                      className={`${
                        variant === "compact" ? "text-lg" : "text-2xl"
                      } font-black tracking-tight text-white line-clamp-1 group-hover/dropzone:text-primary transition-colors`}
                    >
                      {files[0]?.file?.name || "Partner Logo"}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size={variant === "compact" ? "sm" : "lg"}
                      className={`${
                        variant === "compact"
                          ? "rounded-xl px-6 py-4"
                          : "rounded-2xl px-10 py-7"
                      } border border-white/10 font-black hover:bg-white/10 active:scale-95 transition-all text-[11px] uppercase tracking-widest shadow-2xl hover:shadow-primary/10`}
                      onClick={openFileDialog}
                    >
                      Swap Asset
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className={`${
                        variant === "compact"
                          ? "size-10 rounded-xl"
                          : "size-14 rounded-2xl"
                      } border border-white/5 active:scale-95 transition-all shadow-2xl hover:bg-red-600`}
                      onClick={() => removeFile(files[0]?.id)}
                    >
                      <XIcon
                        className={variant === "compact" ? "size-4" : "size-5"}
                      />
                    </Button>
                  </div>
                </motion.div>

                {/* Center: Single-Pixel Separator (No-Width Gap) */}
                <div className="hidden md:block w-px h-full bg-border/10 relative z-20" />

                {/* Right Side: Full-Screen Preview Area */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-full h-full min-h-[180px] overflow-hidden group/preview bg-zinc-950/20"
                >
                  {/* Asset Background (Ambient Impact - Contained for logos) */}
                  <div className="absolute inset-0 z-0 opacity-20 blur-[60px] pointer-events-none">
                    {isUrl(previewUrl) && (
                      <Image
                        key={`ambient-${previewUrl}`}
                        src={previewUrl!}
                        alt="Ambient glow"
                        fill
                        className={
                          variant === "compact"
                            ? "object-contain"
                            : "object-cover scale-110"
                        }
                      />
                    )}
                  </div>

                  {/* Main Visual Asset (Properly Contained or Covered) */}
                  <div className="relative z-10 w-full h-full overflow-hidden flex items-center justify-center">
                    {isUrl(previewUrl) ? (
                      <>
                        <Image
                          key={`main-${previewUrl}`}
                          src={previewUrl!}
                          alt="Asset preview"
                          fill
                          className={`${
                            variant === "compact"
                              ? "object-contain p-12"
                              : "object-cover"
                          } transition-transform duration-2000 group-hover/preview:scale-105 ease-out`}
                          priority
                        />
                        {/* Dramatic Blend Overlays for Hero Mode */}
                        {variant !== "compact" && (
                          <>
                            <div className="absolute inset-0 bg-linear-to-r from-background/80 via-background/20 to-transparent pointer-events-none" />
                            <div className="absolute inset-0 bg-linear-to-t from-background/30 to-transparent pointer-events-none" />
                          </>
                        )}
                        {/* Decorative inner border/glow */}
                        <div className="absolute inset-0 border-l border-white/5 pointer-events-none" />
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-4 bg-zinc-950/60 backdrop-blur-3xl border-l border-white/5 w-full">
                        <div className="p-5 rounded-3xl bg-primary/10 border border-primary/20 shadow-2xl">
                          <ImageIcon className="size-12 text-primary/60" />
                        </div>
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/50">
                            Legacy Asset Mode
                          </span>
                          <span className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">
                            Non-URL Data Mapping
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className={`${
                  variant === "compact" ? "p-6" : "p-14"
                } flex flex-col items-center justify-center text-center relative z-10`}
              >
                <div
                  className={`${variant === "compact" ? "mb-6" : "mb-12"} relative group/icon`}
                >
                  <div
                    className={`${
                      variant === "compact" ? "blur-xl" : "blur-2xl"
                    } absolute inset-0 bg-primary/20 rounded-full animate-pulse scale-[1.5]`}
                  />
                  <div
                    className={`${
                      variant === "compact"
                        ? "size-20 rounded-[1.5rem]"
                        : "size-32 rounded-[2.5rem]"
                    } relative bg-zinc-900/40 backdrop-blur-3xl flex items-center justify-center border border-white/10 shadow-[0_0_50px_-12px_rgba(var(--primary),0.3)] group-hover/icon:scale-110 group-hover/icon:rotate-6 transition-all duration-700`}
                  >
                    <ImageIcon
                      className={`${
                        variant === "compact" ? "size-10" : "size-16"
                      } text-primary opacity-90 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]`}
                    />
                  </div>
                  <div
                    className={`${
                      variant === "compact"
                        ? "-top-2 -right-2 px-2 py-1 rounded-lg"
                        : "-top-4 -right-4 px-4 py-2 rounded-2xl"
                    } absolute bg-primary/30 backdrop-blur-md border border-primary/40 shadow-xl`}
                  >
                    <Sparkles
                      className={`${variant === "compact" ? "size-3" : "size-6"} text-white animate-pulse`}
                    />
                  </div>
                </div>

                <h3
                  className={`${
                    variant === "compact" ? "text-xl mb-2" : "text-3xl mb-5"
                  } font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/50`}
                >
                  Collaborator Visuals
                </h3>
                <p
                  className={`${
                    variant === "compact"
                      ? "text-[10px] mb-6"
                      : "text-[12px] mb-14"
                  } text-muted-foreground font-black uppercase tracking-[0.4em] leading-loose max-w-sm opacity-50`}
                >
                  Inscribe digital identity <br />
                  <span className="text-[11px] text-primary/60 font-bold">
                    (Max. {maxSizeMB}MB)
                  </span>
                </p>

                <Button
                  type="button"
                  size={variant === "compact" ? "lg" : "xl"}
                  className={`${
                    variant === "compact"
                      ? "rounded-xl px-10 py-6"
                      : "rounded-[1.5rem] px-16 py-9"
                  } text-[13px] font-black bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 uppercase tracking-[0.3em] shadow-[0_25px_50px_-12px_rgba(var(--primary),0.5)] border-t border-white/20 active:translate-y-1`}
                  onClick={openFileDialog}
                >
                  <UploadIcon
                    className={`${variant === "compact" ? "mr-2 size-4" : "mr-4 size-6"}`}
                  />
                  Upload
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-0 right-0 flex justify-center z-50"
          >
            <div className="bg-destructive/10 text-destructive border border-destructive/20 px-6 py-2 rounded-2xl flex items-center gap-3 text-[11px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md mx-4 text-center">
              <AlertCircleIcon className="size-4 shrink-0" />
              <span>{errors[0]}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SingleImageUploader;
