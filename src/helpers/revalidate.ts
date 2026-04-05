"use server";

import { revalidateTag } from "next/cache";

/**
 * Common revalidation utility to ensure data freshness.
 */
export const revalidate = async (tag: string) => {
  revalidateTag(tag, "max");
};
