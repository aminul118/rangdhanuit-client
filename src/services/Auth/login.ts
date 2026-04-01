"use server";

import serverFetch from "@/lib/server-fetch";
import { ApiResponse, ILogin } from "@/types";
import { setAccessToken, setRefreshToken } from "./cookie-token";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";

export const loginAction = catchAsyncAction(
  async (payload: Record<string, unknown>): Promise<ApiResponse<ILogin>> => {
    const res = await serverFetch.post<ApiResponse<ILogin>>("/auth/login", {
      body: payload,
    });

    const { accessToken, refreshToken } = res.data;

    await setAccessToken(accessToken);
    await setRefreshToken(refreshToken);

    return res;
  },
);
