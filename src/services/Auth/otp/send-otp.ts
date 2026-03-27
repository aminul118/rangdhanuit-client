"use server";

import serverFetch from "@/lib/server-fetch";
import { ApiResponse } from "@/types";

export const sendOTPAction = async (
  email: string
): Promise<ApiResponse<unknown>> => {
  try {
    const res = await serverFetch.post<ApiResponse<unknown>>("/auth/send-otp", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
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
