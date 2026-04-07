"use server";

import serverFetch from "@/lib/server-fetch";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import { ApiResponse, INotification } from "@/types";

export const fetchNotifications = catchAsyncAction(
  async (): Promise<ApiResponse<INotification[]>> => {
    return await serverFetch.get<ApiResponse<INotification[]>>(
      "/notifications",
    );
  },
);

export const markAllNotificationsRead = catchAsyncAction(
  async (): Promise<ApiResponse<Record<string, unknown>>> => {
    return await serverFetch.patch("/notifications/mark-all-as-read");
  },
);

export const markNotificationRead = catchAsyncAction(
  async (id: string): Promise<ApiResponse<INotification>> => {
    return await serverFetch.patch(`/notifications/${id}/read`);
  },
);

export const clearAllNotificationsAction = catchAsyncAction(
  async (): Promise<ApiResponse<Record<string, unknown>>> => {
    return await serverFetch.delete("/notifications");
  },
);

export const deleteNotificationAction = catchAsyncAction(
  async (id: string): Promise<ApiResponse<INotification>> => {
    return await serverFetch.delete(`/notifications/${id}`);
  },
);
