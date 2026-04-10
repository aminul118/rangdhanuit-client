"use server";

import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse, BlogPayload, IBlog } from "@/types";
import serverFetch from "@/lib/server-fetch";
import { revalidate } from "@/helpers/revalidate";

export const getBlogs = async (
  query?: Record<string, string>,
): Promise<ApiResponse<IBlog[]>> => {
  return await serverFetch.get("/blogs", {
    query,
    next: { tags: ["blogs"] },
    skipAuth: true,
  });
};

export const getBlogBySlug = async (
  slug: string,
): Promise<ApiResponse<IBlog>> => {
  return await serverFetch.get(`/blogs/slug/admin/${slug}`, {
    next: { tags: ["blogs", slug] },
  });
};

export const updateBlogBySlug = catchAsyncAction(
  async (
    slug: string,
    payload: FormData | BlogPayload,
  ): Promise<ApiResponse<IBlog>> => {
    const res = await serverFetch.patch(`/blogs/slug/${slug}`, {
      body: payload,
    });
    revalidate(["blogs", slug]);
    return res;
  },
);

export const createBlog = catchAsyncAction(
  async (payload: FormData | BlogPayload): Promise<ApiResponse<IBlog>> => {
    const res = await serverFetch.post("/blogs", {
      body: payload,
    });
    revalidate("blogs");
    return res;
  },
);

export const deleteBlog = catchAsyncAction(
  async (slug: string): Promise<ApiResponse<IBlog>> => {
    const res = await serverFetch.delete(`/blogs/slug/${slug}`);
    revalidate(["blogs", slug]);
    return res;
  },
);

export const incrementBlogView = async (
  slug: string,
): Promise<ApiResponse<IBlog>> => {
  return await serverFetch.patch(`/blogs/view/${slug}`);
};
