import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isValidImageSrc = (src: string | null | undefined): boolean => {
  if (!src) return false;
  return (
    src.startsWith("/") ||
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  );
};

export const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
  );
  const videoId = match ? match[1] : url.split("/").pop() || "";
  return `https://www.youtube.com/embed/${videoId}`;
};
