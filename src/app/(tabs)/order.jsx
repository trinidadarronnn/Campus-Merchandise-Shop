import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useBasket } from "../../context/BasketContext";

export default function Order() {
  // Orders placed from the Basket tab (shared through BasketContext)
  const { orders } = useBasket();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Orders</Text>

      <Text style={styles.sectionTitle}>Past Orders</Text>

      {orders.length === 0 ? (
        <Text style={styles.emptyText}>
          No orders yet. Check out items from your basket and they will show up
          here.
        </Text>
      ) : (
        orders.map((order) => (
          <View key={order.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderLabel}>Order #{order.id.slice(-6)}</Text>
              <Text style={styles.status}>{order.status}</Text>
            </View>

            <Text style={styles.date}>
              {new Date(order.createdAt).toLocaleDateString()}
            </Text>

            {order.items.map((item) => (
              <Text key={item.id} style={styles.line}>
                {item.name} × {item.qty}
              </Text>
            ))}

            <Text style={styles.total}>Total: ₱{order.total.toFixed(2)}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#ffffff",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: "#777777",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderLabel: {
    fontSize: 15,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#b26a00",
  },
  date: {
    fontSize: 12,
    color: "#777777",
    marginTop: 2,
  },
  line: {
    fontSize: 14,
    color: "#333333",
    marginTop: 6,
  },
  total: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
  },
});