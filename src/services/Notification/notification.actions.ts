"use server";

import serverFetch from "@/lib/server-fetch";

interface Notification {
  _id: string;
  type: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  sender: {
    _id: string;
    name: string;
    picture?: string;
  };
}

interface NotificationsResponse {
  data: Notification[];
}

export const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    const data = await serverFetch.get<NotificationsResponse>("/notifications");
    return data?.data ?? [];
  } catch {
    return [];
  }
};

export const markAllNotificationsRead = async (): Promise<void> => {
  try {
    await serverFetch.patch("/notifications/mark-all-as-read");
  } catch {
    // non-critical
  }
};

export const markNotificationRead = async (id: string): Promise<void> => {
  try {
    await serverFetch.patch(`/notifications/${id}/read`);
  } catch {
    // non-critical
  }
};

export const clearAllNotificationsAction = async (): Promise<void> => {
  try {
    await serverFetch.delete("/notifications");
  } catch {
    // non-critical
  }
};

export const deleteNotificationAction = async (id: string): Promise<void> => {
  try {
    await serverFetch.delete(`/notifications/${id}`);
  } catch {
    // non-critical
  }
};
