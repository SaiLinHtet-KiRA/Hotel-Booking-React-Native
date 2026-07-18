interface UserHeaderProps {
  onCreate: () => void;
}

export default function UserHeader({ onCreate }: UserHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-slate-800">Users</h1>
      <button
        onClick={onCreate}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Create User
      </button>
    </div>
  );
}
