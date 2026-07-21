import { useState } from "react";
import { StyleSheet, TextInput, Pressable, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { EyeIcon, EyeOffIcon } from "@/components/svg";
import { useSignupMutation } from "@/redux/api/auth";

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export default function SignupScreen() {
  const [signup, { isLoading, error }] = useSignupMutation();
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<SignupForm>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      await signup(data).unwrap();
      router.back();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Create Account
      </ThemedText>

      <ThemedView style={styles.form}>
        <Controller
          control={control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error: fieldError },
          }) => (
            <View>
              <TextInput
                placeholder="Name"
                placeholderTextColor={colors.icon}
                style={[
                  styles.input,
                  {
                    color: colors.text,
                    backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7",
                    borderColor: fieldError ? "#EF4444" : "transparent",
                    borderWidth: fieldError ? 1 : 0,
                  },
                ]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
              {fieldError && (
                <ThemedText style={styles.error}>{fieldError.message}</ThemedText>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error: fieldError },
          }) => (
            <View>
              <TextInput
                placeholder="Email"
                placeholderTextColor={colors.icon}
                style={[
                  styles.input,
                  {
                    color: colors.text,
                    backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7",
                    borderColor: fieldError ? "#EF4444" : "transparent",
                    borderWidth: fieldError ? 1 : 0,
                  },
                ]}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
              {fieldError && (
                <ThemedText style={styles.error}>{fieldError.message}</ThemedText>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: { value: 8, message: "Min 8 characters" },
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error: fieldError },
          }) => (
            <View>
              <View>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={colors.icon}
                  style={[
                    styles.input,
                    {
                      color: colors.text,
                      backgroundColor:
                        scheme === "dark" ? "#1C1C1E" : "#F2F2F7",
                      borderColor: fieldError ? "#EF4444" : "transparent",
                      borderWidth: fieldError ? 1 : 0,
                    },
                  ]}
                  secureTextEntry={!showPassword}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                <Pressable
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <EyeOffIcon size={22} color={colors.icon} />
                  ) : (
                    <EyeIcon size={22} color={colors.icon} />
                  )}
                </Pressable>
              </View>
              {fieldError && (
                <ThemedText style={styles.error}>{fieldError.message}</ThemedText>
              )}
            </View>
          )}
        />

        {error && (
          <ThemedText style={styles.error}>
            {(error as { data?: { message?: string } }).data?.message ||
              "Signup failed"}
          </ThemedText>
        )}

        <Pressable
          style={[
            styles.button,
            { backgroundColor: isLoading ? "#A7F3D0" : colors.tint },
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <ThemedText style={styles.buttonText}>
            {isLoading ? "Creating account..." : "Sign Up"}
          </ThemedText>
        </Pressable>

        <View style={styles.loginRow}>
          <ThemedText>Already have an account? </ThemedText>
          <Pressable onPress={() => router.back()}>
            <ThemedText
              lightColor={Colors.light.tint}
              darkColor={Colors.dark.tint}
              style={styles.loginLink}
            >
              Log in
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "500",
  },
  eyeIcon: {
    position: "absolute",
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  error: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
