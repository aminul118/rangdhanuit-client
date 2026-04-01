"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useSocket } from "@/providers/SocketProvider";
import { ConversationList } from "@/components/modules/dashboard/Messaging/ConversationList";
import { ChatWindow } from "@/components/modules/dashboard/Messaging/ChatWindow";
import { markAllNotificationsRead } from "@/services/Notification/notification.actions";
import {
  getMyConversations,
  getConversationMessages,
  markConversationRead,
} from "@/services/Conversation/conversation.actions";
import { IMessage, MessageConversation } from "@/types";
import { Loader2, MessageSquare } from "lucide-react";

export function AdminMessagesContent() {
  const { user } = useAuth();
  const { socket, setUnreadCount } = useSocket();
  const [conversations, setConversations] = useState<MessageConversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Clear notification count immediately when opening this page
  useEffect(() => {
    // Wrap in a microtask or deferred call to avoid synchronous cascading renders
    const timer = setTimeout(() => {
      setUnreadCount(0);
      markAllNotificationsRead();
    }, 0);
    return () => clearTimeout(timer);
  }, [setUnreadCount]);

  const fetchConversations = useCallback(async (isInitial = false) => {
    // Ensure the entire function body runs in a microtask to avoid cascading renders
    await Promise.resolve();
    if (!isInitial) setLoading(true);
    const res = await getMyConversations();
    if (res.success && res.data) {
      setConversations(res.data);
    }
    if (isInitial) setLoading(false);
  }, []);

  const fetchMessages = async (convId: string) => {
    await Promise.resolve();
    setLoadingMessages(true);
    const res = await getConversationMessages(convId);
    if (res.success && res.data) {
      setMessages(res.data);

      // Also mark as read
      await markConversationRead(convId);
    }
    setLoadingMessages(false);
  };

  useEffect(() => {
    // Defer to next microtask to avoid cascading render warning
    Promise.resolve().then(() => fetchConversations(true));
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
      // Defer to next microtask to avoid cascading render warning
      Promise.resolve().then(() => fetchMessages(selectedConvId));
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
