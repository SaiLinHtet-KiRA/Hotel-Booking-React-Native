import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import BookingTable from "./BookingTable";
import type { RoomWithUser } from "./BookingTableRow";
import BookingPagination from "./BookingPagination";
import BookingDeleteModal from "./BookingDeleteModal";

const PAGE_LIMIT = 20;

export function MyTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deletingRoom, setDeletingRoom] = useState<string | null>(null);
  const currentUser = useAppSelector(({ user }) => user);

  const page = Number(searchParams.get("page")) || 0;

  const records = (currentUser.records ?? []) as unknown as RoomWithUser[];
  const totalPages = Math.ceil(records.length / PAGE_LIMIT);
  const sliced = records.slice(page * PAGE_LIMIT, (page + 1) * PAGE_LIMIT);

  function handlePageChange(newPage: number) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(newPage));
    setSearchParams(next, { replace: true });
  }

  return (
    <>
      <BookingTable rooms={sliced} onDelete={setDeletingRoom} />

      <BookingPagination
        page={page}
        limit={PAGE_LIMIT}
        hasMore={page + 1 < totalPages}
        onPageChange={handlePageChange}
      />

      <BookingDeleteModal
        id={deletingRoom}
        onClose={() => setDeletingRoom(null)}
      />
    </>
  );
}
