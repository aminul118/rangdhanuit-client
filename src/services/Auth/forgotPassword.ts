"use server";

import serverFetch from "@/lib/server-fetch";
import { ApiResponse } from "@/types";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";

export const forgotPasswordAction = catchAsyncAction(
  async (email: string): Promise<ApiResponse<unknown>> => {
    return await serverFetch.post<ApiResponse<unknown>>(
      "/auth/forgot-password",
      {
        body: { email },
      },
    );
  },
);
