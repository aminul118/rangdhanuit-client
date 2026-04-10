"use server";

import serverFetch from "@/lib/server-fetch";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse, IPortfolio } from "@/types";
import { revalidate } from "@/helpers/revalidate";

export const createPortfolio = catchAsyncAction(
  async (payload: FormData): Promise<ApiResponse<IPortfolio>> => {
    const res = await serverFetch.post("/portfolios/create-portfolio", {
      body: payload,
    });
    await revalidate("portfolios");
    return res;
  },
);

export const getPortfolios = async (
  query?: Record<string, string>,
): Promise<ApiResponse<IPortfolio[]>> => {
  return await serverFetch.get("/portfolios", {
    query,
    next: { tags: ["portfolios"] },
    skipAuth: true,
  });
};

export const getPortfolioBySlug = async (
  slug: string,
): Promise<ApiResponse<IPortfolio>> => {
  return await serverFetch.get(`/portfolios/${slug}`, {
    next: { tags: ["portfolios", slug] },
  });
};

export const updatePortfolioBySlug = catchAsyncAction(
  async (slug: string, payload: FormData): Promise<ApiResponse<IPortfolio>> => {
    const res = await serverFetch.patch(`/portfolios/${slug}`, {
      body: payload,
    });
    await revalidate(["portfolios", slug]);
    return res;
  },
);

export const deletePortfolioBySlug = catchAsyncAction(
  async (slug: string): Promise<ApiResponse<IPortfolio>> => {
    const res = await serverFetch.delete(`/portfolios/${slug}`);
    await revalidate(["portfolios", slug]);
    return res;
  },
);
