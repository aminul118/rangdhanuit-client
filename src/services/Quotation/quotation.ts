"use server";

import serverFetch from "@/lib/server-fetch";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse } from "@/types";
import { IQuotation } from "@/types/Quotation/quotation.types";
import { revalidate } from "@/helpers/revalidate";

export const getQuotations = async (
  query?: Record<string, string>,
): Promise<ApiResponse<IQuotation[]>> => {
  return await serverFetch.get("/quotations", {
    query,
    next: { tags: ["quotations"] },
  });
};

export const getQuotationById = async (
  id: string,
): Promise<ApiResponse<IQuotation>> => {
  return await serverFetch.get(`/quotations/${id}`, {
    next: { tags: ["quotations", id] },
  });
};

export const createQuotation = catchAsyncAction(
  async (data: Partial<IQuotation>): Promise<ApiResponse<IQuotation>> => {
    const res = await serverFetch.post("/quotations", {
      body: data,
    });
    await revalidate("quotations");
    return res;
  },
);

export const updateQuotation = catchAsyncAction(
  async (
    id: string,
    data: Partial<IQuotation>,
  ): Promise<ApiResponse<IQuotation>> => {
    const res = await serverFetch.patch(`/quotations/${id}`, {
      body: data,
    });
    await revalidate(["quotations", id]);
    return res;
  },
);

export const deleteQuotation = catchAsyncAction(
  async (id: string): Promise<ApiResponse<IQuotation>> => {
    const res = await serverFetch.delete(`/quotations/${id}`);
    await revalidate(["quotations", id]);
    return res;
  },
);
