import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

export default function BookingTabs() {
  const { role } = useAppSelector(({ user }) => user);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
    }`;

  return (
    <div className="flex items-center bg-white rounded-lg border border-slate-200 p-2">
      <nav className="flex gap-1">
        <NavLink to={"/dashboard/bookings/all"} className={linkClass}>
          All
        </NavLink>
        <NavLink to={"/dashboard/bookings/my"} className={linkClass}>
          My Booking
        </NavLink>
        {role == "owner" && (
          <NavLink to={"/dashboard/bookings/users"} className={linkClass}>
            Users
          </NavLink>
        )}
      </nav>
    </div>
  );
}
