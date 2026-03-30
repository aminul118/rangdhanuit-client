"use server";

import serverFetch from "@/lib/server-fetch";

export const getBlogs = async (query?: Record<string, string>) => {
  return await serverFetch.get("/blogs", { query });
};

export const getBlogBySlug = async (slug: string) => {
  return await serverFetch.get(`/blogs/${slug}`);
};

export const getBlogById = async (id: string) => {
  return await serverFetch.get(`/blogs/id/${id}`);
};



interface BlogPayload {
  title?: string;
  content?: string;
  category?: string;
  featuredImage?: string;
  tags?: string[];
  status?: "DRAFT" | "PUBLISHED";
}

export const createBlog = async (payload: FormData | BlogPayload) => {
  return await serverFetch.post("/blogs", {
    body: payload instanceof FormData ? payload : JSON.stringify(payload),
  });
};

export const updateBlog = async (
  id: string,
  payload: FormData | BlogPayload,
) => {
  return await serverFetch.patch(`/blogs/${id}`, {
    body: payload instanceof FormData ? payload : JSON.stringify(payload),
  });
};

export const deleteBlog = async (id: string) => {
  return await serverFetch.delete(`/blogs/${id}`);
};
