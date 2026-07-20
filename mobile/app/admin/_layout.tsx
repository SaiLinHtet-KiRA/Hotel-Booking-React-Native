import { Redirect, Stack, router } from "expo-router";
import { useAppSelector } from "@/redux/store";
import { HeaderBackButton } from "@react-navigation/elements";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export default function AdminLayout() {
  const user = useAppSelector((state) => state.user);
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];

  if (user.role !== "admin") {
    return <Redirect href="/(tabs)/more" />;
  }

  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back",
        headerLeft: () => (
          <HeaderBackButton
            tintColor={colors.icon}
            onPress={() => router.back()}
          />
        ),
      }}
    >
      <Stack.Screen name="rooms" options={{ title: "Rooms" }} />
      <Stack.Screen name="bookings" options={{ title: "Bookings" }} />
      <Stack.Screen name="users" options={{ title: "Users" }} />
      <Stack.Screen name="reviews" options={{ title: "Reviews" }} />
      <Stack.Screen name="config" options={{ title: "Config" }} />
      <Stack.Screen name="about" options={{ title: "About Us" }} />
      <Stack.Screen name="help" options={{ title: "Help Center" }} />
    </Stack>
  );
}
