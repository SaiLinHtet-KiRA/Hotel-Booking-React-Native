import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

type Props = {
  photos: string[];
};

export default function RoomCarousel({ photos }: Props) {
  const { width } = useWindowDimensions();
  const progress = useSharedValue(0);

  return (
    <View style={styles.wrap}>
      <Carousel
        loop={false}
        width={width}
        height={280}
        autoPlay={false}
        data={photos}
        scrollAnimationDuration={300}
        onProgressChange={progress}
        renderItem={({ item }: { item: string }) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={photos}
        size={6}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        containerStyle={styles.pagination}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "relative" },
  image: { width: "100%", height: 280, backgroundColor: "#000" },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  activeDot: {
    width: 18,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
  },
  pagination: {
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
    gap: 6,
  },
});
