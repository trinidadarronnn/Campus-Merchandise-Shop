import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useBasket } from "../../../context/BasketContext";

export const products = [
  {
    id: "con-1",
    name: "CON Department T-Shirt",
    price: "₱390.00",
    image: require("../../../../assets/ShopProducts/_con/con-shirt.jpg"),
  },
  {
    id: "con-2",
    name: "CON Department ID Lace/Lanyard",
    price: "₱85.00",
    image: require("../../../../assets/ShopProducts/_con/con-lace.jpg"),
  },
];

const ConShop = () => {
  const { addToBasket, notification } = useBasket();

  return (
    <View style={styles.container}>
      {notification !== "" && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      )}

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.productImage} />

            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.price}>{item.price}</Text>

            <Pressable style={styles.button} onPress={() => addToBasket(item)}>
              <Text style={styles.buttonText}>Add to Basket</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default ConShop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  notification: {
    backgroundColor: "#436443",
    padding: 12,
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 8,
  },

  notificationText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  list: {
    padding: 8,
  },

  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    overflow: "hidden",
    padding: 8,
  },

  productImage: {
    width: "100%",
    height: 180,
    borderRadius: 6,
    resizeMode: "contain",
  },

  name: {
    fontWeight: "bold",
    marginTop: 6,
  },

  price: {
    color: "#555",
    marginTop: 4,
  },

  button: {
    backgroundColor: "#436443",
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
