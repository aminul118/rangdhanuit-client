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

export const getPortfolioById = async (
  id: string,
): Promise<ApiResponse<IPortfolio>> => {
  return await serverFetch.get(`/portfolios/${id}`, {
    next: { tags: ["portfolios", id] },
  });
};

export const getPortfolioBySlug = async (
  slug: string,
): Promise<ApiResponse<IPortfolio>> => {
  return await serverFetch.get(`/portfolios/slug/${slug}`, {
    next: { tags: ["portfolios", slug] },
  });
};

export const updatePortfolio = catchAsyncAction(
  async (id: string, payload: FormData): Promise<ApiResponse<IPortfolio>> => {
    return await serverFetch.put(`/portfolios/${id}`, {
      body: payload,
    });
  },
);

export const deletePortfolio = catchAsyncAction(
  async (id: string): Promise<ApiResponse<IPortfolio>> => {
    return await serverFetch.delete(`/portfolios/${id}`);
  },
);
