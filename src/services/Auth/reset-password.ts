"use server";

import serverFetch from "@/lib/server-fetch";
import { ApiResponse } from "@/types";

export const resetPasswordAction = async (
  payload: Record<string, unknown>
): Promise<ApiResponse<unknown>> => {
  try {
    const res = await serverFetch.post<ApiResponse<unknown>>(
      "/auth/reset-password",
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    return res;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error).message || "Something went wrong",
      statusCode: 500,
      data: null,
    };
  }
};
