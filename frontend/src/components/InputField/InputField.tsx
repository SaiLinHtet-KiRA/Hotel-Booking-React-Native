interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function InputField({
  label,
  error,
  ...inputProps
}: InputFieldProps) {
  return (
    <label className="flex flex-col gap-1 font-medium text-sm">
      {label}
      <input
        className="px-3 py-2 border border-slate-300 rounded-md text-sm font-normal"
        {...inputProps}
      />
      {error && (
        <p className="text-red-600 text-xs font-normal">{error}</p>
      )}
    </label>
  );
}
