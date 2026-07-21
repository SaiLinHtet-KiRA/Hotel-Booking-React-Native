import { StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HelpContent() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>Help Center</ThemedText>

        <ThemedText type="defaultSemiBold" style={styles.heading}>Frequently Asked Questions</ThemedText>

        <ThemedText type="defaultSemiBold">How do I book a room?</ThemedText>
        <ThemedText style={styles.body}>
          Browse available rooms on the Home tab, select your desired room, choose your check-in and check-out dates, and tap "Book Now".
        </ThemedText>

        <ThemedText type="defaultSemiBold">How do I cancel a booking?</ThemedText>
        <ThemedText style={styles.body}>
          Go to the Bookings tab to view your bookings. Select a booking and choose "Cancel" to cancel it. Cancellations are subject to our policy.
        </ThemedText>

        <ThemedText type="defaultSemiBold">How do I update my profile?</ThemedText>
        <ThemedText style={styles.body}>
          Navigate to the Profile section from the More tab. You can update your name, email, and password there.
        </ThemedText>

        <ThemedText type="defaultSemiBold">What payment methods are accepted?</ThemedText>
        <ThemedText style={styles.body}>
          We accept all major credit cards, debit cards, and cash payments at the front desk. Online payment options are coming soon.
        </ThemedText>

        <ThemedText type="defaultSemiBold" style={styles.heading}>Need More Help?</ThemedText>
        <ThemedText style={styles.body}>
          Our support team is available 24/7.{"\n"}
          Email: support@hopehotel.com{"\n"}
          Phone: +1 (555) 987-6543
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 10, paddingBottom: 40 },
  title: { marginBottom: 8 },
  heading: { marginTop: 12, marginBottom: 4 },
  body: { fontSize: 14, lineHeight: 22, opacity: 0.7 },
});
