import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/auth";

export default function LogoutButton() {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/", { replace: true });
    } catch {
      navigate("/", { replace: true });
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full px-3 py-2.5 rounded-md text-sm text-left text-slate-300 bg-red-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
