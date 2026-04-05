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
              : "hsl(var(--border)/0.15)",
            backgroundColor: isDragging
              ? "hsl(var(--primary)/0.05)"
              : "hsl(var(--background)/0.3)",
          }}
          className="relative flex min-h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border-2 border-dashed transition-all duration-700 backdrop-blur-3xl shadow-2xl hover:border-primary/50 group/dropzone"
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
                className="grid grid-cols-1 md:grid-cols-[1.2fr_1px_1fr] w-full h-full min-h-[320px] relative z-10"
              >
                {/* Left Side: Asset Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col justify-center items-start p-10 space-y-6"
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

                    <h4 className="text-2xl font-black tracking-tight text-white line-clamp-1 group-hover/dropzone:text-primary transition-colors">
                      {files[0]?.file?.name || "Partner Logo"}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="rounded-2xl border border-white/10 font-black px-10 py-7 hover:bg-white/10 active:scale-95 transition-all text-[11px] uppercase tracking-widest shadow-2xl hover:shadow-primary/10"
                      onClick={openFileDialog}
                    >
                      Swap Asset
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="size-14 rounded-2xl border border-white/5 active:scale-95 transition-all shadow-2xl hover:bg-red-600"
                      onClick={() => removeFile(files[0]?.id)}
                    >
                      <XIcon className="size-5" />
                    </Button>
                  </div>
                </motion.div>

                {/* Center: Vertical Separator */}
                <div className="hidden md:flex flex-col items-center justify-center py-10">
                  <div className="w-px h-full bg-linear-to-b from-transparent via-border/20 to-transparent" />
                </div>

                {/* Right Side: Preview */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-full h-full min-h-[300px] flex items-center justify-center p-10 overflow-hidden"
                >
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                      key={`ambient-${previewUrl}`}
                      src={previewUrl}
                      alt="Ambient glow"
                      fill
                      className="object-cover blur-[120px] opacity-40 transition-all duration-1000"
                    />
                  </div>

                  <div className="relative z-10 w-full aspect-square max-w-[200px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-zinc-950/40 flex items-center justify-center backdrop-blur-md group-hover/dropzone:scale-105 transition-transform duration-700">
                    <Image
                      key={`main-${previewUrl}`}
                      src={previewUrl}
                      alt="Logo preview"
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col items-center justify-center p-14 text-center relative z-10"
              >
                <div className="relative mb-12 group/icon">
                  <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-[1.8] animate-pulse" />
                  <div className="relative bg-zinc-900/40 backdrop-blur-3xl size-32 flex items-center justify-center rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_-12px_rgba(var(--primary),0.3)] group-hover/icon:scale-110 group-hover/icon:rotate-6 transition-all duration-700">
                    <ImageIcon className="size-16 text-primary opacity-90 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-primary/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-primary/40 shadow-xl">
                    <Sparkles className="size-6 text-white animate-pulse" />
                  </div>
                </div>

                <h3 className="text-3xl font-black tracking-tighter mb-5 text-transparent bg-clip-text bg-linear-to-b from-white to-white/50">
                  Collaborator Visuals
                </h3>
                <p className="text-muted-foreground text-[12px] font-black uppercase tracking-[0.4em] leading-loose max-w-sm mb-14 opacity-50">
                  Inscribe your partner&apos;s digital identity <br />
                  <span className="text-[11px] text-primary/60 font-bold">(Max. {maxSizeMB}MB • WebP / PNG / SVG)</span>
                </p>

                <Button
                  type="button"
                  size="xl"
                  className="rounded-[1.5rem] px-16 py-9 text-[13px] font-black bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 uppercase tracking-[0.3em] shadow-[0_25px_50px_-12px_rgba(var(--primary),0.5)] border-t border-white/20 active:translate-y-1"
                  onClick={openFileDialog}
                >
                  <UploadIcon className="mr-4 size-6" />
                  Launch Vault Upload
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
