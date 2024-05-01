import { View, Text, Image, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export default function ({ item }) {
  
  function eArabic(x) {
    return parseInt(x).toLocaleString("en-ES");
  }

  return (
    <View style={{ width: width * 0.5, padding: 10 }}>
      <View style={styles.containerItem}>
        <Image source={{ uri: item.imgProduct }} style={styles.itemImage} />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemName}>
          {item.nameProduct}
        </Text>
        <View>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text style={styles.itemPrice}>₫{eArabic(item.price)}</Text>
            <Text style={styles.itemSold}>Sold {item.sold}</Text>
          </View>
          <Text style={styles.itemSold}>Rate {item.rate}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  itemImage: {
    height: 200,
    width: "auto",
    resizeMode: "contain",
    marginTop: 4,
  },
  itemName: {
    fontSize: 15,
    color: "#333",
    fontWeight: "600",
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 6,
    marginRight: 20,
  },
  itemPrice: {
    fontWeight: "500",
    color: "red",
    marginLeft: 6,
    marginRight: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  itemSold: {
    fontWeight: "600",
    fontSize: 12,
    color: "#333",
    marginRight: 6,
    marginLeft: 6,
    marginTop: 3,
    marginBottom: 10,
  },
  containerItem: {
    backgroundColor: "white",
    borderRadius: 5,
  },
});
