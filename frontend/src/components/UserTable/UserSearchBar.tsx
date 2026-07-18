interface SearchParams {
  name?: string;
  role?: string;
}

interface UserSearchBarProps {
  onSearch: (params: SearchParams) => void;
  onReset: () => void;
}

export default function UserSearchBar({
  onSearch,
  onReset,
}: UserSearchBarProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    onSearch({
      name: (data.get("name") as string) || undefined,
      role: (data.get("role") as string) || undefined,
    });
  }

  function handleReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const form = e.currentTarget.form as HTMLFormElement;
    form.reset();
    onReset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-3 bg-white rounded-lg border border-slate-200 p-4"
    >
      <label className="flex flex-col gap-1 min-w-[200px] flex-1">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Name
        </span>
        <input
          name="name"
          type="text"
          placeholder="Search by name..."
          className="px-3 py-2 border border-slate-300 rounded-md text-sm"
        />
      </label>

      <label className="flex flex-col gap-1 min-w-[160px]">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Role
        </span>
        <select
          name="role"
          defaultValue=""
          className="px-3 py-2 border border-slate-300 rounded-md text-sm bg-white"
        >
          <option value="">All roles</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
          <option value="user">User</option>
        </select>
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
