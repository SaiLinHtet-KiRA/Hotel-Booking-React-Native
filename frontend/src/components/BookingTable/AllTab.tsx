import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetRoomsQuery } from "../../redux/api/room";
import BookingTable from "./BookingTable";
import type { RoomWithUser } from "./BookingTableRow";
import BookingPagination from "./BookingPagination";
import BookingDeleteModal from "./BookingDeleteModal";

const PAGE_LIMIT = 20;

export function AllTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deletingRoom, setDeletingRoom] = useState<string | null>(null);

  const page = Number(searchParams.get("page")) || 0;

  const { data, isLoading, isFetching } = useGetRoomsQuery({
    page,
    limit: PAGE_LIMIT,
  });

  const rooms = (data?.data ?? []) as unknown as RoomWithUser[];

  function handlePageChange(newPage: number) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(newPage));
    setSearchParams(next, { replace: true });
  }

  return (
    <>
      <BookingTable
        rooms={rooms}
        loading={isLoading}
        onDelete={setDeletingRoom}
      />

      <BookingPagination
        page={page}
        limit={PAGE_LIMIT}
        hasMore={rooms.length === PAGE_LIMIT}
        onPageChange={handlePageChange}
        loading={isFetching}
      />

      <BookingDeleteModal
        id={deletingRoom}
        onClose={() => setDeletingRoom(null)}
      />
    </>
  );
}
