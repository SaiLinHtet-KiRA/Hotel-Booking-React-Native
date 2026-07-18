import { useParams } from "react-router-dom";
import type Room from "../../interface/Room";
import type User from "../../interface/User";
import { useAppSelector } from "../../redux/store";

export type RoomWithUser = {
  [K in keyof Room]: K extends "userId" ? User : Room[K];
};

interface BookingTableRowProps {
  room: RoomWithUser;
  onDelete: (id: string) => void;
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleString();
}

export default function BookingTableRow({
  room,
  onDelete,
}: BookingTableRowProps) {
  const { _id, role, name } = useAppSelector(({ user }) => user);
  const { id } = useParams<{ id: string }>();

  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3 text-sm text-slate-600">{room.id}</td>
      <td className="px-4 py-3 text-sm text-slate-500 font-mono">
        {room.userId.name || name}
      </td>
      <td className="px-4 py-3 text-sm text-slate-700">
        {formatDate(room.startTime)}
      </td>
      <td className="px-4 py-3 text-sm text-slate-700">
        {formatDate(room.endTime)}
      </td>
      <td className="px-4 py-3 text-sm text-slate-500">
        {new Date(room.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onDelete(room._id)}
          disabled={
            id == "my" ? false : role == "user" && _id != room.userId._id
          }
          className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
