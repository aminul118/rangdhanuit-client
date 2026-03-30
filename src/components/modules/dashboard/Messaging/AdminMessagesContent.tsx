"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useSocket } from "@/providers/SocketProvider";
import { ConversationList } from "@/components/modules/dashboard/Messaging/ConversationList";
import { ChatWindow } from "@/components/modules/dashboard/Messaging/ChatWindow";
import { markAllNotificationsRead } from "@/services/Notification/notification.actions";
import envVars from "@/config/env.config";
import { Loader2, MessageSquare } from "lucide-react";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Message {
  _id: string;
  sender: string | { _id: string; name: string };
  content: string;
  createdAt: string;
}

interface MessageConversation {
  _id: string;
  participants: AdminUser[];
  lastMessage?: {
    content: string;
    createdAt: string;
    sender: string;
  };
  unreadCount: Record<string, number>;
  updatedAt: string;
}

export function AdminMessagesContent() {
  const { user } = useAuth();
  const { socket, setUnreadCount } = useSocket();
  const [conversations, setConversations] = useState<MessageConversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Clear notification count immediately when opening this page
  useEffect(() => {
    setUnreadCount(0);
    markAllNotificationsRead();
  }, [setUnreadCount]);

  const fetchConversations = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const res = await fetch(
        `${envVars.apiUrl}/conversations/my-conversations`,
        {
          credentials: "include",
        },
      );
      if (res.ok) {
        const data = await res.json();
        setConversations(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  const fetchMessages = async (convId: string) => {
    try {
      setLoadingMessages(true);
      const res = await fetch(
        `${envVars.apiUrl}/conversations/${convId}/messages`,
        {
          credentials: "include",
        },
      );
      if (res.ok) {
        const data = await res.json();
        setMessages(data.data);

        // Also mark as read
        await fetch(`${envVars.apiUrl}/conversations/${convId}/read`, {
          method: "PATCH",
          credentials: "include",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchConversations(true);
  }, [fetchConversations]);

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

  useEffect(() => {
    if (selectedConvId) {
      fetchMessages(selectedConvId);
    }
  }, [selectedConvId]);

  const selectedConversation = conversations.find(
    (c) => c._id === selectedConvId,
  );
  const recipient = selectedConversation?.participants?.find(
    (p) => p._id !== user?._id,
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6 p-6">
      {/* Left List */}
      <div className="flex-1">
        <ConversationList
          conversations={conversations}
          selectedId={selectedConvId || undefined}
          onSelect={setSelectedConvId}
          currentUserId={user?._id || ""}
        />
      </div>

      {/* Right Chat Window */}
      <div className="flex-1">
        {selectedConvId ? (
          loadingMessages ? (
            <div className="flex h-full items-center justify-center bg-card border rounded-2xl border-white/10 shadow-xl shadow-indigo-500/5">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
          ) : (
            <ChatWindow
              recipientId={recipient?._id || ""}
              recipientName={recipient?.name || "User"}
              initialMessages={messages}
            />
          )
        ) : (
          <div className="flex flex-col h-full items-center justify-center bg-card border rounded-2xl border-white/10 text-muted-foreground p-12 text-center shadow-xl shadow-indigo-500/5">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-4">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Select a conversation
            </h3>
            <p className="max-w-[400px]">
              Choose a user from the list to start chatting or view the history.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
