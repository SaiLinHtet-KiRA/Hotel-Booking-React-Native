import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import type { RoomStatus } from "@/interface/Room";

type Props = { status: RoomStatus };

export default function StatusBadge({ status }: Props) {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];

  const color =
    status === "available" ? colors.tint
    : status === "busy" ? "#EAB308"
    : "#EF4444";

  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <ThemedText style={styles.text}>{status}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  text: { color: "#fff", fontSize: 12, fontWeight: "600", textTransform: "capitalize" },
});
