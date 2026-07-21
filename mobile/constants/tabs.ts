import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";
import {
  InfoIcon,
  LogoutIcon,
  HelpCenterIcon,
} from "@/components/svg/AdminIcons";
import { UserIcon } from "@/components/svg";

export type Tab = {
  label: string;
  icon: ComponentType<SvgProps & { size?: number }>;
  path?: string;
  onPress?: () => void;
};

export type TabCategory = {
  category: string;
  tabs: Tab[];
};

export const sharedTabs: TabCategory[] = [
  {
    category: "Settings",
    tabs: [{ label: "Profile", icon: UserIcon, path: "/profile" }],
  },
  {
    category: "Help and info",
    tabs: [
      { label: "About us", icon: InfoIcon, path: "/about" },
      { label: "Help Center", icon: HelpCenterIcon, path: "/help" },
    ],
  },
  {
    category: "Manage your account",
    tabs: [{ label: "Sign out", icon: LogoutIcon, path: "" }],
  },
];
