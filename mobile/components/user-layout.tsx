import { StyleSheet, ScrollView, Pressable, View } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuth } from "@/hooks/use-auth";
import { sharedTabs } from "@/constants/tabs";
import { useLogoutMutation } from "@/redux/api/auth";
import { removeToken } from "@/util/token";
import { clearUser } from "@/redux/features/user";
import { useDispatch } from "react-redux";

export default function UserLayout() {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];
  useAuth();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handlePress = async (tab: (typeof sharedTabs)[0]["tabs"][0]) => {
    if (tab.label === "Sign out") {
      try {
        await logout().unwrap();
      } catch {
        // ignore
      }
      await removeToken();
      dispatch(clearUser());
      router.replace("/login");
      return;
    }
    if (tab.path) router.push(tab.path as never);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedText type="title" style={styles.title}>
          Profile
        </ThemedText>

        {sharedTabs.map((section) => (
          <View key={section.category} style={styles.section}>
            <ThemedText style={styles.categoryLabel}>
              {section.category}
            </ThemedText>

            {section.tabs.map((tab) => (
              <Pressable
                key={tab.label}
                style={[
                  styles.tabRow,
                  {
                    backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7",
                  },
                ]}
                onPress={() => handlePress(tab)}
              >
                <View style={styles.tabLeft}>
                  <View style={[styles.iconBox]}>
                    <tab.icon size={22} color={colors.tint} />
                  </View>
                  <ThemedText type="defaultSemiBold">{tab.label}</ThemedText>
                </View>
              </Pressable>
            ))}
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  title: { marginBottom: 24 },
  section: { marginBottom: 28 },
  categoryLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.4,
    marginBottom: 10,
    marginLeft: 4,
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  tabLeft: { flexDirection: "row", alignItems: "center" },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
