import type { RoomWithUser } from "./BookingTableRow";
import BookingTableRow from "./BookingTableRow";
import { Spinner } from "../sg";

interface BookingTableProps {
  rooms: RoomWithUser[];
  onDelete: (id: string) => void;
  loading?: boolean;
}

export default function BookingTable({ rooms, onDelete, loading }: BookingTableProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-12 flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Spinner />
            Loading bookings...
          </div>
        </div>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-12 text-center text-sm text-slate-400">
          No bookings found.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              User Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Start Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              End Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <BookingTableRow key={room._id} room={room} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
