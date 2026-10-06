import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/_nwssu.jpeg")}
        style={styles.Logoimage}
        resizeMode="cover"
      />

      <Text style={styles.title}>Campus Merch Shop</Text>

      <Text style={styles.subtitle}>
        Welcome! Browse gear from the Shop tab.
      </Text>

      <Text style={styles.subtitle}>
        Browse university shirts, lanyards, books and other essential - all in
        one place!
      </Text>

      <Pressable style={styles.shopButton} onPress={() => router.push("/shop")}>
        <Text style={styles.shopButtonText}>Browse Shop</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  Logoimage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    transform: [{ translateY: -90 }],
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 8,
    transform: [{ translateY: -70 }],
  },

  subtitle: {
    fontSize: 17,
    color: "#555555",
    textAlign: "center",
    marginBottom: 8,
    transform: [{ translateY: -70 }],
  },

  shopButton: {
    backgroundColor: "#436443",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    transform: [{ translateY: -70 }],
  },

  shopButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
