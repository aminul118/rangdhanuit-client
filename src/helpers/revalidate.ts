import { revalidateTag, revalidatePath } from "next/cache";

/**
 * Common revalidation utility to ensure data freshness.
 * Supports both tag-based and path-based revalidation.
 */
export const revalidate = async (
  target: string | string[],
  type: "tag" | "path" = "tag",
) => {
  if (type === "path") {
    if (Array.isArray(target)) {
      target.forEach((path) => revalidatePath(path, "layout"));
    } else {
      revalidatePath(target, "layout");
    }
  } else {
    if (Array.isArray(target)) {
      target.forEach((tag) => (revalidateTag as any)(tag, "max"));
    } else {
      (revalidateTag as any)(target, "max");
    }
  }
};
