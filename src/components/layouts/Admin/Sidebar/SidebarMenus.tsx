import {
  LayoutDashboard,
  Users,
  Settings,
  Briefcase,
  MessageSquare,
  FileText,
} from "lucide-react";

const sidebarMenus = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Manage Users", icon: Users },
  { href: "/admin/portfolios", label: "Portfolios", icon: Briefcase },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default sidebarMenus;
