"use server";

import serverFetch from "@/lib/server-fetch";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  picture?: string;
}

interface UsersResponse {
  data: {
    result: AdminUser[];
    meta: unknown;
  };
}

interface ConversationResponse {
  data: Array<{
    _id: string;
    participants: { _id: string }[];
    lastMessage?: unknown;
    unreadCount?: Record<string, number>;
  }>;
}

interface MessagesResponse {
  data: Array<{
    _id: string;
    sender: string | { _id: string; name: string };
    content: string;
    createdAt: string;
  }>;
}

export const getAdminUser = async (): Promise<AdminUser | null> => {
  for (const role of ["ADMIN", "SUPER_ADMIN"]) {
    try {
      const data = await serverFetch.get<UsersResponse>("/users", {
        query: { role, limit: "1" },
      });
      const found = data?.data?.result?.[0];
      if (found) return found;
    } catch {
      // try next role
    }
  }
  return null;
};

export const getMyConversations = async (): Promise<
  ConversationResponse["data"]
> => {
  try {
    const data = await serverFetch.get<ConversationResponse>(
      "/conversations/my-conversations",
    );
    return data?.data ?? [];
  } catch {
    return [];
  }
};

export const getConversationMessages = async (
  conversationId: string,
): Promise<MessagesResponse["data"]> => {
  try {
    const data = await serverFetch.get<MessagesResponse>(
      `/conversations/${conversationId}/messages`,
    );
    return data?.data ?? [];
  } catch {
    return [];
  }
};

export const markConversationRead = async (
  conversationId: string,
): Promise<void> => {
  try {
    await serverFetch.patch(`/conversations/${conversationId}/read`);
  } catch {
    // non-critical
  }
};

export const sendMessageAction = async (
  recipientId: string,
  content: string,
): Promise<{ _id: string; content: string; createdAt: string } | null> => {
  try {
    const data = await serverFetch.post<{
      data: { _id: string; content: string; createdAt: string };
    }>("/conversations/send-message", {
      body: { recipientId, content },
    });
    return data?.data ?? null;
  } catch {
    return null;
  }
};
