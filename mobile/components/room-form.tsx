import { useState } from "react";
import { StyleSheet, Pressable, View, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { UserGroupIcon } from "@/components/svg/AdminIcons";
import { HashIcon, TagIcon, DollarIcon, BarIcon } from "@/components/svg/FormIcons";
import FormInput from "@/components/form-input";
import FormPicker from "@/components/form-picker";
import ImagePickerSection from "@/components/image-picker-section";
import type { RoomType, RoomStatus } from "@/interface/Room";
import type Room from "@/interface/Room";

const ROOM_TYPES: RoomType[] = ["single bed", "double bed", "family", "deluxe", "suite"];
const ROOM_STATUSES: RoomStatus[] = ["available", "busy", "maintenance"];

export type RoomFormValues = {
  number: string;
  type: RoomType | null;
  capacity: string;
  price: string;
  status: RoomStatus | null;
  images: ImagePicker.ImagePickerAsset[];
};

type Props = {
  room?: Room;
  isLoading?: boolean;
  onSubmit: (data: RoomFormValues) => void;
};

export default function RoomForm({ room, isLoading = false, onSubmit }: Props) {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const { control, handleSubmit } = useForm<RoomFormValues>({
    defaultValues: {
      number: room ? String(room.number) : "",
      type: room?.type ?? null,
      capacity: room ? String(room.capacity) : "",
      price: room ? String(room.price) : "",
      status: room?.status ?? null,
      images: [],
    },
  });

  const submit = (data: RoomFormValues) => {
    onSubmit({ ...data, images });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.fieldRow}>
        <View style={styles.fieldThird}>
          <Controller
            control={control}
            name="number"
            rules={{ required: "Room number is required" }}
            render={({ field, fieldState: { error } }) => (
              <FormInput
                label="Room No."
                icon={<HashIcon color={colors.icon} />}
                placeholder="101"
                keyboardType="numeric"
                error={error?.message}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </View>
        <View style={styles.fieldThird}>
          <Controller
            control={control}
            name="capacity"
            rules={{ required: "Capacity is required" }}
            render={({ field, fieldState: { error } }) => (
              <FormInput
                label="Capacity"
                icon={<UserGroupIcon size={20} color={colors.icon} />}
                placeholder="2"
                keyboardType="numeric"
                error={error?.message}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </View>
        <View style={styles.fieldThird}>
          <Controller
            control={control}
            name="price"
            rules={{ required: "Price is required" }}
            render={({ field, fieldState: { error } }) => (
              <FormInput
                label="Price"
                icon={<DollarIcon color={colors.icon} />}
                placeholder="150"
                keyboardType="numeric"
                error={error?.message}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.fieldRow}>
        <View style={styles.fieldHalf}>
          <Controller
            control={control}
            name="type"
            rules={{ required: "Room type is required" }}
            render={({ field, fieldState: { error } }) => (
              <FormPicker
                label="Type"
                icon={<TagIcon color={colors.icon} />}
                options={ROOM_TYPES}
                value={field.value}
                error={error?.message}
                onChange={field.onChange}
              />
            )}
          />
        </View>
        <View style={styles.fieldHalf}>
          <Controller
            control={control}
            name="status"
            rules={{ required: "Status is required" }}
            render={({ field, fieldState: { error } }) => (
              <FormPicker
                label="Status"
                icon={<BarIcon color={colors.icon} />}
                options={ROOM_STATUSES}
                value={field.value}
                error={error?.message}
                onChange={field.onChange}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.field}>
        <ImagePickerSection
          images={images}
          onAdd={(assets) => setImages((prev) => [...prev, ...assets])}
          onRemove={(uri) => setImages((prev) => prev.filter((img) => img.uri !== uri))}
        />
      </View>

      <Pressable
        style={[styles.submitBtn, { backgroundColor: isLoading ? "#A7F3D0" : colors.tint }]}
        onPress={handleSubmit(submit)}
        disabled={isLoading}
      >
        <ThemedText style={styles.submitText}>
          {isLoading ? "Saving..." : room ? "Update Room" : "Create Room"}
        </ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 18, paddingBottom: 40 },
  field: { gap: 6 },
  fieldRow: { flexDirection: "row", gap: 12 },
  fieldHalf: { flex: 1, gap: 6 },
  fieldThird: { flex: 1, gap: 6 },
  submitBtn: {
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
