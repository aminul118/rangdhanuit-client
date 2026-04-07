import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

/**
 * A hook to manage search parameters collectively.
 * Provides parameter values and a helper to update them.
 */
const useSearchParamsValues = <T extends string>(...keys: T[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Memoize values to avoid unnecessary re-renders
  const values = useMemo(() => {
    const result = {} as Record<T, string | null>;
    keys.forEach((key) => {
      result[key] = searchParams.get(key);
    });
    return result;
  }, [keys, searchParams]);

  /**
   * Updates multiple search parameters at once.
   * - values like null, undefined, or empty string are automatically deleted.
   * - numbers are converted to strings.
   * - merges with existing params unless overwrite is true.
   */
  const setParams = useCallback(
    (
      newParams: Record<string, string | number | null | undefined>,
      options: { scroll?: boolean; replace?: boolean } = {
        scroll: false,
        replace: false,
      },
    ) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      const url = `${pathname}?${params.toString()}`;

      if (options.replace) {
        router.replace(url, { scroll: options.scroll });
      } else {
        router.push(url, { scroll: options.scroll });
      }
    },
    [pathname, router, searchParams],
  );

  const getParam = useCallback(
    (key: string) => searchParams.get(key),
    [searchParams],
  );

  return {
    values,
    setParams,
    getParam,
    searchParams,
    pathname,
    router,
  };
};

export default useSearchParamsValues;

/**
 * -----------------------------------------------------------
 *                         Use Process
 * -----------------------------------------------------------
 *   const { page, limit } = useSearchParamsValues("page", "limit");
 */
