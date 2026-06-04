"use client";

import { useEffect, useRef } from "react";
import { incrementBlogView } from "@/services/Blog/blogs";

interface BlogViewCounterProps {
  slug: string;
}

export const BlogViewCounter = ({ slug }: BlogViewCounterProps) => {
  const incremented = useRef(false);

  useEffect(() => {
    if (!incremented.current && slug) {
      incremented.current = true;
      // Increment view in background
      incrementBlogView(slug).catch(() => {
        // Silently fail if view count cannot be incremented
      });
    }
  }, [slug]);

  return null; // This component renders nothing
};
