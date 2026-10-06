import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { products as catProducts } from "./cat-shop";
import { products as ccisProducts } from "./ccis-shop";
import { products as ccjsProducts } from "./ccjs-shop";
import { products as ceaProducts } from "./cea-shop";
import { products as coedProducts } from "./coed-shop";
import { products as comProducts } from "./com-shop";
import { products as conProducts } from "./con-shop";

const departments = [
  {
    name: "CAT",
    href: "/shop/cat-shop",
    image: require("../../../../assets/DepartMent-Logo/Cat.jpeg"),
  },
  {
    name: "CCIS",
    href: "/shop/ccis-shop",
    image: require("../../../../assets/DepartMent-Logo/Ccis.jpeg"),
  },
  {
    name: "CCJS",
    href: "/shop/ccjs-shop",
    image: require("../../../../assets/DepartMent-Logo/Ccjs.jpeg"),
  },
  {
    name: "CEA",
    href: "/shop/cea-shop",
    image: require("../../../../assets/DepartMent-Logo/Cea.jpeg"),
  },
  {
    name: "COED",
    href: "/shop/coed-shop",
    image: require("../../../../assets/DepartMent-Logo/Coed.jpeg"),
  },
  {
    name: "COM",
    href: "/shop/com-shop",
    image: require("../../../../assets/DepartMent-Logo/Com.jpeg"),
  },
  {
    name: "CON",
    href: "/shop/con-shop",
    image: require("../../../../assets/DepartMent-Logo/coll-of-nurse.jpeg"),
  },
];

const allProducts = [
  ...catProducts.map((product) => ({
    ...product,
    department: "CAT",
    href: "/shop/cat-shop",
  })),

  ...ccisProducts.map((product) => ({
    ...product,
    department: "CCIS",
    href: "/shop/ccis-shop",
  })),

  ...ccjsProducts.map((product) => ({
    ...product,
    department: "CCJS",
    href: "/shop/ccjs-shop",
  })),

  ...ceaProducts.map((product) => ({
    ...product,
    department: "CEA",
    href: "/shop/cea-shop",
  })),

  ...coedProducts.map((product) => ({
    ...product,
    department: "COED",
    href: "/shop/coed-shop",
  })),

  ...comProducts.map((product) => ({
    ...product,
    department: "COM",
    href: "/shop/com-shop",
  })),

  ...conProducts.map((product) => ({
    ...product,
    department: "CON",
    href: "/shop/con-shop",
  })),
];

export default function Shop() {
  const { width } = useWindowDimensions();
  const itemWidth = (width - 32) / 2;

  const [searchText, setSearchText] = useState("");

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Shop</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Products..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />

      {searchText.length > 0 && (
        <View style={styles.searchResults}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Pressable
                key={product.id}
                style={styles.resultItem}
                onPress={() => router.push(product.href)}
              >
                <Text style={styles.resultName}>{product.name}</Text>

                <Text style={styles.resultDepartment}>
                  {product.department} • {product.price}
                </Text>
              </Pressable>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsTitle}>Product not available</Text>

              <Text style={styles.noResults}>
                We couldn't find a product matching "{searchText}".
              </Text>
            </View>
          )}
        </View>
      )}

      <FlatList
        data={departments}
        numColumns={2}
        keyExtractor={(item) => item.href}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.container, { width: itemWidth }]}
            onPress={() => router.push(item.href)}
          >
            <Image source={item.image} style={styles.image} />

            <View style={styles.labelCont}>
              <Text style={styles.label}>{item.name}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 10,
  },

  searchInput: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    fontSize: 15,
    backgroundColor: "#fff",
  },

  searchResults: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },

  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  resultName: {
    fontWeight: "bold",
    fontSize: 14,
  },

  resultDepartment: {
    color: "#777",
    fontSize: 12,
    marginTop: 3,
  },

  noResultsContainer: {
    padding: 14,
  },

  noResultsTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#333",
  },

  noResults: {
    color: "#777",
    marginTop: 4,
    fontSize: 13,
  },

  list: {
    paddingBottom: 10,
  },

  container: {
    margin: 8,
    backgroundColor: "#eee",
    elevation: 2,
    height: 250,
    overflow: "hidden",
    borderRadius: 8,
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  labelCont: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: "rgba(0,128,0,0.6)",
  },

  label: {
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
  },
});
