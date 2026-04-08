"use server";

import serverFetch from "@/lib/server-fetch";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse, INotification } from "@/types";
import { revalidate } from "@/helpers/revalidate";

export const fetchNotifications = catchAsyncAction(
  async (): Promise<ApiResponse<INotification[]>> => {
    return await serverFetch.get<ApiResponse<INotification[]>>(
      "/notifications",
      {
        next: { tags: ["notifications"] },
      },
    );
  },
);

export const markAllNotificationsRead = catchAsyncAction(
  async (): Promise<ApiResponse<Record<string, unknown>>> => {
    const res = await serverFetch.patch("/notifications/mark-all-as-read");
    revalidate("notifications");
    return res;
  },
);

export const markNotificationRead = catchAsyncAction(
  async (id: string): Promise<ApiResponse<INotification>> => {
    const res = await serverFetch.patch(`/notifications/${id}/read`);
    revalidate("notifications");
    return res;
  },
);

export const clearAllNotificationsAction = catchAsyncAction(
  async (): Promise<ApiResponse<Record<string, unknown>>> => {
    const res = await serverFetch.delete("/notifications");
    revalidate("notifications");
    return res;
  },
);

export const deleteNotificationAction = catchAsyncAction(
  async (id: string): Promise<ApiResponse<INotification>> => {
    const res = await serverFetch.delete(`/notifications/${id}`);
    revalidate("notifications");
    return res;
  },
);
