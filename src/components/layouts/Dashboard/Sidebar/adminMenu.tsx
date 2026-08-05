import {
  LayoutDashboard,
  Users,
  Briefcase,
  MessageSquare,
  FileText,
  Sparkles,
  FileSignature,
  Receipt,
  ShieldCheck,
  CreditCard,
  BookOpen,
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
    href: "/admin/partners",
    label: "Partners",
    icon: Briefcase,
  },
  {
    href: "/admin/services",
    label: "Services",
    icon: Sparkles,
  },
  {
    href: "/admin/quotations",
    label: "Quotations",
    icon: FileSignature,
  },
  {
    href: "/admin/invoices",
    label: "Invoices",
    icon: Receipt,
  },
  {
    label: "Client Licenses",
    icon: ShieldCheck,
    children: [
      {
        href: "/admin/licenses",
        label: "Client Licenses",
        icon: ShieldCheck,
      },
      {
        href: "/admin/client-bills",
        label: "Client Bills",
        icon: CreditCard,
      },
      {
        href: "/admin/licenses/instructions",
        label: "Setup Instructions",
        icon: BookOpen,
      },
    ],
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
    href: "/admin/users",
    label: "Manage Users",
    icon: Users,
  },
];
