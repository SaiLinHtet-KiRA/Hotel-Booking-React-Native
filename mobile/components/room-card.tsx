import { StyleSheet, Pressable, View, Image } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { UserGroupIcon } from "@/components/svg/AdminIcons";
import { HashIcon, TagIcon, DollarIcon } from "@/components/svg/FormIcons";
import StatusBadge from "@/components/status-badge";
import type Room from "@/interface/Room";

type Props = { room: Room; onPress?: () => void };

export default function RoomCard({ room, onPress }: Props) {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];

  return (
    <Pressable onPress={onPress ?? (() => router.push(`/admin/rooms/${room._id}`))}>
      <ThemedView
        style={[
          styles.card,
          { backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7" },
        ]}
      >
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: room.photo[0] }}
            style={styles.image}
            resizeMode="cover"
          />
          <StatusBadge status={room.status} />
        </View>

        <View style={styles.body}>
          <View style={styles.iconRow}>
            <HashIcon color={colors.icon} />
            <ThemedText style={styles.dim}>{room.number}</ThemedText>
          </View>
          <View style={styles.iconRow}>
            <TagIcon color={colors.icon} />
            <ThemedText style={styles.dim}>{room.type}</ThemedText>
          </View>
          <View style={styles.iconRow}>
            <UserGroupIcon size={20} color={colors.icon} />
            <ThemedText style={styles.dim}>{room.capacity}</ThemedText>
          </View>
          <View style={styles.iconRow}>
            <DollarIcon color={colors.icon} />
            <ThemedText style={styles.dim}>{room.price}</ThemedText>
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 14, overflow: "hidden" },
  imageWrap: { position: "relative" },
  image: { width: "100%", height: 160, backgroundColor: "#000" },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dim: { opacity: 0.6, fontSize: 13, textTransform: "capitalize" },
});
