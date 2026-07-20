import { useState } from "react";
import { StyleSheet, Pressable, View, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { UserGroupIcon } from "@/components/svg/AdminIcons";
import {
  HashIcon,
  TagIcon,
  DollarIcon,
  BarIcon,
} from "@/components/svg/FormIcons";
import { useCreateRoomMutation } from "@/redux/api/room";
import FormInput from "@/components/form-input";
import FormPicker from "@/components/form-picker";
import ImagePickerSection from "@/components/image-picker-section";
import type { RoomType, RoomStatus, RoomDTO } from "@/interface/Room";

const ROOM_TYPES: RoomType[] = [
  "single bed",
  "double bed",
  "family",
  "deluxe",
  "suite",
];
const ROOM_STATUSES: RoomStatus[] = ["available", "busy", "maintenance"];

export default function CreateRoomForm() {
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];

  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<RoomDTO>({
      defaultValues: {
        number: undefined,
        type: undefined,
        capacity: undefined,
        price: undefined,
        status: undefined,
        photo: [],
      },
    });
  const photo = watch("photo");

  const onSubmit = async (data: RoomDTO) => {
    try {
      await createRoom({
        number: Number(data.number),
        photo: data.photo,
        type: data.type!,
        capacity: Number(data.capacity),
        price: Number(data.price),
        status: data.status!,
      }).unwrap();
      router.back();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Controller
        control={control}
        name="number"
        rules={{ required: "Room number is required" }}
        render={({ field, fieldState: { error } }) => (
          <View style={styles.field}>
            <FormInput
              label="Room Number"
              icon={<HashIcon color={colors.icon} />}
              placeholder="e.g. 101"
              keyboardType="numeric"
              error={error?.message}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
          </View>
        )}
      />

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

      <Controller
        control={control}
        name="capacity"
        rules={{ required: "Capacity is required" }}
        render={({ field, fieldState: { error } }) => (
          <View style={styles.field}>
            <FormInput
              label="Capacity"
              icon={<UserGroupIcon size={20} color={colors.icon} />}
              placeholder="e.g. 2"
              keyboardType="numeric"
              error={error?.message}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
          </View>
        )}
      />

      <Controller
        control={control}
        name="price"
        rules={{ required: "Price is required" }}
        render={({ field, fieldState: { error } }) => (
          <View style={styles.field}>
            <FormInput
              label="Price ($/night)"
              icon={<DollarIcon color={colors.icon} />}
              placeholder="e.g. 150"
              keyboardType="numeric"
              error={error?.message}
              value={field.value || ""}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
          </View>
        )}
      />

      <View style={styles.field}>
        <ImagePickerSection
          images={photo!}
          onAdd={(assets) =>
            setValue("photo", [...getValues("photo")!, ...assets])
          }
          onRemove={(uri) =>
            setValue(
              "photo",
              getValues("photo")!.filter((img) => img.uri !== uri),
            )
          }
        />
      </View>

      <Pressable
        style={[
          styles.submitBtn,
          { backgroundColor: isLoading ? "#A7F3D0" : colors.tint },
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        <ThemedText style={styles.submitText}>
          {isLoading ? "Creating..." : "Create Room"}
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
  submitBtn: {
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
