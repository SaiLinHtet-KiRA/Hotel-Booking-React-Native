import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Dashborad() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
}
