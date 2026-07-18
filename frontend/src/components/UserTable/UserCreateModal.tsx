import { useForm, Controller } from "react-hook-form";
import type { UserDTO } from "../../interface/User";
import { useCreateUserMutation } from "../../redux/api/user";
import InputField from "../InputField/InputField";

interface UserCreateModalProps {
  onClose: () => void;
}

export default function UserCreateModal({ onClose }: UserCreateModalProps) {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const { control, handleSubmit, setError, formState } = useForm<UserDTO>({
    defaultValues: { name: "", password: "", role: "user" },
  });

  async function onSubmit(data: UserDTO) {
    try {
      await createUser(data).unwrap();
      onClose();
    } catch (err: unknown) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ??
        "Failed to create user";
      setError("root", { message });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Create User</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 flex flex-col gap-4">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field, fieldState }) => (
                <InputField
                  label="Name"
                  type="text"
                  placeholder="Enter name"
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field, fieldState }) => (
                <InputField
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  error={fieldState.error?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field, fieldState }) => (
                <label className="flex flex-col gap-1 font-medium text-sm">
                  Role
                  <select
                    value={field.value}
                    onChange={field.onChange}
                    className="px-3 py-2 border border-slate-300 rounded-md text-sm font-normal bg-white"
                  >
                    <option value="user">User</option>
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                  </select>
                  {fieldState.error?.message && (
                    <p className="text-red-600 text-xs font-normal">
                      {fieldState.error.message}
                    </p>
                  )}
                </label>
              )}
            />

            {formState.errors.root && (
              <p className="text-red-600 text-sm">
                {formState.errors.root.message}
              </p>
            )}
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
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
