import React, { useEffect, useState } from "react";
import {
  HStack,
  NativeBaseProvider,
  View,
  Divider,
  Button,
  Checkbox,
} from "native-base";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ({ item, onQuantityChange, changeProduct }) {
  var [quantity, setQuantity] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const totalPrice = quantity * item.price;
    onQuantityChange(totalPrice, item.idProduct, isChecked);
  }, [item, quantity, isChecked]);

  function eArabic(x) {
    return parseInt(x).toLocaleString("en-ES");
  }

  function decreaseNumber() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function increaseNumber() {
    setQuantity(quantity + 1);
  }

  return (
    <NativeBaseProvider>
      {console.log("renderItem")}
      <HStack margin={2}>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Checkbox
            isChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            marginX={5}
            value="1"
            aria-label="checkbox"
          />
          <Image style={styles.img} source={{ uri: item.imgProduct }} />
        </View>
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <Text ellipsizeMode="tail" numberOfLines={1}>
            {item.nameProduct}
          </Text>
          <TouchableOpacity style={styles.btnChange} onPress={changeProduct}>
            <Text style={{ fontSize: 12 }}>Phân loại {item.size} </Text>
            <MaterialIcons name="keyboard-arrow-down" />
          </TouchableOpacity>
          <Text style={{ color: "red", marginVertical: 3 }}>
            ₫{eArabic(item.price)}
          </Text>
          <View style={[styles.row, { marginTop: 10 }]}>
            <Button
              colorScheme="emerald"
              borderWidth={0.5}
              borderColor="#333"
              onPress={decreaseNumber}
            >
              <MaterialIcons name="remove" color={"#fff"} size={8} />
            </Button>
            <Text style={{ marginHorizontal: 10 }}>{quantity}</Text>
            <Button
              colorScheme="emerald"
              borderWidth={0.5}
              borderColor="#333"
              onPress={increaseNumber}
            >
              <MaterialIcons name="add" color={"#fff"} size={8} />
            </Button>
          </View>
        </View>
      </HStack>
      <Divider w="100%" marginY={5} />
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  btnChange: {
    backgroundColor: "#E9E5E5",
    padding: 3,
    flexDirection: "row",
    alignItems: "center",
    width: 100,
    opacity: 0.8,
    marginVertical: 10,
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: "center",
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
