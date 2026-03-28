"use server";

import envVars from "@/config/env.config";

import { IChangePassword } from "@/types";
import serverFetch from "@/lib/server-fetch";

export async function changePasswordAction(passwordData: IChangePassword) {
  try {
    const res = await serverFetch.patch(`/auth/change-password`, {
      body: JSON.stringify(passwordData),
    });

    return res;
  } catch (error: unknown) {
    const err = error as Error;
    return {
      success: false,
      message: err.message || "Failed to change password",
    };
  }
}
