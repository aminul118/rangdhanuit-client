"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "@/providers/SocketProvider";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from "@/components/ui/avatar";
import { Send, User as UserIcon, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { sendMessageAction } from "@/services/Conversation/conversation.actions";

interface Message {
  _id: string;
  sender: string | { _id: string; name: string; picture?: string };
  content: string;
  createdAt: string;
}

interface ChatWindowProps {
  recipientId: string;
  recipientName: string;
  initialMessages?: Message[];
}

export const ChatWindow = ({
  recipientId,
  recipientName,
  initialMessages = [],
}: ChatWindowProps) => {
  const { socket, connected } = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(initialMessages || []);
  }, [initialMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for incoming messages via socket
  useEffect(() => {
    if (!socket) return;

    const handleReceive = (message: Message) => {
      const senderId =
        typeof message.sender === "object"
          ? message.sender._id
          : message.sender;
      if (senderId === recipientId || senderId === user?._id) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("receive_message", handleReceive);
    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [socket, recipientId, user?._id]);

  const getSenderId = (sender: Message["sender"]) =>
    typeof sender === "object" ? sender._id : sender;

  const getSenderPicture = (sender: Message["sender"]) =>
    typeof sender === "object" ? sender.picture : undefined;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const content = input.trim();
    setInput("");
    setSending(true);

    // Optimistically add to UI
    const tempMsg: Message = {
      _id: `temp_${Date.now()}`,
      sender: user?._id || "",
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMsg]);

    try {
      if (connected && socket) {
        // Real-time path
        socket.emit("send_message", { recipientId, content });

        // Also listen for message_sent confirmation and optionally replace temp message
        socket.once("message_sent", (saved: Message) => {
          setMessages((prev) =>
            prev.map((m) => (m._id === tempMsg._id ? saved : m)),
          );
        });
      } else {
        // Offline-ready REST fallback via server action
        const saved = await sendMessageAction(recipientId, content);
        if (saved) {
          setMessages((prev) =>
            prev.map((m) => (m._id === tempMsg._id ? { ...saved, sender: user?._id || "" } : m)),
          );
        }
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      // Remove failed optimistic message
      setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border border-white/5 rounded-2xl overflow-hidden shadow-xl shadow-indigo-500/5">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-500">
            <UserIcon size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{recipientName}</h3>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
              {connected ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Online
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  Offline · Messages saved
                </>
              )}
            </p>
          </div>
        </div>
        <div className="text-muted-foreground/50">
          {connected ? <Wifi size={16} /> : <WifiOff size={16} />}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <Send size={20} />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Start the conversation!
            </p>
            <p className="text-xs text-muted-foreground/60">
              Send a message to begin chatting with {recipientName}.
            </p>
          </div>
        )}
        {messages.map((msg, index) => {
          const senderId = getSenderId(msg.sender);
          const isMe = senderId === user?._id;
          const picture = isMe ? user?.picture : getSenderPicture(msg.sender);

          return (
            <div
              key={msg._id || index}
              className={cn(
                "flex gap-3 max-w-[85%] animate-in fade-in slide-in-from-bottom-2",
                isMe ? "ml-auto flex-row-reverse items-end" : "mr-auto flex-row items-end",
              )}
            >
              <Avatar className="w-8 h-8 border border-white/5 shadow-sm shrink-0">
                <AvatarImage src={picture} />
                <AvatarFallback className="bg-muted text-[10px]">
                  <UserIcon size={12} />
                </AvatarFallback>
              </Avatar>

              <div
                className={cn(
                  "flex flex-col",
                  isMe ? "items-end" : "items-start",
                )}
              >
                <div
                  className={cn(
                    "px-4 py-2 rounded-2xl text-sm",
                    isMe
                      ? "bg-indigo-600 text-white rounded-br-none shadow-lg shadow-indigo-500/20"
                      : "bg-muted text-foreground rounded-bl-none border border-white/5",
                    msg._id.startsWith("temp_") && "opacity-70",
                  )}
                >
                  {msg.content}
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 px-1">
                  {format(new Date(msg.createdAt), "HH:mm")}
                  {msg._id.startsWith("temp_") && " · Sending..."}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-white/10 bg-muted/30 flex gap-2"
      >
        <Input
          placeholder={
            connected
              ? "Type a message..."
              : "Type a message (will be saved even offline)..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
          className="rounded-xl border-white/10 bg-background/50 focus-visible:ring-indigo-500"
        />
        <Button
          type="submit"
          disabled={!input.trim() || sending}
          className="rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 px-6 transition-all active:scale-95"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

