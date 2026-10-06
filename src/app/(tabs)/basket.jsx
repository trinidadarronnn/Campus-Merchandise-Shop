import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useBasket } from "../../context/BasketContext";

export default function Basket() {
  const { basketItems, increaseQuantity, decreaseQuantity, removeFromBasket } =
    useBasket();

  const [selectedItems, setSelectedItems] = useState([]);

  const selectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const removeSelected = () => {
    selectedItems.forEach((id) => {
      removeFromBasket(id);
    });

    setSelectedItems([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Basket</Text>

      {basketItems.length === 0 ? (
        <Text style={styles.emptyText}>Your basket is empty.</Text>
      ) : (
        <>
          {basketItems.map((item) => (
            <View key={item.id} style={styles.row}>
              <Pressable
                style={[
                  styles.checkbox,
                  selectedItems.includes(item.id) && styles.checkboxSelected,
                ]}
                onPress={() => selectItem(item.id)}
              >
                <Text style={styles.checkboxText}>
                  {selectedItems.includes(item.id) ? "✓" : ""}
                </Text>
              </Pressable>

              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>

                <Text style={styles.price}>{item.price}</Text>

                <View style={styles.quantityContainer}>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => decreaseQuantity(item.id)}
                  >
                    <Text style={styles.quantityButtonText}>−</Text>
                  </Pressable>

                  <Text style={styles.quantity}>{item.qty}</Text>

                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => increaseQuantity(item.id)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}

          {selectedItems.length > 0 && (
            <Pressable style={styles.removeButton} onPress={removeSelected}>
              <Text style={styles.removeButtonText}>Remove Selected</Text>
            </Pressable>
          )}
        </>
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

  emptyText: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginTop: 30,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#777",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  checkboxSelected: {
    backgroundColor: "#000",
    borderColor: "#f8f4f4",
  },

  checkboxText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontSize: 15,
    fontWeight: "bold",
  },

  price: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  quantityButton: {
    backgroundColor: "#436443",
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  quantityButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  quantity: {
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 14,
  },

  removeButton: {
    backgroundColor: "#436443",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
    alignItems: "center",
  },

  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
