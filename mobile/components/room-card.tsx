import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import type Room from "@/interface/Room";
import type { RoomStatus } from "@/interface/Room";

type Props = { room: Room };

export default function RoomCard({ room }: Props) {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];

  const statusColor = (status: RoomStatus) => {
    if (status === "available") return colors.tint;
    if (status === "busy") return "#EAB308";
    return "#EF4444";
  };

  return (
    <ThemedView
      style={[
        styles.card,
        { backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7" },
      ]}
    >
      <View style={styles.top}>
        <ThemedText type="defaultSemiBold">Room {room.number}</ThemedText>
        <View
          style={[
            styles.badge,
            { backgroundColor: statusColor(room.status) },
          ]}
        >
          <ThemedText style={styles.badgeText}>{room.status}</ThemedText>
        </View>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.dim}>{room.type}</ThemedText>
        <ThemedText style={styles.dim}>${room.price}/night</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.dim}>Capacity: {room.capacity}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, padding: 14, gap: 6 },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dim: { opacity: 0.6 },
});
