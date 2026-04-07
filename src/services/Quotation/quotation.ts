"use server";

import serverFetch from "@/lib/server-fetch";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse } from "@/types";
import { IQuotation } from "@/types/Quotation/quotation.types";

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
    return await serverFetch.post("/quotations", {
      body: data,
    });
  },
);

export const updateQuotation = catchAsyncAction(
  async (
    id: string,
    data: Partial<IQuotation>,
  ): Promise<ApiResponse<IQuotation>> => {
    return await serverFetch.patch(`/quotations/${id}`, {
      body: data,
    });
  },
);

export const deleteQuotation = catchAsyncAction(
  async (id: string): Promise<ApiResponse<IQuotation>> => {
    return await serverFetch.delete(`/quotations/${id}`);
  },
);
