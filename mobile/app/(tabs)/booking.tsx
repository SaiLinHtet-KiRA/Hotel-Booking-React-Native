import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useGetBookingColQuery } from "@/redux/api/booking-col";
import BookingCard from "@/components/booking-card";
import type Booking from "@/interface/Booking";

export default function BookingScreen() {
  const { data, isLoading } = useGetBookingColQuery();

  if (isLoading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  const bookings = data?.data?.bookings ?? [];

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: Booking }) => (
          <BookingCard booking={item} />
        )}
        ListEmptyComponent={
          <ThemedText style={styles.empty}>No bookings found</ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  list: { padding: 20, gap: 12, paddingBottom: 20 },
  empty: { textAlign: "center", marginTop: 40, opacity: 0.5 },
});
