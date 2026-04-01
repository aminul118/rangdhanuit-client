"use server";

import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse, IBlog } from "@/types";
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
  return await serverFetch.get(`/blogs/${slug}`, {
    next: { tags: ["blogs", slug] },
  });
};

export const getBlogById = async (
  id: string,
): Promise<ApiResponse<IBlog>> => {
  return await serverFetch.get(`/blogs/id/${id}`, {
    next: { tags: ["blogs", id] },
  });
};

interface BlogPayload {
  title?: string;
  content?: string;
  category?: string;
  featuredImage?: string;
  tags?: string[];
  status?: "DRAFT" | "PUBLISHED";
}

export const createBlog = catchAsyncAction(
  async (payload: FormData | BlogPayload): Promise<ApiResponse<IBlog>> => {
    return await serverFetch.post("/blogs", {
      body: payload,
    });
  },
);

export const updateBlog = catchAsyncAction(
  async (
    id: string,
    payload: FormData | BlogPayload,
  ): Promise<ApiResponse<IBlog>> => {
    return await serverFetch.patch(`/blogs/${id}`, {
      body: payload,
    });
  },
);

export const deleteBlog = catchAsyncAction(
  async (id: string): Promise<ApiResponse<IBlog>> => {
    return await serverFetch.delete(`/blogs/${id}`);
  },
);
