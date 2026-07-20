import { useState } from "react";
import { StyleSheet, Pressable, ScrollView, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { ImageIcon } from "@/components/svg/FormIcons";

type Props = {
  images: ImagePicker.ImagePickerAsset[];
  onAdd: (assets: ImagePicker.ImagePickerAsset[]) => void;
  onRemove: (uri: string) => void;
};

export default function ImagePickerSection({ images, onAdd, onRemove }: Props) {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? "light"];
  const bg = scheme === "dark" ? "#1C1C1E" : "#F2F2F7";

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.canceled) onAdd(result.assets);
  };

  return (
    <>
      <ThemedText style={styles.label}>Photos</ThemedText>

      {images.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
          {images.map((img) => (
            <Pressable key={img.uri} style={[styles.card, { backgroundColor: bg }]}>
              <Image source={{ uri: img.uri }} style={styles.preview} />
              <Pressable style={styles.remove} onPress={() => onRemove(img.uri)}>
                <ThemedText style={styles.removeText}>✕</ThemedText>
              </Pressable>
            </Pressable>
          ))}
        </ScrollView>
      )}

      <Pressable style={[styles.addBtn, { backgroundColor: bg }]} onPress={pickImages}>
        <ImageIcon color={colors.icon} />
        <ThemedText style={{ color: colors.icon }}>Add Photos</ThemedText>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: "600" },
  row: { marginBottom: 10 },
  card: {
    width: 160,
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 10,
  },
  preview: { width: "100%", height: "100%", backgroundColor: "#000" },
  remove: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  removeText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  addBtn: {
    height: 120,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderStyle: "dashed",
    borderWidth: 1.5,
    borderColor: "rgba(128,128,128,0.3)",
  },
});
