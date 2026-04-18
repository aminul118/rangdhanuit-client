"use server";

import serverFetch from "@/lib/server-fetch";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse, IService } from "@/types";
import { revalidate } from "@/helpers/revalidate";

export const getServices = async (
  query?: Record<string, string>,
): Promise<ApiResponse<IService[]>> => {
  return await serverFetch.get("/services", {
    query,
    next: { tags: ["services"] },
    skipAuth: true,
  });
};

export const getServiceBySlug = async (
  slug: string,
): Promise<ApiResponse<IService>> => {
  return await serverFetch.get(`/services/slug/${slug}`, {
    next: { tags: ["services", slug] },
    skipAuth: true,
  });
};

export const createService = catchAsyncAction(
  async (formData: FormData): Promise<ApiResponse<IService>> => {
    const res = await serverFetch.post("/services", {
      body: formData,
    });
    await revalidate("services");
    await revalidate("/", "path");
    return res;
  },
);

export const updateServiceBySlug = catchAsyncAction(
  async (slug: string, formData: FormData): Promise<ApiResponse<IService>> => {
    const res = await serverFetch.patch(`/services/slug/${slug}`, {
      body: formData,
    });
    await revalidate(["services", slug]);
    await revalidate("/", "path");
    return res;
  },
);

export const deleteService = catchAsyncAction(
  async (slug: string): Promise<ApiResponse<IService>> => {
    const res = await serverFetch.delete(`/services/slug/${slug}`);
    await revalidate(["services", slug]);
    await revalidate("/", "path");
    return res;
  },
);
