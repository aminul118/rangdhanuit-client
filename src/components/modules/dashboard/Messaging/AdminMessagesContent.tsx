"use client";

import React from "react";
import { ConversationList } from "@/components/modules/dashboard/Messaging/ConversationList";
import { ChatWindow } from "@/components/modules/dashboard/Messaging/ChatWindow";
import { Loader2, MessageSquare } from "lucide-react";
import useMessaging from "@/hooks/useMessaging";

/**
 * Admin view for messaging. Supports multiple conversations and real-time support chat.
 */
export function AdminMessagesContent() {
  const {
    conversations,
    selectedConvId,
    setSelectedConvId,
    messages,
    loading,
    loadingMessages,
    recipient,
    user
  } = useMessaging();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6 p-6">
      {/* Left List: Sidebar for administrators to pick a conversation */}
      <div className="flex-1 max-w-sm">
        <ConversationList
          conversations={conversations}
          selectedId={selectedConvId || undefined}
          onSelect={setSelectedConvId}
          currentUserId={user?._id || ""}
        />
      </div>

      {/* Right Chat Window: Immersive messaging experience */}
      <div className="flex-[2]">
        {selectedConvId ? (
          loadingMessages ? (
            <div className="flex h-full items-center justify-center bg-card border rounded-2xl border-white/10 shadow-xl shadow-indigo-500/5">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
          ) : (
            <ChatWindow
              recipientId={recipient?._id || ""}
              recipientName={recipient?.name || "Support Guest"}
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
              Choose a user from the list to start chatting or view the history of your support interactions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
