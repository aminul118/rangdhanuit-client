"use server";

import serverFetch from "@/lib/server-fetch";
import { AppError } from "@/helpers/AppError";

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

const tryRefreshToken = async () => {
  // serverFetch automatically handles cookies via getCookie
  try {
    const res = await serverFetch.post<{
      success: boolean;
      data: RefreshResponse;
      message?: string;
    }>("/auth/refresh-token", {
      cache: "no-store",
    });

    if (!res?.success || !res?.data?.accessToken) return null;

    return {
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    } as RefreshResponse;
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
