import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { RoomDTO } from "../../interface/Room";
import type { RoomWithUser } from "./BookingTableRow";
import { useUpdateRoomMutation } from "../../redux/api/room";
import InputField from "../InputField/InputField";

type BookingFormData = Omit<RoomDTO, "userId">;

interface BookingEditModalProps {
  room: RoomWithUser | null;
  onClose: () => void;
}

function toDatetimeLocal(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}

export default function BookingEditModal({
  room,
  onClose,
}: BookingEditModalProps) {
  const [updateRoom, { isLoading }] = useUpdateRoomMutation();
  const { control, handleSubmit, reset, setError, formState } =
    useForm<BookingFormData>();

  useEffect(() => {
    if (room) {
      reset({
        startTime: room.startTime,
        endTime: room.endTime,
      });
    }
  }, [room, reset]);

  if (!room) return null;

  async function onSubmit(data: BookingFormData) {
    try {
      await updateRoom({ id: room!._id, body: data }).unwrap();
      onClose();
    } catch (err: unknown) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ??
        "Failed to update booking";
      setError("root", { message });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">
            Edit Booking
          </h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 flex flex-col gap-4">
            <Controller
              name="startTime"
              control={control}
              rules={{ required: "Start time is required" }}
              render={({
                field: { value, onChange, ...field },
                fieldState,
              }) => (
                <InputField
                  label="Start Time"
                  type="datetime-local"
                  error={fieldState.error?.message}
                  value={
                    value instanceof Date ? toDatetimeLocal(value) : value
                  }
                  onChange={(e) => onChange(new Date(e.target.value))}
                  {...field}
                />
              )}
            />

            <Controller
              name="endTime"
              control={control}
              rules={{ required: "End time is required" }}
              render={({
                field: { value, onChange, ...field },
                fieldState,
              }) => (
                <InputField
                  label="End Time"
                  type="datetime-local"
                  error={fieldState.error?.message}
                  value={
                    value instanceof Date ? toDatetimeLocal(value) : value
                  }
                  onChange={(e) => onChange(new Date(e.target.value))}
                  {...field}
                />
              )}
            />

            {formState.errors.root && (
              <p className="text-red-600 text-sm">
                {formState.errors.root.message}
              </p>
            )}
          </div>

          <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-2 bg-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
