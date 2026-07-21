import { useEffect } from "react";
import { router } from "expo-router";
import { useAppSelector } from "@/redux/store";

export function useAuth() {
  const user = useAppSelector((state) => state.user);
  const isAuthenticated = !!user._id;

  useEffect(() => {
    if (!user._id) {
      router.replace("/login");
    }
  }, [user._id]);

  return { isAuthenticated, user };
}
