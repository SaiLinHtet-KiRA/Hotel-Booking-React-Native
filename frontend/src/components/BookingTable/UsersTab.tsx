import { useGetUsersQuery } from "../../redux/api/user";
import type Room from "../../interface/Room";
import type User from "../../interface/User";

export function UsersTab() {
  const { data, isLoading } = useGetUsersQuery({ page: 0, limit: 100 });

  const users = (data?.data ?? []) as unknown as (User & {
    records: Room[];
  })[];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-12 text-center text-sm text-slate-400">
        Loading users...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-12 text-center text-sm text-slate-400">
        No users found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <div
          key={user._id}
          className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="font-semibold text-slate-800">{user.name}</p>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                  user.role === "admin"
                    ? "bg-red-100 text-red-700"
                    : user.role === "owner"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-700"
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-400">ID: {user.id}</span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700">
              <svg
                className="w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {user.records?.length ?? 0} bookings
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
