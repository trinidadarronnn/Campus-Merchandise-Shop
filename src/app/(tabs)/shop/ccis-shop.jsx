import {
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useBasket } from "../../../context/BasketContext";

export const products = [
  {
    id: "ccis-1",
    name: "Lexier 1:24 Scale Figurine",
    price: "₱25,000.09",
    image: require("../../../../assets/ShopProducts/_ccis/lexier.jpg"),
  },

  {
    id: "ccis-2",
    name: "CCIS Computer Lab Chair",
    price: "₱500.46",
    image: require("../../../../assets/ShopProducts/_ccis/LabChair.webp"),
  },

  {
    id: "ccis-3",
    name: "CCIS Department T-Shirt",
    price: "₱350.00",
    image: require("../../../../assets/ShopProducts/_ccis/ccis-shirt.jpg"),
  },

  {
    id: "ccis-4",
    name: "CCIS Department ID Lace/Lanyard",
    price: "₱75.00",
    image: require("../../../../assets/ShopProducts/_ccis/ccis-lace.jpg"),
  },
];

