import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useBasket } from "../../../context/BasketContext";

export const products = [
  {
    id: "cat-1",
    name: "CAT Department T-Shirt",
    price: "₱360.00",
    image: require("../../../../assets/ShopProducts/_cat/cat-shirt.jpg"),
  },

  {
    id: "cat-2",
    name: "CAT Department ID Lace/Lanyard",
    price: "₱75.00",
    image: require("../../../../assets/ShopProducts/_cat/cat-lace.jpg"),
  },
];

