"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useSocket } from "@/providers/SocketProvider";
import {
  getAdminUser,
  getMyConversations,
  getConversationMessages,
  markConversationRead,
} from "@/services/Conversation/conversation.actions";
import { markAllNotificationsRead } from "@/services/Notification/notification.actions";
import { IMessage, MessageConversation, IUser } from "@/types";

interface UseMessagingOptions {
  autoLoad?: boolean;
  isUserView?: boolean;
}

/**
 * A comprehensive hook to manage the messaging system state and actions.
 * Consolidates conversation fetching, message loading, and real-time updates.
 */
export default function useMessaging({
  autoLoad = true,
  isUserView = false,
}: UseMessagingOptions = {}) {
  const { user } = useAuth();
  const { socket, setUnreadCount } = useSocket();
  const [conversations, setConversations] = useState<MessageConversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [targetAdmin, setTargetAdmin] = useState<IUser | null>(null);

  const fetchConversations = useCallback(
    async (isInitial = false) => {
      if (!isInitial) setLoading(true);

      try {
        const res = await getMyConversations();
        const convs = res.success && res.data ? res.data : [];
        setConversations(convs);

        if (isUserView) {
          let existingConv: MessageConversation | null = null;
          let admin: IUser | null = null;

          for (const conv of convs) {
            const foundAdmin = conv.participants.find(
              (p) => p.role === "ADMIN" || p.role === "SUPER_ADMIN",
            );
            if (foundAdmin) {
              existingConv = conv;
              admin = foundAdmin;
              break;
            }
          }

          if (!admin) {
            const adminRes = await getAdminUser();
            if (adminRes.success) admin = adminRes.data;
          }

          setTargetAdmin(admin);
          if (existingConv && isInitial) {
            setSelectedConvId(existingConv._id);
          }
        }
      } catch (e) {
        console.error("Failed to load messaging context:", e);
      } finally {
        setLoading(false);
      }
    },
    [isUserView],
  );

  const fetchMessages = useCallback(async (convId: string) => {
    setLoadingMessages(true);
    try {
      const res = await getConversationMessages(convId);
      if (res.success && res.data) {
        setMessages(res.data);
        // Mark as read silently
        await markConversationRead(convId);
      }
    } catch (e) {
      console.error("Failed to load messages:", e);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  // Initial load and notification cleanup
  useEffect(() => {
    if (!autoLoad) return;

    const init = async () => {
      await fetchConversations(true);
      // Clear notification count immediately
      setUnreadCount(0);
      try {
        await markAllNotificationsRead();
      } catch (e) {
        console.error("Failed to clear notifications:", e);
      }
    };

    init();
  }, [autoLoad, fetchConversations, setUnreadCount]);

  // Load messages when conversation changes
  useEffect(() => {
    if (selectedConvId) {
      // Defer to next microtask to avoid cascading render warning
      Promise.resolve().then(() => fetchMessages(selectedConvId));
    }
  }, [selectedConvId, fetchMessages]);

  // Socket listeners for real-time updates
  useEffect(() => {
    if (socket) {
      const handleUpdate = () => {
        fetchConversations();
      };

      socket.on("new_notification", handleUpdate);
      socket.on("receive_message", handleUpdate);

      return () => {
        socket.off("new_notification", handleUpdate);
        socket.off("receive_message", handleUpdate);
      };
    }
  }, [socket, fetchConversations]);

  const selectedConversation = conversations.find(
    (c) => c._id === selectedConvId,
  );
  const participantRecipient = selectedConversation?.participants?.find(
    (p) => p._id !== user?._id,
  );
  const recipient = isUserView ? targetAdmin : participantRecipient;

  return {
    conversations,
    selectedConvId,
    setSelectedConvId,
    messages,
    loading,
    loadingMessages,
    selectedConversation,
    recipient,
    targetAdmin,
    user,
    fetchConversations,
    fetchMessages,
  };
}
