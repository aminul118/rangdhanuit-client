"use server";
import serverFetch from "@/lib/server-fetch";
import { getCookie } from "@/lib/jwt";
import { ApiResponse, IUser } from "@/types";

export const getMe = async () => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken || accessToken === "undefined" || accessToken === "null") {
      return null;
    }

    const res = await serverFetch.get<ApiResponse<IUser>>("/users/me", {
      next: { tags: ["user"] },
    });
    return res.data;
  } catch {
    return null;
  }
};
