import { useState, useRef } from "react";
import { StyleSheet, View, Pressable, Modal } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import type Booking from "@/interface/Booking";
import type { BookingStatus } from "@/interface/Booking";
import { fmtDate } from "@/util/date";
import { useUpdateBookingMutation } from "@/redux/api/booking";
import { UserGroupIcon } from "@/components/svg/AdminIcons";
import { HashIcon, TagIcon } from "@/components/svg/FormIcons";

type Props = { booking: Booking; editable?: boolean };

const STATUSES: BookingStatus[] = ["pending", "confirmed", "cancelled"];

export default function BookingCard({ booking, editable }: Props) {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];
  const [updateBooking] = useUpdateBookingMutation();
  const [open, setOpen] = useState(false);
  const [dropdownY, setDropdownY] = useState(0);
  const badgeRef = useRef<View>(null);

  const statusColor =
    booking.status === "confirmed"
      ? colors.tint
      : booking.status === "pending"
        ? "#EAB308"
        : "#EF4444";

  const openDropdown = () => {
    if (!editable) return;
    badgeRef.current?.measure((_x, _y, _w, h, _px, py) => {
      setDropdownY(py + h + 4);
      setOpen(true);
    });
  };

  const changeStatus = async (s: BookingStatus) => {
    setOpen(false);
    if (s === booking.status) return;
    try {
      await updateBooking({ id: booking._id, body: { status: s } }).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemedView
      style={[
        styles.card,
        { backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7" },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <ThemedText type="defaultSemiBold" style={styles.price}>
            ${booking.price}
          </ThemedText>
          <View style={styles.metaRow}>
            <HashIcon size={12} color={colors.icon} />
            <ThemedText style={styles.metaText}>{booking.room.number}</ThemedText>
            <ThemedText style={styles.dot}>·</ThemedText>
            <TagIcon size={12} color={colors.icon} />
            <ThemedText style={styles.metaText}>{booking.room.type}</ThemedText>
            <ThemedText style={styles.dot}>·</ThemedText>
            <UserGroupIcon size={12} color={colors.icon} />
            <ThemedText style={styles.metaText}>
              {booking.room.capacity} {booking.room.capacity === 1 ? "person" : "people"}
            </ThemedText>
          </View>
        </View>

        <View style={styles.statusWrap}>
          <Pressable
            ref={badgeRef}
            style={[styles.badge, { backgroundColor: statusColor }]}
            onPress={openDropdown}
          >
            <ThemedText style={styles.badgeText}>{booking.status}</ThemedText>
          </Pressable>

          {open && (
            <Modal transparent animationType="none" onRequestClose={() => setOpen(false)}>
              <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
                <View />
              </Pressable>
              <View style={[styles.dropdown, { top: dropdownY, backgroundColor: scheme === "dark" ? "#2C2C2E" : "#fff" }]}>
                {STATUSES.map((s) => (
                  <Pressable
                    key={s}
                    style={[styles.item, s === booking.status && { backgroundColor: scheme === "dark" ? "#3A3A3C" : "#E8F0FE" }]}
                    onPress={() => changeStatus(s)}
                  >
                    <ThemedText style={[styles.itemText, { color: s === "confirmed" ? colors.tint : s === "pending" ? "#EAB308" : "#EF4444" }]}>
                      {s}
                    </ThemedText>
                    {s === booking.status && <ThemedText style={{ color: colors.tint }}>✓</ThemedText>}
                  </Pressable>
                ))}
              </View>
            </Modal>
          )}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <ThemedText type="defaultSemiBold">{fmtDate(booking.startDate)}</ThemedText>
        <ThemedText style={styles.arrow}>→</ThemedText>
        <ThemedText type="defaultSemiBold">{fmtDate(booking.endDate)}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 14, padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: { gap: 6, flex: 1 },
  price: { fontSize: 18 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, flexWrap: "wrap" },
  metaText: { fontSize: 13, opacity: 0.6, textTransform: "capitalize" },
  dot: { fontSize: 13, opacity: 0.3 },
  statusWrap: { position: "relative" },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600", textTransform: "capitalize" },
  dropdown: {
    position: "absolute",
    right: 16,
    minWidth: 130,
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  backdrop: { flex: 1 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  itemText: { fontSize: 14, textTransform: "capitalize", fontWeight: "500" },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(128,128,128,0.2)",
    marginVertical: 12,
  },
  footer: { flexDirection: "row", alignItems: "center", gap: 8 },
  arrow: { opacity: 0.3, fontSize: 14 },
});
