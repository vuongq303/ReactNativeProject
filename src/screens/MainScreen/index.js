import React, { useEffect, useState, useCallback } from "react";
import { Avatar, HStack, Center } from "native-base";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import SliderShow from "./components/SliderShow";
import ItemProduct from "./components/ItemProduct";
import ItemRecent from "./components/ItemRecent";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/reducer/productReducer";
import {
  addRecent,
  getRecent,
  removeRecent,
} from "../../redux/reducer/recentReducer";
import { useNavigation } from "@react-navigation/native";
import { getStorage } from "../../service/storageService";
import { avatar } from "../../service/imageService";

export default function HomeScreen() {
  const data = useSelector((s) => s.product.data);
  const loading = useSelector((s) => s.product.loading);
  const loadingRecent = useSelector((s) => s.recent.loading);
  const dataRecent = useSelector((s) => s.recent.data);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getProducts());
      dispatch(getRecent());
    });
    return unsubscribe;
  }, [navigation]);

  function NavigationBar() {
    return (
      <HStack
        justifyContent="space-between"
        px="3"
        padding="2"
        marginTop="10"
        alignItems="center"
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", flex: 1 }}>Main</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              padding: 5,
            }}
            onPress={() => {
              navigation.push("ListProducts");
            }}
          >
            <MaterialIcons
              style={styles.icon}
              color="#878787"
              name="search"
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.push("Cart");
            }}
            style={{
              borderRadius: 30,
              padding: 5,
              marginRight: 10,
            }}
          >
            <MaterialIcons
              style={styles.icon}
              color="#878787"
              name="shopping-cart"
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.push("user");
            }}
          >
            <Avatar bg="amber.500" size={10} source={avatar} />
          </TouchableOpacity>
        </View>
      </HStack>
    );
  }

  function ListContainer() {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      dispatch(getProducts());
      dispatch(getRecent());
    }, []);

    async function addRecent_(item) {
      const idUser = await getStorage("@infoUser");
      dispatch(
        addRecent({
          idUser: idUser,
          id: item._id,
          name: item.productName,
          img: item.imageUri,
          price: item.info[0].price,
          sold: item.sold,
          rate: item.rating,
        })
      );
      navigation.push("ProductScreen", { itemId: item._id });
    }

    const shirt = data.filter((e) => e.productType == "shirt");
    const pants = data.filter((e) => e.productType == "pants");
    const shoes = data.filter((e) => e.productType == "shoes");

    return (
      <View style={{ marginBottom: 10 }}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{ marginBottom: 80 }}
          >
            <SliderShow />
            <Text style={styles.textHeader}>Shirts</Text>
            <FlatList
              data={shirt}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => addRecent_(item)}>
                  <ItemProduct item={item} />
                </TouchableOpacity>
              )}
            />

            <Text style={styles.textHeader}>Pants</Text>
            <FlatList
              data={pants}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => addRecent_(item)}>
                  <ItemProduct item={item} />
                </TouchableOpacity>
              )}
            />

            <Text style={styles.textHeader}>Shoes</Text>
            <FlatList
              data={shoes}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => addRecent_(item)}>
                  <ItemProduct item={item} />
                </TouchableOpacity>
              )}
            />
            <View style={[styles.row, { marginBottom: 10 }]}>
              <Text style={styles.textHeader}>Recent</Text>
              <TouchableOpacity
                style={{ marginTop: 12 }}
                onPress={async () =>
                  Alert.alert(
                    "Clear recently",
                    "You sure want clear recent ?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Confirm",
                        onPress: async () => {
                          let idUser = await getStorage("@infoUser");
                          dispatch(removeRecent(idUser));
                        },
                      },
                    ]
                  )
                }
              >
                <Text>Clear recent</Text>
              </TouchableOpacity>
            </View>
            {loadingRecent ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={dataRecent}
                horizontal
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push("ProductScreen", {
                        itemId: item.idProduct,
                      });
                    }}
                  >
                    <ItemRecent item={item} />
                  </TouchableOpacity>
                )}
              />
            )}
          </ScrollView>
        )}
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
  textHeader: {
    fontSize: 25,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 15,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
  },
});
