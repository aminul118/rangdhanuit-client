import { LucideIcon } from "lucide-react";
import { adminMenu } from "./adminMenu";
import { userMenu } from "./userMenu";

export interface SidebarItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badgeKey?: string;
}

export const getSidebarMenus = (role: string): SidebarItem[] => {
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    return adminMenu;
  }
  return userMenu;
};

export default getSidebarMenus;
