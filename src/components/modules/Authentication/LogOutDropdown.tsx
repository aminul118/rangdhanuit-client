"use client";

import Spinner from "@/components/common/loader/ButtonSpinner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import useActionHandler from "@/hooks/useActionHandler";
import { logoutAction } from "@/services/Auth/logout";

const LogOutDropDown = ({ className }: { className?: string }) => {
  const router = useRouter();
  const { setUser } = useAuth();
  const { executePost, isPending } = useActionHandler();

  const handleLogout = async () => {
    await executePost({
      action: async () => await logoutAction(),
      success: {
        message: "Logged out successfully",
        onSuccess: () => {
          setUser(null);
          router.push("/login");
        },
      },
    });
  };

  return (
    <DropdownMenuItem
      className={className}
      onClick={handleLogout}
      disabled={isPending}
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <Spinner /> Logging out...
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <LogOut size={16} /> Log out
        </div>
      )}
    </DropdownMenuItem>
  );
};

export default LogOutDropDown;
