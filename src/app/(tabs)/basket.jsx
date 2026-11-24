import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useBasket } from "../../context/BasketContext";

export default function Basket() {
  const {
    basketItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromBasket,
    checkoutItems,
  } = useBasket();

  const [selectedItems, setSelectedItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const selectItem = (id) => {
    setSelectedItems((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  };

  const selectedProducts = basketItems.filter((item) =>
    selectedItems.includes(item.id),
  );

  const selectedTotal = selectedProducts.reduce((total, item) => {
    const price = Number(String(item.price).replace(/[₱,\s]/g, ""));
    return total + (Number.isNaN(price) ? 0 : price) * item.qty;
  }, 0);

  const removeSelected = () => {
    selectedItems.forEach((id) => removeFromBasket(id));
    setSelectedItems([]);
  };

  const confirmCheckout = () => {
    if (selectedProducts.length === 0) return;

    const newOrder = checkoutItems(selectedItems);

    if (newOrder) {
      setSelectedItems([]);
      setShowConfirmation(false);
      setShowSuccess(true);
    }
  };

  return (
    <View style={styles.screen}>
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

            {selectedProducts.length > 0 && (
              <View style={styles.summary}>
                <Text style={styles.summaryTitle}>Order Summary</Text>

                <Text style={styles.summaryText}>
                  Selected Products: {selectedProducts.length}
                </Text>

                <Text style={styles.total}>
                  Total: ₱{selectedTotal.toFixed(2)}
                </Text>

                <Pressable
                  style={styles.checkoutButton}
                  onPress={() => setShowConfirmation(true)}
                >
                  <Text style={styles.checkoutButtonText}>Checkout</Text>
                </Pressable>

                <Pressable style={styles.removeButton} onPress={removeSelected}>
                  <Text style={styles.removeButtonText}>Remove Selected</Text>
                </Pressable>
              </View>
            )}
          </>
        )}
      </ScrollView>

      <Modal
        visible={showConfirmation}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Checkout</Text>

            <Text style={styles.modalText}>
              You selected {selectedProducts.length} product(s).
            </Text>

            <Text style={styles.modalTotal}>
              Total: ₱{selectedTotal.toFixed(2)}
            </Text>

            <Text style={styles.modalText}>Do you want to continue?</Text>

            <Pressable style={styles.checkoutButton} onPress={confirmCheckout}>
              <Text style={styles.checkoutButtonText}>Continue</Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={() => setShowConfirmation(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Checkout Successful!</Text>

            <Text style={styles.modalText}>
              Your selected products have been placed in Orders.
            </Text>

            <Pressable
              style={styles.checkoutButton}
              onPress={() => setShowSuccess(false)}
            >
              <Text style={styles.checkoutButtonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    padding: 16,
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
    borderColor: "#000",
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
  summary: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    color: "#555",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  checkoutButton: {
    backgroundColor: "#436443",
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 16,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  removeButton: {
    backgroundColor: "#777",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 22,
    alignItems: "stretch",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
    textAlign: "center",
  },
  modalText: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 8,
  },
  modalTotal: {
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  cancelButton: {
    backgroundColor: "#777",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
