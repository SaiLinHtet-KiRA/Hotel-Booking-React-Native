import { NavLink } from "react-router-dom";

const TABS = [
  { to: "/dashboard/bookings/all", label: "All" },
  { to: "/dashboard/bookings/my", label: "My Booking" },
  { to: "/dashboard/bookings/users", label: "Users" },
];

export default function BookingTabs() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
    }`;

  return (
    <div className="flex items-center bg-white rounded-lg border border-slate-200 p-2">
      <nav className="flex gap-1">
        {TABS.map(({ to, label }) => (
          <NavLink key={to} to={to} className={linkClass}>
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
