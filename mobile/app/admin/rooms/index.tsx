import { useState } from "react";
import { StyleSheet, Pressable, FlatList, View } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useGetRoomsQuery } from "@/redux/api/room";
import FilterDropdown from "@/components/filter-dropdown";
import RoomCard from "@/components/room-card";
import type Room from "@/interface/Room";
import type { RoomType, RoomStatus } from "@/interface/Room";

const ROOM_TYPES: RoomType[] = ["single bed", "double bed", "family", "deluxe", "suite"];
const ROOM_STATUSES: RoomStatus[] = ["available", "busy", "maintenance"];

export default function RoomsScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];
  const { data } = useGetRoomsQuery({ page: 0, limit: 50 });

  const [typeFilter, setTypeFilter] = useState<RoomType | null>(null);
  const [statusFilter, setStatusFilter] = useState<RoomStatus | null>(null);
  const [typeOpen, setTypeOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const openType = () => { setStatusOpen(false); setTypeOpen(true); };
  const openStatus = () => { setTypeOpen(false); setStatusOpen(true); };

  const rooms = data?.data ?? [];

  const filteredRooms = rooms.filter((room) => {
    if (typeFilter && room.type !== typeFilter) return false;
    if (statusFilter && room.status !== statusFilter) return false;
    return true;
  });

  return (
    <ThemedView style={styles.container}>
      <View style={styles.topBar}>
        <Pressable
          style={[styles.createBtn, { backgroundColor: colors.tint }]}
          onPress={() => router.push("/admin/rooms/create")}
        >
          <ThemedText style={styles.createBtnText}>+ Create</ThemedText>
        </Pressable>

        <View style={styles.filters}>
          <FilterDropdown
            label="Type"
            options={ROOM_TYPES}
            selected={typeFilter}
            visible={typeOpen}
            onOpen={openType}
            onSelect={(v) => {
              setTypeFilter(v);
              setTypeOpen(false);
            }}
            onClose={() => setTypeOpen(false)}
          />
          <FilterDropdown
            label="Status"
            options={ROOM_STATUSES}
            selected={statusFilter}
            visible={statusOpen}
            onOpen={openStatus}
            onSelect={(v) => {
              setStatusFilter(v);
              setStatusOpen(false);
            }}
            onClose={() => setStatusOpen(false)}
          />
        </View>
      </View>

      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: Room }) => <RoomCard room={item} />}
        ListEmptyComponent={
          <ThemedText style={styles.empty}>No rooms found</ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  createBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  createBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  filters: { flexDirection: "row", gap: 8 },
  list: { paddingHorizontal: 20, paddingBottom: 20, gap: 10 },
  empty: { textAlign: "center", marginTop: 40, opacity: 0.5 },
});
