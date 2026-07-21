import { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { router } from "expo-router";
import { useForm, useWatch } from "react-hook-form";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { fmtDate, calcNights } from "@/util/date";
import { useCreateBookingMutation } from "@/redux/api/booking";

import { RoomStatus } from "@/interface/Room";

type Props = { price: number; roomId: string; status: RoomStatus };

type BookingForm = { checkIn: Date | null; checkOut: Date | null };

export default function BookingSection({ price, roomId, status }: Props) {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const [serverError, setServerError] = useState("");

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingForm>({
    defaultValues: { checkIn: null, checkOut: null },
  });

  const checkIn = useWatch({ control, name: "checkIn" });
  const checkOut = useWatch({ control, name: "checkOut" });

  const n = calcNights(checkIn, checkOut);
  const unavailable = status === "busy" || status === "maintenance";
  const canBook = !unavailable && !!checkIn && !!checkOut && n > 0;

  const onSubmit = async (data: BookingForm) => {
    setServerError("");
    try {
      await createBooking({
        room: roomId,
        startDate: data.checkIn!,
        endDate: data.checkOut!,
      }).unwrap();
      router.back();
    } catch (err: unknown) {
      const e = err as { data?: { message?: string } };
      const msg = e?.data?.message || "Something went wrong";
      if (msg === "Not logged in") {
        router.push("/login");
        return;
      }
      setServerError(msg);
    }
  };

  return (
    <>
      <ThemedText type="subtitle">Booking</ThemedText>

      <ThemedView
        style={[
          styles.card,
          { backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7" },
        ]}
      >
        <View style={styles.dateRow}>
          <Pressable style={styles.dateField}>
            <ThemedText style={styles.label}>Check-in</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.value}>
              {fmtDate(checkIn) || "\u00A0"}
            </ThemedText>

            <DateTimePicker
              value={checkIn ?? new Date()}
              mode="date"
              minimumDate={new Date()}
              onChange={(_: DateTimePickerEvent, d?: Date) => {
                if (d) setValue("checkIn", d);
              }}
            />
          </Pressable>

          <View style={styles.div} />

          <Pressable style={styles.dateField}>
            <ThemedText style={styles.label}>Check-out</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.value}>
              {fmtDate(checkOut) || "\u00A0"}
            </ThemedText>
            <DateTimePicker
              value={checkOut ?? checkIn ?? new Date()}
              mode="date"
              minimumDate={checkIn ?? new Date()}
              onChange={(_: DateTimePickerEvent, d?: Date) => {
                if (d) setValue("checkOut", d);
              }}
            />
          </Pressable>
        </View>

        {n > 0 && (
          <>
            <View style={styles.sep} />
            <View style={styles.totalRow}>
              <ThemedText style={styles.totalLabel}>
                ${price} x {n} {n === 1 ? "night" : "nights"}
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={{ color: colors.tint }}>
                ${n * price}
              </ThemedText>
            </View>
          </>
        )}
      </ThemedView>

      {serverError ? (
        <ThemedText style={styles.error}>{serverError}</ThemedText>
      ) : null}

      {unavailable ? (
        <ThemedText style={styles.busy}>This room is unavailable</ThemedText>
      ) : (
        <Pressable
          style={[
            styles.btn,
            { backgroundColor: canBook ? colors.tint : "rgba(255,255,255,0.15)" },
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={!canBook || isLoading}
        >
          <ThemedText style={styles.btnText}>
            {isLoading ? "Booking..." : "Book Now"}
          </ThemedText>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 14, padding: 16 },
  dateRow: { flexDirection: "row", alignItems: "center" },
  dateField: { flex: 1, gap: 4 },
  label: { fontSize: 12, opacity: 0.5, textTransform: "uppercase" },
  value: { fontSize: 15 },
  div: {
    width: 1,
    height: 36,
    backgroundColor: "rgba(128,128,128,0.2)",
    marginHorizontal: 16,
  },
  sep: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(128,128,128,0.2)",
    marginTop: 14,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 14,
  },
  totalLabel: { fontSize: 14, opacity: 0.6 },
  btn: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  error: { color: "#EF4444", fontSize: 13, textAlign: "center" },
  busy: { color: "#EF4444", fontSize: 14, textAlign: "center", fontWeight: "600" },
});
