"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import envVars from "@/config/env.config";
import { logoutAction } from "@/services/Auth/logout";

import { IUser, ILogin } from "@/types";

export type { IUser, ILogin };

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  setUser: (user: IUser | null) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  initialUser = null,
}: {
  children: ReactNode;
  initialUser?: IUser | null;
}) => {
  const [user, setUser] = useState<IUser | null>(initialUser);
  const [loading, setLoading] = useState(!initialUser);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${envVars.apiUrl}/users/me`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialUser) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [initialUser]);

  const logout = async () => {
    try {
      await logoutAction();
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
