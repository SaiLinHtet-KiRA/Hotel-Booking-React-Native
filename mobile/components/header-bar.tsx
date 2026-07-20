import { View, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAppSelector } from "@/redux/store";
import { useGetProfileQuery } from "@/redux/api/auth";

export default function HeaderBar() {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];
  const user = useAppSelector(({ user }) => user);
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.brand}>
        Hope
      </ThemedText>
      {!user?.role ? (
        <Pressable onPress={() => router.push("/login")}>
          <ThemedText style={[styles.login, { color: colors.tint }]}>
            Login
          </ThemedText>
        </Pressable>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  brand: {
    fontSize: 24,
  },
  login: {
    fontSize: 16,
    fontWeight: "600",
  },
});
