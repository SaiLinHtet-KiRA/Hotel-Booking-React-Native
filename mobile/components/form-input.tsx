import { StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

type Props = {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  keyboardType?: "numeric" | "default";
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
};

export default function FormInput({
  label,
  icon,
  placeholder,
  keyboardType = "default",
  error,
  value,
  onChangeText,
  onBlur,
}: Props) {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];
  const bg = scheme === "dark" ? "#1C1C1E" : "#F2F2F7";

  return (
    <>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View style={[styles.row, { backgroundColor: bg }, error && styles.rowError]}>
        {icon}
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.icon}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
        />
      </View>
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: "600" },
  row: {
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowError: { borderColor: "#EF4444", borderWidth: 1 },
  input: { flex: 1, fontSize: 16 },
  error: { color: "#EF4444", fontSize: 12, marginLeft: 4 },
});
