import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

/**
 * Modern Low-Code Hook for managing table searchParams (get, set, remove, clear)
 * Usage:
 *   const { get, set, remove, clear, isPending } = useTableParams();
 *   set({ searchTerm: "acme", page: 1 });
 *   remove("searchTerm");
 *   clear();
 */
export function useTableParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Get parameter by key
  const get = useCallback(
    (key: string, defaultValue: string = "") => {
      return searchParams.get(key) || defaultValue;
    },
    [searchParams],
  );

  // Set single or multiple parameters (deletes if value is null/undefined/'')
  const set = useCallback(
    (paramsToSet: Record<string, string | number | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(paramsToSet).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  // Remove specific parameters
  const remove = useCallback(
    (...keys: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      keys.forEach((k) => params.delete(k));

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  // Clear all search parameters
  const clear = useCallback(() => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  }, [pathname, router]);

  return {
    get,
    set,
    remove,
    clear,
    isPending,
    searchParams,
  };
}

export default useTableParams;
