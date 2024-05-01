import React from "react";
import {
  Avatar,
  HStack,
  Center,
  NativeBaseProvider,
  Input,
  Icon,
} from "native-base";
import { TouchableOpacity, StyleSheet, View, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ItemProduct from "./components/ItemProduct";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../redux/reducer/productReducer";
import { useNavigation } from "@react-navigation/native";
import { avatar } from "../../service/imageService";

export default function () {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function findProduct(text) {
    dispatch(searchProduct(text));
  }

  function NavigationBar() {
    return (
      <HStack px="3" padding="2" marginTop="10" alignItems="center">
        <View style={{ flexDirection: "row", flex: 1, marginRight: 5 }}>
          <View style={{ marginTop: 5, marginRight: 10 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <MaterialIcons
                name="arrow-back"
                color="black"
                size={35}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <Input
            w={{
              base: "80%",
              md: "25%",
            }}
            autoFocus={true}
            variant="rounded"
            size={6}
            onChangeText={findProduct}
            InputLeftElement={
              <Icon as={<MaterialIcons name="search" />} size={6} ml="3" />
            }
            placeholder="Search"
          />
          <TouchableOpacity style={{ marginLeft: 5 }}>
            <Avatar bg="amber.500" size={10} source={avatar} />
          </TouchableOpacity>
        </View>
      </HStack>
    );
  }

  function ListContainer() {
    const dataSearch = useSelector((s) => s.product.dataSearch);
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={dataSearch}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.push("ProductScreen", { itemId: item._id })
              }
            >
              <ItemProduct item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  return (
    <>
      <Center>
        <NavigationBar />
      </Center>
      <ListContainer />
    </>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemImage: {
    height: 200,
    width: "auto",
    resizeMode: "center",
    marginTop: 4,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    height: 250,
  },
  itemName: {
    fontSize: 15,
    color: "#333",
    fontWeight: "600",
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 6,
  },
  itemPrice: {
    fontWeight: "500",
    color: "red",
    marginLeft: 6,
    marginBottom: 10,
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#333",
    marginRight: 6,
  },
});
