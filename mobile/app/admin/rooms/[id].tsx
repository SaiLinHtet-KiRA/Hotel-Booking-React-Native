import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { useGetRoomQuery, useUpdateRoomMutation } from "@/redux/api/room";
import RoomForm, { RoomFormValues } from "@/components/room-form";
import { ThemedView } from "@/components/themed-view";
import { ActivityIndicator } from "react-native";

export default function EditRoomScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading: loading } = useGetRoomQuery(id!);
  const [updateRoom, { isLoading }] = useUpdateRoomMutation();
  const [error, setError] = useState("");

  if (loading) {
    return (
      <ThemedView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator />
      </ThemedView>
    );
  }

  const onSubmit = async (formData: RoomFormValues) => {
    setError("");
    try {
      const form = new FormData();
      form.append("number", String(formData.number));
      form.append("type", formData.type!);
      form.append("capacity", String(formData.capacity));
      form.append("price", String(formData.price));
      form.append("status", formData.status!);

      for (const img of formData.images) {
        form.append("photo", {
          uri: img.uri,
          type: img.mimeType ?? "image/jpeg",
          name: (img as any).fileName ?? "photo.jpg",
        } as any);
      }

      await updateRoom({ id: id!, body: form }).unwrap();
      router.back();
    } catch (err: unknown) {
      const e = err as { data?: { message?: string } };
      setError(e?.data?.message || "Something went wrong");
    }
  };

  return (
    <RoomForm room={data?.data} onSubmit={onSubmit} isLoading={isLoading} error={error} />
  );
}
