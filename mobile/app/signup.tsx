import { useState } from "react";
import { StyleSheet, TextInput, Pressable, View } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { EyeIcon, EyeOffIcon } from "@/components/svg";

export default function SignupScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Create Account
      </ThemedText>

      <ThemedView style={styles.form}>
        <TextInput
          placeholder="Name"
          placeholderTextColor={colors.icon}
          style={[
            styles.input,
            {
              color: colors.text,
              backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7",
            },
          ]}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor={colors.icon}
          style={[
            styles.input,
            {
              color: colors.text,
              backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7",
            },
          ]}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <View>
          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.icon}
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7",
              },
            ]}
            secureTextEntry={!showPassword}
          />
          <Pressable
            style={styles.eyeIcon}
            onPress={() => setShowPassword((v) => !v)}
          >
            <ThemedText lightColor={colors.icon} darkColor={colors.icon}>
              {showPassword ? <EyeOffIcon size={22} color={colors.icon} /> : <EyeIcon size={22} color={colors.icon} />}
            </ThemedText>
          </Pressable>
        </View>

        <ThemedView style={[styles.button, { backgroundColor: colors.tint }]}>
          <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
        </ThemedView>

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
});
