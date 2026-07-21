import { StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function AboutContent() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>About Us</ThemedText>

        <ThemedText type="defaultSemiBold" style={styles.heading}>Welcome to Hope Hotel</ThemedText>
        <ThemedText style={styles.body}>
          We are dedicated to providing exceptional hospitality experiences for every guest. Located in the heart of the city, our hotel combines comfort, style, and personalized service to make your stay unforgettable.
        </ThemedText>

        <ThemedText type="defaultSemiBold" style={styles.heading}>Our Mission</ThemedText>
        <ThemedText style={styles.body}>
          To create a home away from home where every guest feels valued, comfortable, and cared for. We believe in attention to detail, warm hospitality, and creating lasting memories.
        </ThemedText>

        <ThemedText type="defaultSemiBold" style={styles.heading}>Our Rooms</ThemedText>
        <ThemedText style={styles.body}>
          From cozy single beds to luxurious suites, each room is thoughtfully designed with modern amenities, premium bedding, and elegant decor to ensure a restful stay.
        </ThemedText>

        <ThemedText type="defaultSemiBold" style={styles.heading}>Contact Us</ThemedText>
        <ThemedText style={styles.body}>
          Email: contact@hopehotel.com{"\n"}
          Phone: +1 (555) 123-4567{"\n"}
          Address: 123 Hospitality Lane, Cityville
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 12, paddingBottom: 40 },
  title: { marginBottom: 8 },
  heading: { marginTop: 8 },
  body: { fontSize: 15, lineHeight: 24, opacity: 0.7 },
});
