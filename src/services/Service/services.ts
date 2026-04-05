"use server";

import serverFetch from "@/lib/server-fetch";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse, IService } from "@/types";

export const getServices = async (
  query?: Record<string, string>,
): Promise<ApiResponse<IService[]>> => {
  return await serverFetch.get("/services", {
    query,
    next: { tags: ["services"] },
  });
};

export const getServiceBySlug = async (
  slug: string,
): Promise<ApiResponse<IService>> => {
  return await serverFetch.get(`/services/slug/${slug}`, {
    next: { tags: ["services", slug] },
  });
};


export const createService = catchAsyncAction(
  async (formData: FormData): Promise<ApiResponse<IService>> => {
    return await serverFetch.post("/services", {
      body: formData,
    });
  },
);


export const updateServiceBySlug = catchAsyncAction(
  async (slug: string, formData: FormData): Promise<ApiResponse<IService>> => {
    return await serverFetch.patch(`/services/slug/${slug}`, {
      body: formData,
    });
  },
);

export const deleteService = catchAsyncAction(
  async (slug: string): Promise<ApiResponse<IService>> => {
    return await serverFetch.delete(`/services/slug/${slug}`);
  },
);
