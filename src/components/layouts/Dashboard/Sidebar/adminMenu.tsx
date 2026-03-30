import {
  LayoutDashboard,
  Users,
  Briefcase,
  MessageSquare,
  FileText,
  Sparkles,
} from "lucide-react";
import { SidebarItem } from "./SidebarMenus";

export const adminMenu: SidebarItem[] = [
  {
    href: "/admin",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/messages",
    label: "Messages",
    icon: MessageSquare,
    badgeKey: "messages",
  },

  {
    href: "/admin/portfolios",
    label: "Portfolios",
    icon: Briefcase,
  },

  {
    href: "/admin/blogs",
    label: "Blog",
    icon: FileText,
  },
  {
    href: "/admin/services",
    label: "Services",
    icon: Sparkles,
  },
  {
    href: "/admin/users",
    label: "Manage Users",
    icon: Users,
  },
];
