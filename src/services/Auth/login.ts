"use server";

import serverFetch from "@/lib/server-fetch";
import { ApiResponse, ILogin } from "@/types";
import { setAccessToken, setRefreshToken } from "./cookie-token";

export const loginAction = async (
  payload: Record<string, unknown>
): Promise<ApiResponse<ILogin | null>> => {
  try {
    const res = await serverFetch.post<ApiResponse<ILogin>>("/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res?.success) {
      return {
        success: false,
        message: res?.message || "Something went wrong",
        statusCode: res?.statusCode || 401,
        data: null,
      };
    }

    const { accessToken, refreshToken } = res.data;

    await setAccessToken(accessToken);
    await setRefreshToken(refreshToken);

    return {
      success: true,
      message: "Login Successfully",
      statusCode: 200,
      data: res.data,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: (err as Error).message || "Login failed",
      statusCode: 500,
      data: null,
    };
  }
};
