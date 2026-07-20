import { useState } from "react";
import { StyleSheet, Pressable, View, Dimensions } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

type Props<T extends string> = {
  label: string;
  icon: React.ReactNode;
  options: T[];
  value: T | null;
  error?: string;
  onChange: (value: T) => void;
};

export default function FormPicker<T extends string>({
  label,
  icon,
  options,
  value,
  error,
  onChange,
}: Props<T>) {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];
  const [open, setOpen] = useState(false);

  const bg = scheme === "dark" ? "#1C1C1E" : "#F2F2F7";

  return (
    <View style={open && styles.openWrap}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View style={[styles.wrapper, open && styles.wrapperOpen]}>
        <Pressable
          style={[styles.row, { backgroundColor: bg }, error && styles.rowError, open && styles.rowOnTop]}
          onPress={() => setOpen(!open)}
        >
          {icon}
          <ThemedText style={[styles.text, !value && { color: colors.icon }, !!value && { color: colors.text }]}>
            {value ?? label}
          </ThemedText>
          <ThemedText style={styles.chevron}>{"\u25BE"}</ThemedText>
        </Pressable>
        {open && (
          <>
            <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
            <View style={[styles.dropdown, { backgroundColor: scheme === "dark" ? "#2C2C2E" : "#fff" }]}>
              {options.map((opt) => (
                <Pressable
                  key={opt}
                  style={[styles.item, value === opt && { backgroundColor: scheme === "dark" ? "#3A3A3C" : "#E8F0FE" }]}
                  onPress={() => { onChange(opt); setOpen(false); }}
                >
                  <ThemedText>{opt}</ThemedText>
                  {value === opt && <ThemedText style={{ color: colors.tint }}>✓</ThemedText>}
                </Pressable>
              ))}
            </View>
          </>
        )}
      </View>
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
}

const W = Dimensions.get("window").width;
const H = Dimensions.get("window").height;

const styles = StyleSheet.create({
  openWrap: { overflow: "visible" as const },
  label: { fontSize: 14, fontWeight: "600" },
  wrapper: { position: "relative", zIndex: 1 },
  wrapperOpen: { zIndex: 999 },
  row: {
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowOnTop: { position: "relative", zIndex: 1000 },
  rowError: { borderColor: "#EF4444", borderWidth: 1 },
  text: { flex: 1, fontSize: 14 },
  chevron: { fontSize: 12, opacity: 0.4 },
  error: { color: "#EF4444", fontSize: 12, marginLeft: 4 },
  backdrop: {
    position: "absolute",
    top: "100%",
    left: -W,
    width: W * 3,
    height: H * 3,
    zIndex: 998,
    backgroundColor: "transparent",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 4,
    zIndex: 999,
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});
