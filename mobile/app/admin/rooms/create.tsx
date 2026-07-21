import { useState } from "react";
import { router } from "expo-router";
import { useCreateRoomMutation } from "@/redux/api/room";
import RoomForm, { RoomFormValues } from "@/components/room-form";

export default function CreateRoomScreen() {
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const [error, setError] = useState("");

  const onSubmit = async (data: RoomFormValues) => {
    setError("");
    try {
      const form = new FormData();
      form.append("number", String(data.number));
      form.append("type", data.type!);
      form.append("capacity", String(data.capacity));
      form.append("price", String(data.price));
      form.append("status", data.status!);

      for (const img of data.images) {
        form.append("photo", {
          uri: img.uri,
          type: img.mimeType ?? "image/jpeg",
          name: (img as any).fileName ?? "photo.jpg",
        } as any);
      }

      await createRoom(form).unwrap();
      router.back();
    } catch (err: unknown) {
      const e = err as { data?: { message?: string } };
      setError(e?.data?.message || "Something went wrong");
    }
  };

  return <RoomForm onSubmit={onSubmit} isLoading={isLoading} error={error} />;
}
