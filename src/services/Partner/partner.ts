"use server";

import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import serverFetch from "@/lib/server-fetch";
import { ApiResponse, IPartner, PartnerPayload } from "@/types";
import { revalidate } from "@/helpers/revalidate";

export const getPartners = async (
  query?: Record<string, string>,
): Promise<ApiResponse<IPartner[]>> => {
  return await serverFetch.get("/partners", {
    query,
    next: { tags: ["partners"] },
  });
};

export const getPartnerById = async (
  id: string,
): Promise<ApiResponse<IPartner>> => {
  return await serverFetch.get(`/partners/${id}`, {
    next: { tags: ["partners", id] },
  });
};

export const getPartnerBySlug = async (
  slug: string,
): Promise<ApiResponse<IPartner>> => {
  return await serverFetch.get(`/partners/slug/${slug}`, {
    next: { tags: ["partners", slug] },
  });
};

export const createPartner = catchAsyncAction(
  async (
    payload: FormData | PartnerPayload,
  ): Promise<ApiResponse<IPartner>> => {
    const res = await serverFetch.post("/partners", {
      body: payload,
    });
    revalidate("partners");
    return res;
  },
);

export const updatePartner = catchAsyncAction(
  async (
    id: string,
    payload: FormData | PartnerPayload,
  ): Promise<ApiResponse<IPartner>> => {
    const res = await serverFetch.patch(`/partners/${id}`, {
      body: payload,
    });
    revalidate("partners");
    return res;
  },
);

export const deletePartner = catchAsyncAction(
  async (id: string): Promise<ApiResponse<IPartner>> => {
    const res = await serverFetch.delete(`/partners/${id}`);
    revalidate("partners");
    return res;
  },
);
