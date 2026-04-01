"use server";

import serverFetch from "@/lib/server-fetch";
import { IUpdateProfile, ApiResponse } from "@/types";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";

export const updateProfileAction = catchAsyncAction(
  async (profileData: IUpdateProfile): Promise<ApiResponse<unknown>> => {
    return await serverFetch.patch("/users/update-profile", {
      body: profileData,
    });
  },
);
