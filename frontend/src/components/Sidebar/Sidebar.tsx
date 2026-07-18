import { NavLink } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAppSelector } from "../../redux/store";

export default function Sidebar() {
  const { role } = useAppSelector(({ user }) => user);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2.5 rounded-md text-sm transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-700 hover:text-slate-100"
    }`;

  return (
    <aside className="w-60 min-h-screen bg-slate-800 text-slate-200 px-4 py-6 flex flex-col gap-6">
      <h2 className="text-lg font-semibold pb-4 border-b border-slate-700 capitalize">
        {role} Panel
      </h2>
      <nav className="flex flex-col gap-1">
        <NavLink to="/dashboard/bookings" className={linkClass}>
          Bookings
        </NavLink>
        {role == "admin" && (
          <NavLink to="/dashboard/users" className={linkClass}>
            Users
          </NavLink>
        )}
      </nav>
      <div className="mt-auto border-t border-slate-700 pt-4">
        <LogoutButton />
      </div>
    </aside>
  );
}
