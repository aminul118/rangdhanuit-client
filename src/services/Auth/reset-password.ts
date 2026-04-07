"use server";

import serverFetch from "@/lib/server-fetch";
import { ApiResponse, IResetPasswordData } from "@/types";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";

export const resetPasswordAction = catchAsyncAction(
  async (
    payload: IResetPasswordData,
  ): Promise<ApiResponse<Record<string, unknown>>> => {
    return await serverFetch.post<ApiResponse<Record<string, unknown>>>(
      "/auth/reset-password",
      {
        body: payload,
      },
    );
  },
);
