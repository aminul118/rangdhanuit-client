"use server";

import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse } from "@/types";
import serverFetch from "@/lib/server-fetch";

export const getAllUsers = async (query?: Record<string, string>) => {
  return await serverFetch.get("/users", {
    query,
    next: { tags: ["users"] },
  });
};

export const createUser = catchAsyncAction(
  async (userData: Record<string, unknown>): Promise<ApiResponse<unknown>> => {
    return await serverFetch.post("/users/create-user", {
      body: userData,
    });
  },
);

export const updateUserStatus = catchAsyncAction(
  async (
    id: string,
    status: "ACTIVE" | "BLOCKED",
  ): Promise<ApiResponse<unknown>> => {
    return await serverFetch.patch(`/users/${id}/status`, {
      body: { status },
    });
  },
);

export const updateUserRole = catchAsyncAction(
  async (id: string, role: "ADMIN" | "USER"): Promise<ApiResponse<unknown>> => {
    return await serverFetch.patch(`/users/${id}/role`, {
      body: { role },
    });
  },
);

export const deleteUser = catchAsyncAction(
  async (id: string): Promise<ApiResponse<unknown>> => {
    return await serverFetch.delete(`/users/${id}`);
  },
);

export const getStatistics = async () => {
  return await serverFetch.get("/users/statistics", {
    next: { tags: ["users"] },
  });
};
