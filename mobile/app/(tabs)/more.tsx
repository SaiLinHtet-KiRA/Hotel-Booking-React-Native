import { StyleSheet } from "react-native";
import AdminLayout from "@/components/admin-layout";
import UserLayout from "@/components/user-layout";
import { useAppSelector } from "@/redux/store";

export default function MoreScreen() {
  const user = useAppSelector((state) => state.user);

  if (user?.role === "admin") {
    return <AdminLayout />;
  }

  return <UserLayout />;
}

const styles = StyleSheet.create({});
