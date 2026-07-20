import { StyleSheet, ScrollView, Pressable, View } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";
import {
  RoomIcon,
  GearIcon,
  ChartIcon,
  StarIcon,
  InfoIcon,
  LogoutIcon,
  UserGroupIcon,
  HelpCenterIcon,
} from "@/components/svg/AdminIcons";

type AdminTab = {
  label: string;
  icon: ComponentType<SvgProps & { size?: number }>;
  path: string;
};

type AdminCategory = {
  category: string;
  tabs: AdminTab[];
};

const adminTabs: AdminCategory[] = [
  {
    category: "Management",
    tabs: [
      { label: "Rooms", icon: RoomIcon, path: "/admin/rooms" },
      { label: "Bookings", icon: ChartIcon, path: "/admin/bookings" },
      { label: "Users", icon: UserGroupIcon, path: "/admin/users" },
    ],
  },
  {
    category: "Settings",
    tabs: [
      { label: "Reviews", icon: StarIcon, path: "/admin/reviews" },
      { label: "Profile", icon: GearIcon, path: "/admin/config" },
    ],
  },
  {
    category: "Help and info",
    tabs: [
      { label: "About us", icon: InfoIcon, path: "/admin/about" },
      { label: "Help Center", icon: HelpCenterIcon, path: "/admin/help" },
    ],
  },
  {
    category: "Manage your account",
    tabs: [
      { label: "Sign out", icon: LogoutIcon, path: "" },
    ],
  },
];

export default function AdminLayout() {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedText type="title" style={styles.title}>
          Admin Panel
        </ThemedText>

        {adminTabs.map((section) => (
          <View key={section.category} style={styles.section}>
            <ThemedText style={styles.categoryLabel}>
              {section.category}
            </ThemedText>

            {section.tabs.map((tab) => (
              <Pressable
                key={tab.label}
                style={[
                  styles.tabRow,
                  { backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7" },
                ]}
                onPress={() => {
                  if (tab.path) router.push(tab.path);
                }}
              >
                <View style={styles.tabLeft}>
                  <View
                    style={[
                      styles.iconBox,
                      { backgroundColor: scheme === "dark" ? "#2C2C2E" : "#E8F0FE" },
                    ]}
                  >
                    <tab.icon size={22} color={colors.tint} />
                  </View>
                  <ThemedText type="defaultSemiBold">{tab.label}</ThemedText>
                </View>
                <ThemedText style={{ color: colors.icon, fontSize: 18 }}>
                  ›
                </ThemedText>
              </Pressable>
            ))}

            {section.tabs.length === 0 && (
              <ThemedView
                style={[
                  styles.empty,
                  { backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7" },
                ]}
              >
                <ThemedText style={{ color: colors.icon }}>
                  No items yet
                </ThemedText>
              </ThemedView>
            )}
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 28,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.4,
    marginBottom: 10,
    marginLeft: 4,
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  tabLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
});
