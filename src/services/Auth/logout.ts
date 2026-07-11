"use server";

import { ApiResponse } from "@/types";
import serverFetch from "@/lib/server-fetch";
import { removeAccessToken, removeRefreshToken } from "./cookie-token";

export const logoutAction = async (): Promise<ApiResponse<unknown>> => {
  // Blacklist refresh token server-side
  try {
    await serverFetch.post("/auth/logout");
  } catch {
    // Proceed with local cleanup even if server call fails
  }

  await removeAccessToken();
  await removeRefreshToken();
  return {
    success: true,
    message: "Logged out successfully",
    statusCode: 200,
    data: null,
  };
};
