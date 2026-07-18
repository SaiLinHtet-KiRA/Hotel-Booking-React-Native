import { Outlet, useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useAppSelector } from "./redux/store";
import { useGetProfileQuery } from "./redux/api/auth";

export default function App() {
  useGetProfileQuery();
  const user = useAppSelector(({ user }) => user);
  const router = useNavigate();
  useLayoutEffect(() => {
    if (user.name) router("/dashboard", { replace: true });
    else router("/", { replace: true });
  }, [user]);
  return (
    <>
      <Outlet />
    </>
  );
}
