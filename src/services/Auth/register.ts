"use server";

import serverFetch from "@/lib/server-fetch";
import { ApiResponse, IUser } from "@/types";

export const registerAction = async (
  payload: Record<string, unknown>
): Promise<ApiResponse<IUser | null>> => {
  try {
    const res = await serverFetch.post<ApiResponse<IUser>>("/auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return res;
  } catch (err: unknown) {
    return {
      success: false,
      message: (err as Error).message || "Registration failed",
      statusCode: 500,
      data: null,
    };
  }
};
