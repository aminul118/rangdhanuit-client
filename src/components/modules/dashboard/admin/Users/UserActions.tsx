import {
  updateUserStatus,
  deleteUser,
  updateUserRole,
} from "@/services/User/allUsers";
import { IUser } from "@/types";
import useActionHandler from "@/hooks/useActionHandler";
import { TableActionDropdown } from "@/components/common/table/TableActionDropdown";
import { UserCheck, UserX, Shield, User as UserIcon } from "lucide-react";

interface UserActionsProps {
  user: IUser;
}

const UserActions = ({ user }: UserActionsProps) => {
  const { execute } = useActionHandler();

  const handleStatusChange = async (newStatus: "ACTIVE" | "BLOCKED") => {
    await execute({
      action: () => updateUserStatus(user._id!, newStatus),
      success: {
        message: `User ${newStatus === "ACTIVE" ? "activated" : "blocked"} successfully`,
        isRefresh: true,
      },
    });
  };

  const handleRoleChange = async (newRole: "ADMIN" | "USER") => {
    await execute({
      action: () => updateUserRole(user._id!, newRole),
      success: {
        message: `User role updated to ${newRole} successfully`,
        isRefresh: true,
      },
    });
  };

  const statusItem =
    user.status === "ACTIVE"
      ? {
          label: "Restrict Access",
          onClick: () => handleStatusChange("BLOCKED"),
          icon: UserX,
          className:
            "text-orange-500 focus:text-orange-500 focus:bg-orange-500/10",
        }
      : {
          label: "Restore Access",
          onClick: () => handleStatusChange("ACTIVE"),
          icon: UserCheck,
          className:
            "text-green-500 focus:text-green-500 focus:bg-green-500/10",
        };

  const roleItem =
    user.role === "ADMIN"
      ? {
          label: "Demote to User",
          onClick: () => handleRoleChange("USER"),
          icon: UserIcon,
          className: "focus:bg-indigo-500/10 focus:text-indigo-500",
        }
      : {
          label: "Elevate to Admin",
          onClick: () => handleRoleChange("ADMIN"),
          icon: Shield,
          className: "focus:bg-purple-500/10 focus:text-purple-500",
        };

  return (
    <TableActionDropdown
      dropdownLabel="User Management"
      deleteAction={async () => await deleteUser(user._id!)}
      deleteConfirmMessage={`Are you serious? ${user.name} will be gone forever (marked as deleted).`}
      customItems={[statusItem, roleItem]}
    />
  );
};

export default UserActions;
