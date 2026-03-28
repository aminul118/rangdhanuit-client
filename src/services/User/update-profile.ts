"use server";

import serverFetch from "@/lib/server-fetch";

import { IUpdateProfile } from "@/types";

export async function updateProfileAction(profileData: IUpdateProfile) {
  try {
    const res = await serverFetch.patch("users/update-profile", {
      body: JSON.stringify(profileData),
    });

    return res;
  } catch (error: unknown) {
    const err = error as Error;
    return {
      success: false,
      message: err.message || "Failed to update profile",
    };
  }
}
