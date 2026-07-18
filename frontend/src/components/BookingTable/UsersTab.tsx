import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetUsersQuery } from "../../redux/api/user";
import type User from "../../interface/User";
import type Room from "../../interface/Room";

type UserWithRecords = User & { records: Room[] };
import BookingPagination from "./BookingPagination";

const PAGE_LIMIT = 8;

function formatDate(date: Date | string) {
  return new Date(date).toLocaleString();
}

export function UsersTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUser, setSelectedUser] = useState<UserWithRecords | null>(
    null,
  );
  const page = Number(searchParams.get("page")) || 0;

  const { data, isLoading, isFetching } = useGetUsersQuery({
    page,
    limit: PAGE_LIMIT,
  });

  const users = (data?.data ?? []) as unknown as UserWithRecords[];

  const hasMore = users.length === PAGE_LIMIT;

  function handlePageChange(newPage: number) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(newPage));
    setSearchParams(next, { replace: true });
  }

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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer"
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

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 overflow-hidden max-h-[80vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">
                {selectedUser.name}'s Bookings
              </h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer text-xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="px-6 py-4 overflow-y-auto">
              {selectedUser.records && selectedUser.records.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {selectedUser.records.map((record, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between text-sm text-slate-600 bg-slate-50 rounded-md px-4 py-3"
                    >
                      <span className="font-medium text-slate-800">
                        #{record.id}
                      </span>
                      <span>{formatDate(record.startTime)}</span>
                      <span className="text-slate-400">&rarr;</span>
                      <span>{formatDate(record.endTime)}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400 text-center py-8">
                  No bookings yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <BookingPagination
        page={page}
        limit={PAGE_LIMIT}
        hasMore={hasMore}
        onPageChange={handlePageChange}
        loading={isFetching}
      />
    </>
  );
}
