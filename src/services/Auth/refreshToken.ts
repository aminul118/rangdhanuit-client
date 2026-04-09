"use server";

import serverFetch from "@/lib/server-fetch";
import { AppError } from "@/helpers/AppError";
import { ApiResponse, ILogin } from "@/types";
import { setAccessToken, setRefreshToken } from "./cookie-token";

const tryRefreshToken = async () => {
  // serverFetch automatically handles cookies via getCookie
  try {
    const res = await serverFetch.post<ApiResponse<ILogin>>(
      "/auth/refresh-token",
      {
        cache: "no-store",
      },
    );

    if (!res?.success || !res?.data?.accessToken) return null;

    const { accessToken, refreshToken } = res.data;

    await setAccessToken(accessToken);
    await setRefreshToken(refreshToken);

    return res.data;
  } catch (error) {
    if (error instanceof AppError && error.statusCode === 401) {
      // Expected if guest or session expired
      return null;
    }
    console.error("tryRefreshToken error:", error);
    return null;
  }
};

export { tryRefreshToken };
