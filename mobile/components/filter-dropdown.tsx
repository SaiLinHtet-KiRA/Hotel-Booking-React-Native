import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

type Props<T extends string> = {
  label: string;
  options: T[];
  selected: T | null;
  visible: boolean;
  onOpen: () => void;
  onSelect: (value: T | null) => void;
  onClose: () => void;
};

export default function FilterDropdown<T extends string>({
  label,
  options,
  selected,
  visible,
  onOpen,
  onSelect,
  onClose,
}: Props<T>) {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];

  return (
    <View style={[styles.wrapper, visible && styles.wrapperOpen]}>
      <Pressable
        style={[
          styles.btn,
          {
            backgroundColor: scheme === "dark" ? "#1C1C1E" : "#F2F2F7",
            borderColor: selected ? colors.tint : "transparent",
          },
        ]}
        onPress={visible ? onClose : onOpen}
      >
        <View style={styles.btnRow}>
          <ThemedText style={styles.btnText}>
            {selected ?? label}
          </ThemedText>
          <ThemedText style={styles.arrow}>{"\u25BE"}</ThemedText>
        </View>
      </Pressable>

      {visible && (
        <View
          style={[
            styles.dropdown,
            { backgroundColor: scheme === "dark" ? "#2C2C2E" : "#fff" },
          ]}
        >
          <Pressable
            style={[
              styles.item,
              !selected && {
                backgroundColor: scheme === "dark" ? "#3A3A3C" : "#E8F0FE",
              },
            ]}
            onPress={() => onSelect(null)}
          >
            <ThemedText type="defaultSemiBold">All</ThemedText>
            {!selected && (
              <ThemedText style={{ color: colors.tint }}>✓</ThemedText>
            )}
          </Pressable>
          {options.map((opt) => (
            <Pressable
              key={opt}
              style={[
                styles.item,
                selected === opt && {
                  backgroundColor: scheme === "dark" ? "#3A3A3C" : "#E8F0FE",
                },
              ]}
              onPress={() => onSelect(selected === opt ? null : opt)}
            >
              <ThemedText>{opt}</ThemedText>
              {selected === opt && (
                <ThemedText style={{ color: colors.tint }}>✓</ThemedText>
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: "relative", zIndex: 1 },
  wrapperOpen: { zIndex: 999 },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  btnText: { fontSize: 13 },
  btnRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  arrow: { fontSize: 10, opacity: 0.5 },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: 4,
    minWidth: 180,
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

