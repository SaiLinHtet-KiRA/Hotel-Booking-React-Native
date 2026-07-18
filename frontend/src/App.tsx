import { Outlet, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "./redux/api/auth";
import { useEffect } from "react";

export default function App() {
  const { data } = useGetProfileQuery();
  const router = useNavigate();
  useEffect(() => {
    if (data) router("/dashboard", { replace: true });
  }, [data]);
  return (
    <>
      <Outlet />
    </>
  );
}
