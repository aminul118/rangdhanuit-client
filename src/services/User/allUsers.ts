"use server";

import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse, IUser, IUserStats } from "@/types";
import serverFetch from "@/lib/server-fetch";
import { revalidate } from "@/helpers/revalidate";

export const getAllUsers = async (
  query?: Record<string, string>,
): Promise<ApiResponse<IUser[]>> => {
  return await serverFetch.get("/users", {
    query,
    next: { tags: ["users"] },
  });
};

export const createUser = catchAsyncAction(
  async (userData: Partial<IUser>): Promise<ApiResponse<IUser>> => {
    const res = await serverFetch.post("/users/create-user", {
      body: userData,
    });
    await revalidate("users");
    return res;
  },
);

export const updateUserStatus = catchAsyncAction(
  async (
    id: string,
    status: "ACTIVE" | "BLOCKED",
  ): Promise<ApiResponse<IUser>> => {
    const res = await serverFetch.patch(`/users/${id}/status`, {
      body: { status },
    });
    await revalidate(["users", id]);
    return res;
  },
);

export const updateUserRole = catchAsyncAction(
  async (id: string, role: "ADMIN" | "USER"): Promise<ApiResponse<IUser>> => {
    const res = await serverFetch.patch(`/users/${id}/role`, {
      body: { role },
    });
    await revalidate(["users", id]);
    return res;
  },
);

export const deleteUser = catchAsyncAction(
  async (id: string): Promise<ApiResponse<IUser>> => {
    const res = await serverFetch.delete(`/users/${id}`);
    await revalidate(["users", id]);
    return res;
  },
);

export const getStatistics = async (): Promise<ApiResponse<IUserStats>> => {
  return await serverFetch.get("/users/statistics", {
    next: { tags: ["users"] },
  });
};
