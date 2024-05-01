import React, { useEffect, useState } from "react";
import {
  Avatar,
  HStack,
  Center,
  Box,
  Actionsheet,
  Divider,
  NativeBaseProvider,
  Button,
  useDisclose,
} from "native-base";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  View,
  RefreshControl,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import ItemCart from "./components/ItemCart";
import { getProductId, removeProduct, updateProductToCart } from "./api";
import { MaterialIcons } from "@expo/vector-icons";
import { ipCart } from "@env";
import { getStorage } from "../../service/storageService";
import Toast from "../../service/toastService";
import { avatar } from "../../service/imageService";
import { useNavigation } from "@react-navigation/native";

export default function () {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclose();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);
  const listItem = [];

  async function getData() {
    const id = await getStorage("@infoUser");
    await axios
      .post(`${ipCart}/getProductCart`, { id_: id })
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  async function deleteProduct() {
    const listFilter = listItem.filter((val) => val.status);
    const idUser = await getStorage("@infoUser");

    if (listFilter.length != 0) {
      listFilter.push({ idUser: idUser });
      const result = await removeProduct(listFilter);
      if (result != 0) {
        Toast(`You delete ${result} product!`);
        await getData();
      } else {
        Toast("Delete product failed!");
      }
    } else {
      Toast("You don't selected product!");
    }
  }

  function NavigationBar() {
    return (
      <HStack
        justifyContent="space-around"
        px="3"
        padding="2"
        marginTop="10"
        alignItems="center"
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={deleteProduct}
          style={{ marginHorizontal: 10 }}
        >
          <MaterialIcons name="delete" size={30} color="#878787" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => {
            navigation.navigate("user");
          }}
        >
          <Avatar bg="amber.500" size={10} source={avatar} />
        </TouchableOpacity>
      </HStack>
    );
  }

  function ActionSheetView() {
    const [selectedButton, setSelectedButton] = React.useState(null);
    const [info, setInfo] = React.useState({ price: 0, quantity: 0, size: "" });
    var [quantity, setQuantity] = React.useState(1);

    const toggleColorMode = (index, text) => {
      setSelectedButton(index == selectedButton ? null : index);
      setQuantity(1);
      item[0].info[index].size == text
        ? setInfo(item[0].info[index])
        : setInfo({ price: 0, quantity: 0, size: "" });
    };

    function decreaseNumber() {
      if (info.quantity != "") {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
      }
    }

    function increaseNumber() {
      if (info.quantity != "") {
        if (quantity < info.quantity) {
          setQuantity(quantity + 1);
        }
      }
    }

    async function shoppingCartOrBuyNow() {
      if (info.quantity != "") {
        const idUs = await getStorage("@infoUser");
        const result = await updateProductToCart({
          idUser: idUs,
          id: item[0]._id,
          name: item[0].productName,
          image: item[0].imageUri,
          price: info.price,
          size: info.size,
        });
        if (result == 1) {
          Toast("Update product to cart complete!");
          await getData();
          onClose();
        } else {
          Toast("Product exist!");
        }
      } else {
        Toast("You don't selected product!");
      }
    }

    function eArabic(x) {
      return parseInt(x).toLocaleString("en-ES");
    }

    return (
      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w="100%" h={400}>
              <View style={styles.row}>
                <Image
                  source={{ uri: item[0].imageUri }}
                  height={150}
                  width={150}
                  resizeMode="center"
                  style={{ margin: 10 }}
                />
                <View style={{ marginTop: 90 }}>
                  <Text style={{ color: "red", fontSize: 18 }}>
                    ₫{eArabic(info.price)}
                  </Text>
                  <Text style={styles.quantity}>Quantity: {info.quantity}</Text>
                </View>
              </View>
              <Divider
                _light={{
                  bg: "muted.800",
                }}
                _dark={{
                  bg: "muted.50",
                }}
                w="100%"
                opacity={0.3}
              />
              <View style={{ margin: 10 }}>
                <Text>Size</Text>
              </View>
              <ScrollView horizontal>
                {item[0].info.map((val, index) => (
                  <Button
                    size="sm"
                    colorScheme={
                      index == selectedButton ? "secondary" : "primary"
                    }
                    width={100}
                    height={8}
                    marginX={1}
                    fontWeight="bold"
                    key={index}
                    onPress={() => toggleColorMode(index, val.size)}
                  >
                    {val.size}
                  </Button>
                ))}
              </ScrollView>
              <Divider
                _light={{
                  bg: "muted.800",
                }}
                _dark={{
                  bg: "muted.50",
                }}
                w="100%"
                opacity={0.3}
              />
              <View style={styles.space}>
                <Text style={{ margin: 10 }}>Quantity</Text>
                <View style={[styles.row, { margin: 10 }]}>
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
              <Divider w="100%" />
              <Button
                onPress={shoppingCartOrBuyNow}
                marginBottom={5}
                marginTop={5}
                w="100%"
              >
                Confirm
              </Button>
            </Box>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    );
  }

  function ListItem() {
    const [refreshing, setRefreshing] = React.useState(false);
    const [price, setPrice] = React.useState(0);
    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      await getData();
    }, []);

    function addListItem(price, id, status) {
      const checkItem = listItem.filter((val) => val.id == id);
      if (checkItem == 0) {
        listItem.push({ id, price, status });
      } else {
        const index = listItem.findIndex((val) => val.id == id);
        listItem[index] = { id, price, status };
      }
      let total = 0;
      const list = listItem.filter((val) => val.status == true);
      list.map((val) => (total += val.price));
      setPrice(total);
    }

    async function changeProduct(id) {
      const result = await getProductId({ id: id });
      setItem(result);
      setVisible(false);
      onOpen();
    }

    return (
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={data[0]}
            renderItem={({ item }) => (
              <ItemCart
                item={item}
                onQuantityChange={addListItem}
                changeProduct={async () => await changeProduct(item.idProduct)}
              />
            )}
          />
        )}
        {loading ? (
          false
        ) : (
          <View style={styles.containerPrice}>
            <View style={{ marginLeft: 10, flexDirection: "row" }}>
              <Text style={{ opacity: 0.6, marginTop: 4 }}>Total price </Text>
              <Text style={{ fontSize: 18, color: "red" }}>₫{price}</Text>
            </View>
            <Button w="30%" marginRight={2}>
              Buy
            </Button>
          </View>
        )}
        <>{visible ? false : <ActionSheetView />}</>
      </View>
    );
  }

  return (
    <>
      <Center>
        <NavigationBar />
      </Center>
      <ListItem />
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
  priceD: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: "700",
    color: "red",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  space: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buyNow: {
    textAlign: "center",
    color: "#fff",
    marginTop: 10,
  },
  quantity: {
    opacity: 0.6,
    fontSize: 13,
    marginVertical: 10,
  },
  containerPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    height: 100,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
});
