import { useState } from "react";
import { Outlet } from "react-router-dom";
import BookingTabs from "../components/BookingTable/BookingTabs";
import BookingHeader from "../components/BookingTable/BookingHeader";
import BookingCreateModal from "../components/BookingTable/BookingCreateModal";

export default function BookingLayout() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <BookingHeader onCreate={() => setShowCreateModal(true)} />

      <BookingTabs />

      <Outlet />

      {showCreateModal && (
        <BookingCreateModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
