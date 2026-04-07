"use server";

import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse, BlogPayload, IBlog } from "@/types";
import serverFetch from "@/lib/server-fetch";

export const getBlogs = async (
  query?: Record<string, string>,
): Promise<ApiResponse<IBlog[]>> => {
  return await serverFetch.get("/blogs", {
    query,
    next: { tags: ["blogs"] },
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
    return await serverFetch.patch(`/blogs/slug/${slug}`, {
      body: payload,
    });
  },
);

export const createBlog = catchAsyncAction(
  async (payload: FormData | BlogPayload): Promise<ApiResponse<IBlog>> => {
    return await serverFetch.post("/blogs", {
      body: payload,
    });
  },
);

export const deleteBlog = catchAsyncAction(
  async (slug: string): Promise<ApiResponse<IBlog>> => {
    return await serverFetch.delete(`/blogs/slug/${slug}`);
  },
);

export const incrementBlogView = async (
  slug: string,
): Promise<ApiResponse<IBlog>> => {
  return await serverFetch.patch(`/blogs/view/${slug}`);
};
