"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { User, MessageSquare } from "lucide-react";

interface Conversation {
  _id: string;
  participants: any[];
  lastMessage?: {
    content: string;
    createdAt: string;
  };
  unreadCount: Record<string, number>;
  updatedAt: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
  currentUserId: string;
}

export const ConversationList = ({
  conversations,
  selectedId,
  onSelect,
  currentUserId,
}: ConversationListProps) => {
  return (
    <div className="flex flex-col h-full bg-card border rounded-2xl overflow-hidden shadow-xl shadow-indigo-500/5">
      <div className="p-4 border-b bg-muted/30">
        <h3 className="font-semibold flex items-center gap-2">
          <MessageSquare size={18} className="text-indigo-500" />
          Messages
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground p-8 text-center">
            <MessageSquare size={32} className="opacity-20 mb-2" />
            <p className="text-sm">No conversations yet</p>
          </div>
        ) : (
          conversations.map((conv) => {
            const otherParticipant = conv.participants.find(
              (p) => p._id !== currentUserId,
            );
            const isSelected = selectedId === conv._id;
            const unread = conv.unreadCount[currentUserId] || 0;

            return (
              <div
                key={conv._id}
                onClick={() => onSelect(conv._id)}
                className={cn(
                  "p-4 border-b last:border-0 cursor-pointer transition-all duration-300 hover:bg-muted/50 flex items-center gap-3",
                  isSelected &&
                    "bg-indigo-500/10 border-r-2 border-r-indigo-500 shadow-inner",
                )}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-500 border border-indigo-500/10 shadow-sm">
                    {otherParticipant?.picture ? (
                      <img
                        src={otherParticipant.picture}
                        alt={otherParticipant.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={24} />
                    )}
                  </div>
                  {unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-background animate-bounce">
                      {unread}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="font-bold text-sm truncate">
                      {otherParticipant?.name || "User"}
                    </h4>
                    {conv.lastMessage && (
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                        {format(new Date(conv.lastMessage.createdAt), "MMM d")}
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-xs truncate",
                      unread > 0
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground",
                    )}
                  >
                    {conv.lastMessage?.content || "No messages yet"}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
