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

export const getPartnerBySlug = async (
  slug: string,
): Promise<ApiResponse<IPartner>> => {
  return await serverFetch.get(`/partners/${slug}`, {
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

export const updatePartnerBySlug = catchAsyncAction(
  async (
    slug: string,
    payload: FormData | PartnerPayload,
  ): Promise<ApiResponse<IPartner>> => {
    const res = await serverFetch.patch(`/partners/${slug}`, {
      body: payload,
    });
    revalidate("partners");
    return res;
  },
);

export const deletePartnerBySlug = catchAsyncAction(
  async (slug: string): Promise<ApiResponse<IPartner>> => {
    const res = await serverFetch.delete(`/partners/${slug}`);
    revalidate("partners");
    return res;
  },
);
