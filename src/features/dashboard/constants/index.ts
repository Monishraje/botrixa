import {
  LayoutDashboard,
  Bot,
  FolderDot,
  BookOpen,
  Zap,
  KeyRound,
  CreditCard,
  Settings,
} from "lucide-react";

export const DASHBOARD_ROUTES = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "AI Agents",
    href: "/agents",
    icon: Bot,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderDot,
  },
  {
    name: "Knowledge Base",
    href: "/knowledge",
    icon: BookOpen,
  },
  {
    name: "Automations",
    href: "/automations",
    icon: Zap,
  },
  {
    name: "API Keys",
    href: "/api-keys",
    icon: KeyRound,
  },
  {
    name: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
