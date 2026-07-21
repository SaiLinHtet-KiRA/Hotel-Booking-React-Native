import { useState } from "react";
import { StyleSheet, TextInput, Pressable, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { EyeIcon, EyeOffIcon } from "@/components/svg";
import { useCreateUserMutation } from "@/redux/api/user";

type CreateUserForm = {
  name: string;
  email: string;
  password: string;
};

export default function CreateUserScreen() {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<CreateUserForm>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: CreateUserForm) => {
    try {
      await createUser({ ...data, role: "admin" }).unwrap();
      router.back();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Create Admin
      </ThemedText>

      <ThemedView style={styles.form}>
        <Controller
          control={control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <View>
              <TextInput
                placeholder="Name"
                placeholderTextColor={colors.icon}
                style={[styles.input, { color: colors.text, backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7", borderColor: error ? "#EF4444" : "transparent", borderWidth: error ? 1 : 0 }]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
              {error && <ThemedText style={styles.err}>{error.message}</ThemedText>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } }}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <View>
              <TextInput
                placeholder="Email"
                placeholderTextColor={colors.icon}
                style={[styles.input, { color: colors.text, backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7", borderColor: error ? "#EF4444" : "transparent", borderWidth: error ? 1 : 0 }]}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
              {error && <ThemedText style={styles.err}>{error.message}</ThemedText>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required", minLength: { value: 8, message: "Min 8 characters" } }}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <View>
              <View>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={colors.icon}
                  style={[styles.input, { color: colors.text, backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7", borderColor: error ? "#EF4444" : "transparent", borderWidth: error ? 1 : 0 }]}
                  secureTextEntry={!showPassword}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                <Pressable style={styles.eye} onPress={() => setShowPassword((v) => !v)}>
                  {showPassword ? <EyeOffIcon size={22} color={colors.icon} /> : <EyeIcon size={22} color={colors.icon} />}
                </Pressable>
              </View>
              {error && <ThemedText style={styles.err}>{error.message}</ThemedText>}
            </View>
          )}
        />

        <Pressable
          style={[styles.btn, { backgroundColor: isLoading ? "#A7F3D0" : colors.tint }]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <ThemedText style={styles.btnText}>{isLoading ? "Creating..." : "Create Admin"}</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20, paddingHorizontal: 24 },
  title: { marginBottom: 24 },
  form: { gap: 16 },
  input: { height: 50, borderRadius: 12, paddingHorizontal: 16, fontSize: 16 },
  btn: { height: 50, borderRadius: 12, alignItems: "center", justifyContent: "center", marginTop: 8 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  eye: { position: "absolute", right: 14, top: 0, bottom: 0, justifyContent: "center" },
  err: { color: "#EF4444", fontSize: 12, marginTop: 4, marginLeft: 4 },
});
