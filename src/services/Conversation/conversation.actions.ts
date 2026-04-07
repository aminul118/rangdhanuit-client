"use server";

import serverFetch from "@/lib/server-fetch";
import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import {
  ApiResponse,
  IUser,
  IMessage,
  MessageConversation,
  IConversation,
} from "@/types";

export const getAdminUser = catchAsyncAction(
  async (): Promise<ApiResponse<IUser>> => {
    for (const role of ["ADMIN", "SUPER_ADMIN"]) {
      const res = await serverFetch.get<ApiResponse<IUser[]>>("/users", {
        query: { role, limit: "1" },
      });
      const found = res?.data?.[0];
      if (found) {
        return {
          ...res,
          data: found,
        } as ApiResponse<IUser>;
      }
    }
    throw new Error("No admin user found");
  },
);

export const getMyConversations = catchAsyncAction(
  async (): Promise<ApiResponse<MessageConversation[]>> => {
    return await serverFetch.get<ApiResponse<MessageConversation[]>>(
      "/conversations/my-conversations",
    );
  },
);

export const getConversationMessages = catchAsyncAction(
  async (conversationId: string): Promise<ApiResponse<IMessage[]>> => {
    return await serverFetch.get<ApiResponse<IMessage[]>>(
      `/conversations/${conversationId}/messages`,
    );
  },
);

export const markConversationRead = catchAsyncAction(
  async (conversationId: string): Promise<ApiResponse<IConversation>> => {
    return await serverFetch.patch(`/conversations/${conversationId}/read`);
  },
);

export const sendMessageAction = catchAsyncAction(
  async (
    recipientId: string,
    content: string,
  ): Promise<ApiResponse<IMessage>> => {
    return await serverFetch.post<ApiResponse<IMessage>>(
      "/conversations/send-message",
      {
        body: { recipientId, content },
      },
    );
  },
);
