import { StyleSheet, Pressable, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import UserIcon from "@/components/svg/UserIcon";
import type User from "@/interface/User";

type Props = { user: User };

export default function UserCard({ user }: Props) {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];

  return (
    <ThemedView
      style={[
        styles.card,
        { backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7" },
      ]}
    >
      <View style={styles.avatar}>
        <UserIcon size={28} color={colors.icon} />
      </View>
      <View style={styles.body}>
        <ThemedText style={styles.name}>{user.name}</ThemedText>
        <ThemedText style={styles.email}>{user.email}</ThemedText>
      </View>
      <View style={[styles.roleBadge, { backgroundColor: user.role === "admin" ? colors.tint : "#94A3B8" }]}>
        <ThemedText style={styles.roleText}>{user.role}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(128,128,128,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
  },
  email: {
    fontSize: 13,
    opacity: 0.5,
    marginTop: 2,
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  roleText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
