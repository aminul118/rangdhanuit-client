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

export const getServiceById = async (
  id: string,
): Promise<ApiResponse<IService>> => {
  return await serverFetch.get(`/services/${id}`, {
    next: { tags: ["services", id] },
  });
};

export const createService = catchAsyncAction(
  async (formData: FormData): Promise<ApiResponse<IService>> => {
    return await serverFetch.post("/services", {
      body: formData,
    });
  },
);

export const updateService = catchAsyncAction(
  async (id: string, formData: FormData): Promise<ApiResponse<IService>> => {
    return await serverFetch.patch(`/services/${id}`, {
      body: formData,
    });
  },
);

export const deleteService = catchAsyncAction(
  async (id: string): Promise<ApiResponse<IService>> => {
    return await serverFetch.delete(`/services/${id}`);
  },
);
