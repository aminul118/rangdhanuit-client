"use client";

import React from "react";
import { ChatWindow } from "@/components/modules/dashboard/Messaging/ChatWindow";
import { Loader2, MessageSquare } from "lucide-react";
import useMessaging from "@/hooks/useMessaging";

export function UserMessagesContent() {
  const {
    messages,
    loading,
    recipient: admin,
  } = useMessaging({ isUserView: true });

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {admin ? (
        <div className="h-[calc(100vh-120px)]">
          <ChatWindow
            recipientId={admin._id}
            recipientName="Rangdhanu Support"
            initialMessages={messages}
          />
        </div>
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
