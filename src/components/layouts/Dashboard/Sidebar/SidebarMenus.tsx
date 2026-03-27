import {
  LayoutDashboard,
  Users,
  Briefcase,
  MessageSquare,
  FileText,
} from "lucide-react";

export const getSidebarMenus = (role: string) => {
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    return [
      { href: "/admin", label: "Overview", icon: LayoutDashboard },
      { href: "/admin/users", label: "Manage Users", icon: Users },
      { href: "/admin/portfolios", label: "Portfolios", icon: Briefcase },
      { href: "/admin/messages", label: "Messages", icon: MessageSquare },
      { href: "/admin/blog", label: "Blog", icon: FileText },
    ];
  }

  // Default User Menus
  return [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/my-profile", label: "My Profile", icon: Users },
  ];
};

export default getSidebarMenus;
