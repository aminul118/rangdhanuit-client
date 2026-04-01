"use server";

import serverFetch from "@/lib/server-fetch";
import { ApiResponse } from "@/types";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";

export const resetPasswordAction = catchAsyncAction(
  async (payload: Record<string, unknown>): Promise<ApiResponse<unknown>> => {
    return await serverFetch.post<ApiResponse<unknown>>(
      "/auth/reset-password",
      {
        body: payload,
      },
    );
  },
);
