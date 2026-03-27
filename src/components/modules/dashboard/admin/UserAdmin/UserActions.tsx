"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Trash2,
  UserCheck,
  UserX,
  Shield,
  User as UserIcon,
  RefreshCw,
} from "lucide-react";
import {
  updateUserStatus,
  deleteUser,
  updateUserRole,
} from "@/services/User/allUsers";
import { IUser } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserActionsProps {
  user: IUser;
}

const UserActions = ({ user }: UserActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (newStatus: "ACTIVE" | "BLOCKED") => {
    setIsLoading(true);
    try {
      const res = await updateUserStatus(user._id!, newStatus);
      if (res.success) {
        toast.success(
          `User ${newStatus === "ACTIVE" ? "activated" : "blocked"} successfully`,
        );
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update user status");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (newRole: "ADMIN" | "USER") => {
    setIsLoading(true);
    try {
      const res = await updateUserRole(user._id!, newRole);
      if (res.success) {
        toast.success(`User role updated to ${newRole} successfully`);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update user role");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you serious? This user will be gone forever (marked as deleted).",
      )
    )
      return;

    setIsLoading(true);
    try {
      const res = await deleteUser(user._id!);
      if (res.success) {
        toast.success("User deleted successfully");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete user");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 rounded-lg hover:bg-white/5 data-[state=open]:bg-white/5 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin text-indigo-500" />
          ) : (
            <MoreHorizontal className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 p-2 rounded-2xl bg-background/95 backdrop-blur-xl border-white/10 shadow-2xl"
      >
        <DropdownMenuLabel className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          User Management
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/5" />

        {/* Status Actions */}
        {user.status === "ACTIVE" ? (
          <DropdownMenuItem
            onClick={() => handleStatusChange("BLOCKED")}
            className="rounded-xl px-3 py-2.5 gap-3 text-orange-500 focus:text-orange-500 focus:bg-orange-500/10 cursor-pointer transition-colors"
          >
            <UserX size={16} />
            <span className="font-medium text-sm">Restrict Access</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => handleStatusChange("ACTIVE")}
            className="rounded-xl px-3 py-2.5 gap-3 text-green-500 focus:text-green-500 focus:bg-green-500/10 cursor-pointer transition-colors"
          >
            <UserCheck size={16} />
            <span className="font-medium text-sm">Restore Access</span>
          </DropdownMenuItem>
        )}

        {/* Role Actions */}
        {user.role === "ADMIN" ? (
          <DropdownMenuItem
            onClick={() => handleRoleChange("USER")}
            className="rounded-xl px-3 py-2.5 gap-3 focus:bg-indigo-500/10 focus:text-indigo-500 cursor-pointer transition-colors"
          >
            <UserIcon size={16} />
            <span className="font-medium text-sm">Demote to User</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => handleRoleChange("ADMIN")}
            className="rounded-xl px-3 py-2.5 gap-3 focus:bg-purple-500/10 focus:text-purple-500 cursor-pointer transition-colors"
          >
            <Shield size={16} />
            <span className="font-medium text-sm">Elevate to Admin</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="bg-white/5" />

        {/* Danger Zone */}
        <DropdownMenuItem
          onClick={handleDelete}
          className="rounded-xl px-3 py-2.5 gap-3 text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer transition-colors"
        >
          <Trash2 size={16} />
          <span className="font-medium text-sm">Delete Account</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActions;
