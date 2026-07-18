import type User from "../../interface/User";
import { useDeleteUserMutation } from "../../redux/api/user";

interface UserDeleteModalProps {
  user: User | null;
  onClose: () => void;
}

export default function UserDeleteModal({
  user,
  onClose,
}: UserDeleteModalProps) {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  if (!user) return null;

  async function handleDelete() {
    try {
      await deleteUser(user!._id).unwrap();
      onClose();
    } catch {
      return;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">
            Delete User
          </h3>
        </div>

        <div className="px-6 py-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-800">{user.name}</span>?
            This action cannot be undone.
          </p>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-2 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
