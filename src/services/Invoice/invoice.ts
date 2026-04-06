"use server";

import serverFetch from "@/lib/server-fetch";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse } from "@/types";
import { IInvoice } from "@/types/Invoice/invoice.types";

export const getInvoices = async (
  query?: Record<string, string>,
): Promise<ApiResponse<IInvoice[]>> => {
  return await serverFetch.get("/invoices", {
    query,
    next: { tags: ["invoices"] },
  });
};

export const getInvoiceById = async (
  id: string,
): Promise<ApiResponse<IInvoice>> => {
  return await serverFetch.get(`/invoices/${id}`, {
    next: { tags: ["invoices", id] },
  });
};

export const createInvoice = catchAsyncAction(
  async (data: Partial<IInvoice>): Promise<ApiResponse<IInvoice>> => {
    return await serverFetch.post("/invoices", {
      body: data,
    });
  },
);

export const updateInvoice = catchAsyncAction(
  async (id: string, data: Partial<IInvoice>): Promise<ApiResponse<IInvoice>> => {
    return await serverFetch.patch(`/invoices/${id}`, {
      body: data,
    });
  },
);

export const deleteInvoice = catchAsyncAction(
  async (id: string): Promise<ApiResponse<IInvoice>> => {
    return await serverFetch.delete(`/invoices/${id}`);
  },
);
