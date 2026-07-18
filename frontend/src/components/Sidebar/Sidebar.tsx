import { NavLink } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2.5 rounded-md text-sm transition-colors ${
      isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-slate-100"
    }`;

  return (
    <aside className="w-60 min-h-screen bg-slate-800 text-slate-200 px-4 py-6 flex flex-col gap-6">
      <h2 className="text-lg font-semibold pb-4 border-b border-slate-700">
        Admin Panel
      </h2>
      <nav className="flex flex-col gap-1">
        <NavLink to="/dashboard" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/room" className={linkClass}>
          Rooms
        </NavLink>
        <NavLink to="/dashboard/users" className={linkClass}>
          Users
        </NavLink>
        <NavLink to="/dashboard/bookings" className={linkClass}>
          Bookings
        </NavLink>
      </nav>
      <div className="mt-auto border-t border-slate-700 pt-4">
        <LogoutButton />
      </div>
    </aside>
  );
}
