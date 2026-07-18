import { useForm, Controller } from "react-hook-form";
import InputField from "../InputField/InputField";
import { useLoginMutation } from "../../redux/api/auth";
import type LoginDTO from "../../interface/Login";

export default function LoginForm() {
  const [login, { error }] = useLoginMutation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<LoginDTO>();

  const onSubmit = async (data: LoginDTO) => {
    try {
      await login(data).unwrap();
    } catch {
      setError("root", { message: "Invalid name or password" });
    }
  };

  return (
    <form
      className="flex flex-col gap-4 max-w-sm mx-auto mt-12 p-8 border border-slate-200 rounded-lg bg-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center font-semibold text-lg">Login</h2>

      {error && "data" in error && (
        <p className="text-red-600 text-center text-sm">
          {(error.data as any)?.message ?? "Invalid name or password"}
        </p>
      )}

      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field, fieldState }) => (
          <InputField
            label="Name"
            type="text"
            placeholder="Enter your name"
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
            placeholder="Enter your password"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="py-2.5 px-4 bg-blue-600 text-white rounded-md text-base cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
