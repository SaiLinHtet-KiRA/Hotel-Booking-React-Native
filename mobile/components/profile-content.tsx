import { useState } from "react";
import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { useUpdateUserMutation } from "@/redux/api/user";
import { clearUser } from "@/redux/features/user";
import { authApiSlice } from "@/redux/api/auth";

type ProfileForm = {
  name: string;
  password: string;
};

export default function ProfileContent() {
  const user = useAppSelector((state) => state.user);
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useAppDispatch();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const { control, handleSubmit } = useForm<ProfileForm>({
    defaultValues: { name: user.name || "", password: "" },
  });

  const onSubmit = async (data: ProfileForm) => {
    setServerError("");
    setSuccess("");
    try {
      const body: { name?: string; password?: string } = {};
      if (data.name !== user.name) body.name = data.name;
      if (data.password) body.password = data.password;

      if (!body.name && !body.password) {
        setSuccess("No changes made");
        return;
      }

      await updateUser({ id: user._id, body }).unwrap();

      if (body.password || body.name) {
        dispatch(clearUser());
        dispatch(authApiSlice.endpoints.getProfile.initiate());
      }
      setSuccess("Profile updated");
    } catch (err: unknown) {
      const e = err as { data?: { message?: string } };
      setServerError(e?.data?.message || "Update failed");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.heading}>
        Profile
      </ThemedText>

      <ThemedView
        style={[
          styles.card,
          { backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7" },
        ]}
      >
        <View style={styles.row}>
          <ThemedText style={styles.label}>Email</ThemedText>
          <ThemedText type="defaultSemiBold">{user.email || "-"}</ThemedText>
        </View>

        <View style={styles.divider} />

        <Controller
          control={control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <View>
              <View style={styles.row}>
                <ThemedText style={styles.label}>Name</ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                      backgroundColor:
                        scheme === "dark" ? "#2C2C2E" : "#E8E8ED",
                    },
                  ]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholderTextColor={colors.icon}
                />
              </View>
              {error && (
                <ThemedText style={styles.err}>{error.message}</ThemedText>
              )}
            </View>
          )}
        />

        <View style={styles.divider} />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <View style={styles.row}>
                <ThemedText style={styles.label}>Password</ThemedText>
                <View style={styles.pwWrap}>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        color: colors.text,
                        backgroundColor:
                          scheme === "dark" ? "#2C2C2E" : "#E8E8ED",
                      },
                    ]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="New password"
                    placeholderTextColor={colors.icon}
                    secureTextEntry={false}
                  />
                </View>
              </View>
            </View>
          )}
        />
      </ThemedView>

      {serverError ? (
        <ThemedText style={styles.err}>{serverError}</ThemedText>
      ) : null}
      {success ? (
        <ThemedText style={styles.success}>{success}</ThemedText>
      ) : null}

      <Pressable
        style={[
          styles.btn,
          { backgroundColor: isLoading ? "#A7F3D0" : colors.tint },
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        <ThemedText style={styles.btnText}>
          {isLoading ? "Saving..." : "Save Changes"}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16 },
  heading: { marginBottom: 8 },
  card: { borderRadius: 14, padding: 16, gap: 12 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontSize: 15, opacity: 0.6 },
  input: {
    fontSize: 15,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 140,
    textAlign: "right",
  },
  pwWrap: { position: "relative" },
  eye: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(128,128,128,0.2)",
  },
  btn: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  err: { color: "#EF4444", fontSize: 13, textAlign: "center" },
  success: { color: "#059669", fontSize: 13, textAlign: "center" },
});
