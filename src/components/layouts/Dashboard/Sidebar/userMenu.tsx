import { LayoutDashboard, MessageSquare } from "lucide-react";
import { SidebarItem } from "./SidebarMenus";

export const userMenu: SidebarItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/messages",
    label: "Messages",
    icon: MessageSquare,
    badgeKey: "messages",
  },
];
