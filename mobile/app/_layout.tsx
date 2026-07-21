import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import ReduxProvider from "@/components/redux-provider";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useGetProfileQuery } from "@/redux/api/auth";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ReduxProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="admin" options={{ headerShown: false }} />
          <Stack.Screen
            name="login"
            options={{ title: "Login", headerBackTitle: "Back" }}
          />
          <Stack.Screen
            name="signup"
            options={{ title: "Sign Up", headerBackTitle: "Back" }}
          />
          <Stack.Screen
            name="room/[id]"
            options={{ title: "Room Detail", headerBackTitle: "Back" }}
          />
          <Stack.Screen
            name="about"
            options={{ title: "About Us", headerBackTitle: "Back" }}
          />
          <Stack.Screen
            name="help"
            options={{ title: "Help Center", headerBackTitle: "Back" }}
          />
          <Stack.Screen
            name="profile"
            options={{ title: "Profile", headerBackTitle: "Back" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ReduxProvider>
  );
}
