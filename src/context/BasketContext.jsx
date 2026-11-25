import { createContext, useContext, useState } from "react";

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basketItems, setBasketItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState("");

  // Add product to basket
  const addToBasket = (product) => {
    setNotification(`${product.name} added to basket!`);

    setBasketItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...currentItems, { ...product, qty: 1 }];
    });

    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  // Increase product quantity
  const increaseQuantity = (id) => {
    setBasketItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  // Decrease product quantity
  const decreaseQuantity = (id) => {
    setBasketItems((currentItems) =>
      currentItems
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  // Remove product from basket
  const removeFromBasket = (id) => {
    setBasketItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  };

  // Checkout selected products
  const checkoutItems = (selectedIds) => {
    const itemsToCheckout = basketItems.filter((item) =>
      selectedIds.includes(item.id),
    );

    if (itemsToCheckout.length === 0) {
      return null;
    }

    const total = itemsToCheckout.reduce((sum, item) => {
      const price = Number(String(item.price).replace(/[₱,\s]/g, ""));

      return sum + (Number.isNaN(price) ? 0 : price) * item.qty;
    }, 0);

    const newOrder = {
      id: Date.now().toString(),
      items: itemsToCheckout,
      total,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setOrders((currentOrders) => [newOrder, ...currentOrders]);

    // Remove only checked-out products
    setBasketItems((currentItems) =>
      currentItems.filter((item) => !selectedIds.includes(item.id)),
    );

    return newOrder;
  };

  return (
    <BasketContext.Provider
      value={{
        basketItems,
        addToBasket,
        notification,
        increaseQuantity,
        decreaseQuantity,
        removeFromBasket,
        orders,
        checkoutItems,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

// Access basket context
export function useBasket() {
  return useContext(BasketContext);
}
