"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthProvider";
import { usePathname } from "next/navigation";
import envVars from "@/config/env.config";
import { toast } from "sonner";
import { markNotificationRead } from "@/services/Notification/notification.actions";

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);

  // Keep pathname updated in ref for high-fidelity socket listeners
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  // Keep ref for lifecycle management (avoid re-creating on renders)
  const socketRef = useRef<Socket | null>(null);
  // Expose via state so consumers re-render when socket connects/disconnects
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user && !socketRef.current) {
      // Strip /api/v1 — Socket.IO connects at the root path
      const socketUrl = (envVars.apiUrl || "http://localhost:5000").replace(
        /\/api\/v1$/,
        "",
      );

      // httpOnly cookies are sent automatically by the browser via withCredentials
      // The server reads the accessToken from the cookie header
      const socketInstance = io(socketUrl, {
        withCredentials: true,
        transports: ["websocket", "polling"],
      });

      socketInstance.on("connect", () => {
        setConnected(true);
        setSocket(socketInstance);
        console.log("Socket connected:", socketInstance.id);
      });

      socketInstance.on("disconnect", () => {
        setConnected(false);
        setSocket(null);
        console.log("Socket disconnected");
      });

      socketInstance.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
        setConnected(false);
      });

      socketInstance.on("new_notification", (data) => {
        const isMessagesRoute = pathnameRef.current?.includes("/messages");

        // If user is already on the messages route, skip badge increment
        // and optionally mark as read on server immediately
        if (isMessagesRoute) {
          if (data._id) {
            markNotificationRead(data._id);
          }
          // Do not increment unreadCount
        } else {
          setUnreadCount((prev) => prev + 1);
        }

        if (data.type === "NEW_MESSAGE" || data.type === "ADMIN_REPLY") {
          // Only show toast if NOT on messages route to avoid noise
          if (!isMessagesRoute) {
            toast.info(data.message || "New message received", {
              description: data.from ? `From: ${data.from}` : undefined,
              action: {
                label: "View",
                onClick: () => {
                  window.location.href =
                    user.role === "USER"
                      ? "/dashboard/messages"
                      : "/admin/messages";
                },
              },
            });
          }
        }
      });

      socketRef.current = socketInstance;
    } else if (!user && socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
