"use server";

import serverFetch from "@/lib/server-fetch";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse } from "@/types";
import { revalidate } from "@/helpers/revalidate";
import {
  ILicense,
  ICreateLicenseInput,
  IUpdateLicenseInput,
} from "./license.interface";

export const getLicenses = async (
  query?: Record<string, string>,
): Promise<ApiResponse<ILicense[]>> => {
  return await serverFetch.get("/licenses", {
    query,
    next: { tags: ["licenses"] },
  });
};

export const getLicenseById = async (
  id: string,
): Promise<ApiResponse<ILicense>> => {
  return await serverFetch.get(`/licenses/${id}`, {
    next: { tags: ["licenses", id] },
  });
};

export const createLicense = catchAsyncAction(
  async (data: ICreateLicenseInput): Promise<ApiResponse<ILicense>> => {
    const res = await serverFetch.post("/licenses", {
      body: data,
    });
    await revalidate("licenses");
    return res;
  },
);

export const updateLicense = catchAsyncAction(
  async (
    id: string,
    data: IUpdateLicenseInput,
  ): Promise<ApiResponse<ILicense>> => {
    const res = await serverFetch.patch(`/licenses/${id}`, {
      body: data,
    });
    await revalidate(["licenses", id]);
    return res;
  },
);

export const approveLicensePayment = catchAsyncAction(
  async (id: string, months?: number): Promise<ApiResponse<ILicense>> => {
    const res = await serverFetch.patch(`/licenses/${id}/approve`, {
      body: { months },
    });
    await revalidate(["licenses", id]);
    return res;
  },
);

export const sendLicenseInvoiceEmail = catchAsyncAction(
  async (id: string): Promise<ApiResponse<ILicense>> => {
    const res = await serverFetch.post(`/licenses/${id}/send-email`, {
      body: {},
    });
    return res;
  },
);

export const deleteLicense = catchAsyncAction(
  async (id: string): Promise<ApiResponse<ILicense>> => {
    const res = await serverFetch.delete(`/licenses/${id}`);
    await revalidate(["licenses", id]);
    return res;
  },
);
