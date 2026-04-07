import {
  Laptop,
  Smartphone,
  Compass,
  Palette,
  TrendingUp,
  ShieldCheck,
  Zap,
  Layout,
  Search,
  Code2,
  Globe,
  Settings,
  AlertTriangle,
  Server,
  Cloud,
  Cpu,
  Monitor,
  Terminal,
  MousePointer2,
  Bug,
  Eye,
  Lock,
  Wifi,
  Database,
} from "lucide-react";

export const IconMap: Record<string, React.ElementType> = {
  // Primary Mappings
  Laptop,
  Smartphone,
  Compass,
  Palette,
  TrendingUp,
  ShieldCheck,
  Zap,
  Search,
  Layout,
  Code2,

  // Secondary Mappings
  Globe,
  Settings,
  AlertTriangle,
  Server,
  Cloud,
  Cpu,
  Monitor,
  Terminal,
  MousePointer2,
  Bug,
  Eye,
  Lock,
  Wifi,
  Database,
};

export const getIcon = (iconName: string): React.ElementType => {
  return IconMap[iconName] || Code2;
};
