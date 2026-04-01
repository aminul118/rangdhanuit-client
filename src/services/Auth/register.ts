"use server";

import serverFetch from "@/lib/server-fetch";
import { ApiResponse, IUser, IRegisterData } from "@/types";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";

export const registerAction = catchAsyncAction(
  async (payload: IRegisterData): Promise<ApiResponse<IUser>> => {
    return await serverFetch.post<ApiResponse<IUser>>("/auth/register", {
      body: payload,
    });
  },
);
