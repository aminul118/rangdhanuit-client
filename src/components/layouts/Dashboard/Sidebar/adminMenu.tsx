import {
  LayoutDashboard,
  Users,
  Briefcase,
  MessageSquare,
  FileText,
} from "lucide-react";
import { SidebarItem } from "./SidebarMenus";

export const adminMenu: SidebarItem[] = [
  {
    href: "/admin",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/users",
    label: "Manage Users",
    icon: Users,
  },
  {
    href: "/admin/portfolios",
    label: "Portfolios",
    icon: Briefcase,
  },
  {
    href: "/admin/messages",
    label: "Messages",
    icon: MessageSquare,
    badgeKey: "messages",
  },
  {
    href: "/admin/blogs",
    label: "Blog",
    icon: FileText,
  },
];
