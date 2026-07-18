import type User from "../../interface/User";

interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserTableRow({
  user,
  onEdit,
  onDelete,
}: UserTableRowProps) {
  const roleBadge = {
    admin: "bg-red-100 text-red-700",
    owner: "bg-blue-100 text-blue-700",
    user: "bg-slate-100 text-slate-700",
  }[user.role];

  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3 text-sm text-slate-600">{user.id}</td>
      <td className="px-4 py-3 text-sm font-medium text-slate-800">
        {user.name}
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${roleBadge}`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-slate-500">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(user)}
            className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user)}
            className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
