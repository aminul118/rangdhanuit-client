"use client";

import { ReactNode, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import CreationHeader from "@/components/common/layouts/CreationHeader";

interface EditFormWrapperProps<T> {
  id: string;
  fetcher?: (id: string) => Promise<{ success: boolean; data?: T; message?: string }>;
  initialData?: T;
  title: string;
  subtitle: string;
  backLink: string;
  notFoundMessage?: string;
  children: (data: T) => ReactNode;
  padding?: string;
}

export const EditFormWrapper = <T,>({
  id,
  fetcher,
  initialData,
  title,
  subtitle,
  backLink,
  notFoundMessage = "The item you looking for might have been removed or moved.",
  children,
  padding = "max-w-8xl mx-auto pb-32 px-4 md:px-0",
}: EditFormWrapperProps<T>) => {
  const [fetching, setFetching] = useState(!initialData);
  const [data, setData] = useState<T | null>(initialData || null);

  useEffect(() => {
    if (initialData) return;
    
    // Safety check: Avoid crash if fetcher is missing
    if (!fetcher) {
      if (process.env.NODE_ENV === 'development') {
        console.warn("EditFormWrapper: No fetcher or initialData provided. Cannot fetch asset for ID:", id);
      }
      setFetching(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        const res = await fetcher(id);
        if (res.success && res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id, fetcher, initialData]);

  if (fetching) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-indigo-500">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-32 glass-premium rounded-[3rem] border border-white/5 mx-auto max-w-4xl px-8">
        <h2 className="text-3xl font-black tracking-tight text-white/90">
          Not found
        </h2>
        <p className="text-zinc-500 mt-4 font-bold">
          {notFoundMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={padding}>
      <CreationHeader
        title={title}
        subtitle={subtitle}
        backLink={backLink}
      />
      {children(data)}
    </div>
  );
};
