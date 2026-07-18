import { useAppSelector } from "../../redux/store";

interface BookingHeaderProps {
  onCreate: () => void;
}

export default function BookingHeader({ onCreate }: BookingHeaderProps) {
  const { role } = useAppSelector(({ user }) => user);
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-slate-800">Bookings</h1>
      {role == "owner" ||
        (role == "user" && (
          <button
            onClick={onCreate}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Create Booking
          </button>
        ))}
    </div>
  );
}
