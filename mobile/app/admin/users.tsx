import { useState, useEffect } from "react";
import { StyleSheet, Pressable, FlatList, View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useGetUsersQuery } from "@/redux/api/user";
import UserCard from "@/components/user-card";
import type User from "@/interface/User";

const LIMIT = 10;

export default function UsersScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching } = useGetUsersQuery(
    { page, limit: LIMIT },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (!data) return;
    const newUsers = data.data;
    setUsers((prev) => (page === 0 ? newUsers : [...prev, ...newUsers]));
    setTotalCount(data.size);
  }, [data]);

  useEffect(() => {
    setHasMore(users.length < totalCount);
  }, [users, totalCount]);

  const handleEndReached = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.topBar}>
        <Pressable
          style={[styles.createBtn, { backgroundColor: colors.tint }]}
          onPress={() => router.push("/admin/create-user")}
        >
          <ThemedText style={styles.createBtnText}>+ Create</ThemedText>
        </Pressable>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        renderItem={({ item }: { item: User }) => <UserCard user={item} />}
        ListEmptyComponent={
          <ThemedText style={styles.empty}>No users found</ThemedText>
        }
        ListFooterComponent={
          isFetching ? <ActivityIndicator style={styles.loader} /> : null
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  createBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  createBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  list: { paddingHorizontal: 20, paddingBottom: 20, gap: 10 },
  empty: { textAlign: "center", marginTop: 40, opacity: 0.5 },
  loader: { paddingVertical: 20 },
});
