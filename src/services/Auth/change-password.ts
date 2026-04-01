"use server";

import { IChangePassword, ApiResponse } from "@/types";
import serverFetch from "@/lib/server-fetch";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";

export const changePasswordAction = catchAsyncAction(
  async (passwordData: IChangePassword): Promise<ApiResponse<Record<string, unknown>>> => {
    return await serverFetch.patch(`/auth/change-password`, {
      body: passwordData,
    });
  },
);
