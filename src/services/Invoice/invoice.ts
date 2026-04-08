"use server";

import serverFetch from "@/lib/server-fetch";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse } from "@/types";
import { IInvoice } from "@/types/Invoice/invoice.types";
import { revalidate } from "@/helpers/revalidate";

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
    const res = await serverFetch.post("/invoices", {
      body: data,
    });
    revalidate("invoices");
    return res;
  },
);

export const updateInvoice = catchAsyncAction(
  async (
    id: string,
    data: Partial<IInvoice>,
  ): Promise<ApiResponse<IInvoice>> => {
    const res = await serverFetch.patch(`/invoices/${id}`, {
      body: data,
    });
    revalidate(["invoices", id]);
    return res;
  },
);

export const deleteInvoice = catchAsyncAction(
  async (id: string): Promise<ApiResponse<IInvoice>> => {
    const res = await serverFetch.delete(`/invoices/${id}`);
    revalidate(["invoices", id]);
    return res;
  },
);
