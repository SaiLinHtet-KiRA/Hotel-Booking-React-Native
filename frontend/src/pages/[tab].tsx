import { useParams } from "react-router-dom";
import { AllTab } from "../components/BookingTable/AllTab";
import { MyTab } from "../components/BookingTable/MyTab";
import { UsersTab } from "../components/BookingTable/UsersTab";

export default function TabContent() {
  const { id } = useParams<{ id: string }>();

  if (id === "users") return <UsersTab />;
  if (id === "my") return <MyTab />;
  return <AllTab />;
}
