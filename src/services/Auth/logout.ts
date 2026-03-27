"use server";

import { ApiResponse } from "@/types";
import { removeAccessToken, removeRefreshToken } from "./cookie-token";

export const logoutAction = async (): Promise<ApiResponse<unknown>> => {
  await removeAccessToken();
  await removeRefreshToken();
  return {
    success: true,
    message: "Logged out successfully",
    statusCode: 200,
    data: null,
  };
};
