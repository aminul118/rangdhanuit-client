"use server";

import serverFetch from "@/lib/server-fetch";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse, IPortfolio } from "@/types";

export const createPortfolio = catchAsyncAction(
  async (payload: FormData): Promise<ApiResponse<IPortfolio>> => {
    return await serverFetch.post("/portfolios/create-portfolio", {
      body: payload,
    });
  },
);

export const getPortfolios = async (
  query?: Record<string, string>,
): Promise<ApiResponse<IPortfolio[]>> => {
  return await serverFetch.get("/portfolios", {
    query,
    next: { tags: ["portfolios"] },
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
    return await serverFetch.patch(`/portfolios/${slug}`, {
      body: payload,
    });
  },
);

export const deletePortfolioBySlug = catchAsyncAction(
  async (slug: string): Promise<ApiResponse<IPortfolio>> => {
    return await serverFetch.delete(`/portfolios/${slug}`);
  },
);
