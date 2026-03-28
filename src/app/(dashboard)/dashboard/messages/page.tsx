"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChatWindow } from "@/components/modules/dashboard/Messaging/ChatWindow";
import { Loader2, MessageSquare, ShieldCheck } from "lucide-react";
import {
  getAdminUser,
  getMyConversations,
  getConversationMessages,
  markConversationRead,
} from "@/services/Conversation/conversation.actions";
import { markAllNotificationsRead } from "@/services/Notification/notification.actions";
import { useSocket } from "@/providers/SocketProvider";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  picture?: string;
}

interface Message {
  _id: string;
  sender: string | { _id: string; name: string; picture?: string };
  content: string;
  createdAt: string;
}

interface LocalConversation {
  _id: string;
  participants: AdminUser[];
  lastMessage?: {
    content: string;
    createdAt: string;
    sender: string;
  };
}

export default function UserMessagesPage() {
  const { setUnreadCount } = useSocket();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // Clear notification count immediately when opening this tab
      setUnreadCount(0);
      markAllNotificationsRead();

      // Step 1: Find existing conversation with any admin first
      const conversations =
        (await getMyConversations()) as unknown as LocalConversation[];

      let existingConv: LocalConversation | null = null;
      let targetAdmin: AdminUser | null = null;

      // Scan conversations for one that includes an admin
      for (const conv of conversations) {
        const foundAdmin = conv.participants.find(
          (p) => p.role === "ADMIN" || p.role === "SUPER_ADMIN",
        );
        if (foundAdmin) {
          existingConv = conv;
          targetAdmin = foundAdmin;
          break;
        }
      }

      // Step 2: If no existing conversation, find any available admin to start a new one
      if (!targetAdmin) {
        targetAdmin = await getAdminUser();
      }

      setAdmin(targetAdmin);

      if (!targetAdmin) return;

      // Step 3: Load messages if conversation exists
      if (existingConv) {
        const msgs = await getConversationMessages(existingConv._id);
        setMessages(msgs);

        // Step 4: Mark as read (silently)
        await markConversationRead(existingConv._id);
      }
    } catch (err) {
      console.error("Failed to load support chat:", err);
    } finally {
      setLoading(false);
    }
  }, [setUnreadCount]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {admin ? (
        <ChatWindow
          recipientId={admin._id}
          recipientName="Rangdhanu Support"
          initialMessages={messages}
        />
      ) : (
        <div className="flex flex-col items-center justify-center bg-card border rounded-2xl border-white/10 text-muted-foreground p-20 text-center shadow-xl shadow-indigo-500/5">
          <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-6">
            <MessageSquare size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-foreground">
            Support Unavailable
          </h3>
          <p className="max-w-[420px] leading-relaxed text-sm">
            No admin accounts found. Please contact us through the website or
            try again later.
          </p>
        </div>
      )}
    </div>
  );
}
