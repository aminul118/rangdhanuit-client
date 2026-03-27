'use client';

import { Column } from "@/components/common/table/TableManageMent";
import { IUser } from "@/types";
import UserActions from "./UserActions";
import { UserPlus, Sparkles, Loader2, Shield } from "lucide-react";

const UserTableColumn: Column<IUser>[] = [
  {
    header: "SI",
    accessor: (_, i) => i + 1,
  },
  {
    header: "Name",
    accessor: (u) => u.name,
  },
  {
    header: "Email",
    accessor: (u) => u.email,
  },
  {
    header: "Role",
    accessor: (u) => (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${
          u.role === "ADMIN"
            ? "bg-purple-500/10 text-purple-500 border-purple-500/20 shadow-[0_0_12px_-2px_rgba(168,85,247,0.2)]"
            : u.role === "SUPER_ADMIN"
              ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20 shadow-[0_0_12px_-2px_rgba(99,102,241,0.2)]"
              : "bg-white/5 text-muted-foreground border-white/10"
        }`}
      >
        {u.role}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: (u) => (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${
          u.status === "ACTIVE"
            ? "bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_12px_-2px_rgba(34,197,94,0.2)]"
            : "bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_12px_-2px_rgba(239,68,68,0.2)]"
        }`}
      >
        <div
          className={`w-1 h-1 rounded-full mr-1.5 ${u.status === "ACTIVE" ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
        />
        {u.status}
      </span>
    ),
  },
  {
    header: "Verified",
    accessor: (u) => (u.isVerified ? "✅" : "❌"),
  },
  {
    header: "Actions",
    accessor: (u) => <UserActions user={u} />,
  },
];

export default UserTableColumn;
