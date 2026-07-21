import { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useGetBookingsQuery } from "@/redux/api/booking";
import FilterDropdown from "@/components/filter-dropdown";
import BookingCard from "@/components/booking-card";
import type Booking from "@/interface/Booking";
import type { BookingStatus } from "@/interface/Booking";

const STATUSES: BookingStatus[] = ["pending", "confirmed", "cancelled"];
const LIMIT = 10;

export default function BookingsScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [statusFilter, setStatusFilter] = useState<BookingStatus | null>(null);
  const [statusOpen, setStatusOpen] = useState(false);

  const { data, isFetching } = useGetBookingsQuery(
    { page, limit: LIMIT, status: statusFilter ?? undefined },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (!data) return;
    const newBookings = data.data;
    setBookings((prev) => (page === 0 ? newBookings : [...prev, ...newBookings]));
    setTotalCount(data.size);
  }, [data]);

  useEffect(() => {
    setHasMore(bookings.length < totalCount);
  }, [bookings, totalCount]);

  const handleEndReached = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.topBar}>
        <FilterDropdown
          label="Status"
          options={STATUSES}
          selected={statusFilter}
          visible={statusOpen}
          onOpen={() => setStatusOpen(true)}
          onSelect={(v) => {
            setStatusFilter(v);
            setStatusOpen(false);
            setPage(0);
            setBookings([]);
          }}
          onClose={() => setStatusOpen(false)}
        />
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        renderItem={({ item }: { item: Booking }) => (
          <BookingCard booking={item} editable />
        )}
        ListEmptyComponent={
          <ThemedText style={styles.empty}>No bookings found</ThemedText>
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
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  list: { paddingHorizontal: 20, paddingBottom: 20, gap: 10 },
  empty: { textAlign: "center", marginTop: 40, opacity: 0.5 },
  loader: { paddingVertical: 20 },
});
