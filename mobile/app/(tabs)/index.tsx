import { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useGetRoomsQuery } from "@/redux/api/room";
import FilterDropdown from "@/components/filter-dropdown";
import RoomCard from "@/components/room-card";
import type Room from "@/interface/Room";
import type { RoomType, RoomStatus } from "@/interface/Room";

const ROOM_TYPES: RoomType[] = [
  "single bed",
  "double bed",
  "family",
  "deluxe",
  "suite",
];
const ROOM_STATUSES: RoomStatus[] = ["available", "busy", "maintenance"];
const LIMIT = 10;

export default function HomeScreen() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching } = useGetRoomsQuery(
    { page, limit: LIMIT },
    { refetchOnMountOrArgChange: true },
  );

  const [typeFilter, setTypeFilter] = useState<RoomType | null>(null);
  const [statusFilter, setStatusFilter] = useState<RoomStatus | null>(null);
  const [typeOpen, setTypeOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const openType = () => {
    setStatusOpen(false);
    setTypeOpen(true);
  };
  const openStatus = () => {
    setTypeOpen(false);
    setStatusOpen(true);
  };

  useEffect(() => {
    if (!data) return;
    const newRooms = data.data;
    setRooms((prev) => (page === 0 ? newRooms : [...prev, ...newRooms]));
    setTotalCount(data.size);
  }, [data]);

  useEffect(() => {
    setHasMore(rooms.length < totalCount);
  }, [rooms, totalCount]);

  const handleEndReached = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const filteredRooms = rooms.filter((room) => {
    if (typeFilter && room.type !== typeFilter) return false;
    if (statusFilter && room.status !== statusFilter) return false;
    return true;
  });

  return (
    <ThemedView style={styles.container}>
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

      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        renderItem={({ item }: { item: Room }) => (
          <RoomCard
            room={item}
            onPress={() =>
              router.push({ pathname: "/room/[id]", params: { id: item._id } } as never)
            }
          />
        )}
        ListEmptyComponent={
          <ThemedText style={styles.empty}>No rooms found</ThemedText>
        }
        ListFooterComponent={
          isFetching ? <ActivityIndicator style={styles.loader} /> : null
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  filters: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  list: { paddingHorizontal: 20, paddingBottom: 20, gap: 10 },
  empty: { textAlign: "center", marginTop: 40, opacity: 0.5 },
  loader: { paddingVertical: 20 },
});
