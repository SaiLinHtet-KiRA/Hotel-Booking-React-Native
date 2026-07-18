import { useState } from "react";
import { useGetUsersQuery } from "../redux/api/user";
import type User from "../interface/User";
import type { PaginationQuery } from "../redux/api/user";
import UserSearchBar from "../components/UserTable/UserSearchBar";
import UserTable from "../components/UserTable/UserTable";
import UserPagination from "../components/UserTable/UserPagination";
import UserEditModal from "../components/UserTable/UserEditModal";
import UserDeleteModal from "../components/UserTable/UserDeleteModal";
import UserCreateModal from "../components/UserTable/UserCreateModal";
import UserHeader from "../components/UserTable/UserHeader";

const PAGE_LIMIT = 20;

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState<PaginationQuery>({
    page: 0,
    limit: PAGE_LIMIT,
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data, isLoading, isFetching } = useGetUsersQuery(query);

  const users = data?.data ?? [];
  const hasMore = users.length === PAGE_LIMIT;

  function handleSearch(params: { name?: string; role?: string }) {
    setPage(0);
    setQuery({
      page: 0,
      limit: PAGE_LIMIT,
      name: params.name,
      role: params.role as PaginationQuery["role"],
    });
  }

  function handleReset() {
    setPage(0);
    setQuery({
      page: 0,
      limit: PAGE_LIMIT,
    });
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
    setQuery((prev) => ({ ...prev, page: newPage }));
  }

  return (
    <div className="flex flex-col gap-4">
      <UserHeader onCreate={() => setShowCreateModal(true)} />

      <UserSearchBar onSearch={handleSearch} onReset={handleReset} />

      <UserTable
        users={users}
        loading={isLoading}
        onEdit={setEditingUser}
        onDelete={setDeletingUser}
      />

      <UserPagination
        page={page}
        limit={PAGE_LIMIT}
        hasMore={hasMore}
        onPageChange={handlePageChange}
        loading={isFetching}
      />

      <UserEditModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
      />

      <UserDeleteModal
        user={deletingUser}
        onClose={() => setDeletingUser(null)}
      />

      {showCreateModal && (
        <UserCreateModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
