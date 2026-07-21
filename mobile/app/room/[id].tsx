import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useGetRoomQuery } from "@/redux/api/room";
import StatusBadge from "@/components/status-badge";
import RoomCarousel from "@/components/room-carousel";
import BookingSection from "@/components/booking-section";
import { UserGroupIcon } from "@/components/svg/AdminIcons";
import { HashIcon, TagIcon, DollarIcon } from "@/components/svg/FormIcons";

export default function RoomDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useGetRoomQuery(id!);
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];

  if (isLoading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator color={colors.tint} />
      </ThemedView>
    );
  }

  const room = data?.data;
  if (!room) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Room not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrap}>
          <RoomCarousel photos={room.photo} />
          <StatusBadge status={room.status} />
        </View>

        <View style={styles.body}>
          <ThemedText type="title">{room.type}</ThemedText>

          <View
            style={[
              styles.detailsCard,
              { backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7" },
            ]}
          >
            <View style={styles.detailRow}>
              <View style={styles.iconRow}>
                <HashIcon color={colors.icon} />
                <ThemedText style={styles.label}>Room Number</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold">{room.number}</ThemedText>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <View style={styles.iconRow}>
                <TagIcon color={colors.icon} />
                <ThemedText style={styles.label}>Type</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold" style={styles.capitalize}>
                {room.type}
              </ThemedText>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <View style={styles.iconRow}>
                <UserGroupIcon size={20} color={colors.icon} />
                <ThemedText style={styles.label}>Capacity</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold">
                {room.capacity} {room.capacity === 1 ? "person" : "people"}
              </ThemedText>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <View style={styles.iconRow}>
                <DollarIcon color={colors.icon} />
                <ThemedText style={styles.label}>Price</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold" style={{ color: colors.tint }}>
                ${room.price}
              </ThemedText>
            </View>
          </View>

          <BookingSection price={room.price} roomId={room._id} status={room.status} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  imageWrap: { position: "relative" },
  body: { padding: 20, gap: 20 },
  detailsCard: { borderRadius: 14, padding: 16, gap: 12 },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  label: { opacity: 0.6, fontSize: 14 },
  capitalize: { textTransform: "capitalize" },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(128,128,128,0.2)",
  },
});
