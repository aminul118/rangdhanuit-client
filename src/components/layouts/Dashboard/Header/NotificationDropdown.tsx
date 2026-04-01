"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  MessageSquare,
  CheckCheck,
  Clock,
  Inbox,
  Loader2,
  Trash2,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/providers/SocketProvider";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  clearAllNotificationsAction,
  deleteNotificationAction,
} from "@/services/Notification/notification.actions";
import { INotification } from "@/types";

export const NotificationDropdown = () => {
  const { unreadCount, setUnreadCount } = useSocket();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetchNotifications();
      if (res.success && Array.isArray(res.data)) {
        setNotifications(res.data);
        const unread = res.data.filter((n) => !n.isRead).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMarkAllRead = async () => {
    await markAllNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const handleClearAll = async () => {
    await clearAllNotificationsAction();
    setNotifications([]);
    setUnreadCount(0);
  };

  const handleDeleteNotification = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await deleteNotificationAction(id);
    setNotifications((prev) => {
      const filtered = prev.filter((n) => n._id !== id);
      const unread = filtered.filter((n) => !n.isRead).length;
      setUnreadCount(unread);
      return filtered;
    });
  };

  const handleNotificationClick = async (id: string) => {
    const notif = notifications.find(n => n._id === id);
    if (notif && !notif.isRead) {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.1 }}
        >
          <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-white/5 group">
            <Bell size={20} className={cn(
              "transition-colors",
              unreadCount > 0 ? "text-indigo-500" : "text-muted-foreground group-hover:text-indigo-500"
            )} />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-background animate-pulse" />
            )}
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-80 sm:w-96 p-0 rounded-2xl bg-background/95 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden"
      >
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
          <DropdownMenuLabel className="p-0 text-sm font-black uppercase tracking-widest text-foreground">
            Notifications
          </DropdownMenuLabel>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleMarkAllRead}
                className="h-7 text-[10px] uppercase font-bold tracking-widest text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-full"
              >
                <CheckCheck size={12} className="mr-1.5" />
                Mark read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearAll}
                className="h-7 text-[10px] uppercase font-bold tracking-widest text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full"
              >
                <Trash2 size={12} className="mr-1.5" />
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
          {loading && notifications.length === 0 ? (
            <div className="p-10 flex flex-col items-center justify-center text-muted-foreground gap-3">
              <Loader2 className="animate-spin text-indigo-500" size={24} />
              <p className="text-xs font-medium tracking-wide">Syncing alerts...</p>
            </div>
          ) : notifications.length > 0 ? (
            <div className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout" initial={false}>
                {notifications.map((n) => (
                  <motion.div
                    key={n._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownMenuItem
                      onClick={() => handleNotificationClick(n._id)}
                      className={cn(
                        "p-4 flex gap-4 cursor-pointer transition-colors focus:bg-white/5 group relative",
                        !n.isRead && "bg-indigo-500/3"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-inner",
                        n.type === 'MESSAGE' ? "bg-indigo-500/10 text-indigo-500" : "bg-purple-500/10 text-purple-500"
                      )}>
                        <MessageSquare size={18} />
                      </div>
                      <div className="flex-1 space-y-1 pr-6">
                        <p className={cn(
                          "text-sm leading-snug",
                          !n.isRead ? "font-bold text-foreground" : "font-medium text-muted-foreground"
                        )}>
                          {n.content}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground font-medium">
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                          </span>
                          {!n.isRead && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />}
                        </div>
                      </div>
                      
                      {/* Individual Delete Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleDeleteNotification(e, n._id)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 transition-all active:scale-95"
                      >
                        <X size={12} />
                      </Button>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground/30 mb-4">
                <Inbox size={24} />
              </div>
              <p className="text-sm font-bold text-foreground/50">All caught up!</p>
              <p className="text-xs text-muted-foreground mt-1">No new notifications at the moment.</p>
            </div>
          )}
        </div>
        
        <DropdownMenuSeparator className="m-0 bg-white/5" />
        <Link href="/dashboard/notifications" className="block">
          <Button variant="ghost" className="w-full h-11 rounded-none text-xs font-bold text-muted-foreground hover:text-indigo-500 hover:bg-white/5 transition-colors uppercase tracking-widest">
            View All History
          </Button>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
