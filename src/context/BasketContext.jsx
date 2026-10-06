import { createContext, useContext, useState } from "react";

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basketItems, setBasketItems] = useState([]);

  const [notification, setNotification] = useState("");

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

  const increaseQuantity = (id) => {
    setBasketItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setBasketItems((currentItems) =>
      currentItems
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeFromBasket = (id) => {
    setBasketItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
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
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  return useContext(BasketContext);
}
