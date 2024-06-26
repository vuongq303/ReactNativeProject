import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  RefreshControl,
  Dimensions,
} from "react-native";
import {
  Actionsheet,
  useDisclose,
  Box,
  Center,
  Button,
  Divider,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback } from "react";
const { width } = Dimensions.get("window");
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ListComment from "./components/ListComment";
import {
  addProductToFavorite,
  checkInFavorite,
  removeFromFavorite,
} from "../../redux/reducer/favoriteReducer";
import { getComment } from "../../redux/reducer/commentReducer";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "../../service/toastService";
import { getStorage } from "../../service/storageService";
import { addProductToCart } from "./api";
import { ip_product } from "../../service/.env";
import { numberService } from "../../service/numberService";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function () {
  const navigation = useNavigation();
  const route = useRoute();
  const itemId = route.params;
  const scrollY = useSharedValue(0);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [status, setStatus] = useState(false);
  const heart_ = "hearto";

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getItem();
    // dispatch(getComment({ itemId: itemId.itemId }));
  }, []);

  const getItem = async () => {
    try {
      const response = await axios.post(`${ip_product}/getItemProduct`, itemId);
      const json = response.data;
      const idUser = await getStorage("@infoUser");
      dispatch(
        checkInFavorite({
          idProduct: json[0]._id,
          idUser: idUser,
        })
      );
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const scrollHandle = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const animatedHideHeader = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 100], [1, 0], Extrapolation.CLAMP),
  }));

  const animatedShowHeader = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 100], [0, 1], Extrapolation.CLAMP),
  }));

  const aniamtedTextShow = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [425, 426],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));
  
  async function changeToFavorite() {
    const idUser = await getStorage("@infoUser");
    heart_ == "hearto"
      ? dispatch(
          addProductToFavorite({
            idUser: idUser,
            id: data[0]._id,
            name: data[0].productName,
            img: data[0].imageUri,
            price: data[0].info[0].price,
            sold: data[0].sold,
            rate: data[0].rating,
          })
        )
      : dispatch(
          removeFromFavorite({
            idProduct: data[0]._id,
            idUser: idUser,
          })
        );
  }

  useEffect(() => {
    getItem();
  }, []);

  function ActionSheetView() {
    const [selectedButton, setSelectedButton] = useState(null);
    const [info, setInfo] = useState({ price: 0, quantity: 0, size: "" });
    var [quantity, setQuantity] = useState(1);

    const toggleColorMode = (index, text) => {
      setSelectedButton(index == selectedButton ? null : index);
      setQuantity(1);
      data[0].info[index].size == text
        ? setInfo(data[0].info[index])
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
        if (status == true) {
          const result = await addProductToCart({
            idUser: idUs,
            id: data[0]._id,
            name: data[0].productName,
            img: data[0].imageUri,
            price: info.price,
            size: info.size,
          });
          result == 1
            ? Toast("Add product to cart complete!")
            : Toast("Product exist!");
        } else {
          //buy product here
        }
      } else Toast("You don't selected product!");
    }

    return (
      <Center>
        {console.log("render action sheet view")}
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w="100%" h={400}>
              <View style={styles.row}>
                <Image
                  source={{ uri: data[0].imageUri }}
                  height={150}
                  width={150}
                  resizeMode="center"
                  style={{ margin: 10 }}
                />
                <View style={{ marginTop: 90 }}>
                  <Text style={{ color: "red", fontSize: 18 }}>
                    ₫{numberService(info.price)}
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
                {data[0].info.map((val, index) => (
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

  function NavigationBar() {
    return (
      <Animated.View style={[styles.containerNavigation, animatedHideHeader]}>
        {console.log("render navigation bar")}
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="arrow-back"
            color="#fff"
            size={25}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.containerBar}>
          <TouchableOpacity onPress={changeToFavorite}>
            <AntDesign
              name={heart_}
              style={styles.icon}
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <MaterialIcons
              style={styles.icon}
              color="#fff"
              name="shopping-cart"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("allChat")}>
            <MaterialIcons
              style={styles.icon}
              color="#fff"
              name="chat"
              size={25}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  function NavigationBarShow() {
    return (
      <Animated.View
        style={[styles.containerNavigationShow, animatedShowHeader]}
      >
        {console.log("render navigation bar show")}
        <View style={{ flexDirection: "row", marginTop: 32 }}>
          <TouchableOpacity
            style={{ marginLeft: 5 }}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons
              name="arrow-back"
              color="#fff"
              size={25}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Animated.Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.textHeaderShow, aniamtedTextShow]}
          >
            {data[0].productName}
          </Animated.Text>
        </View>
        <View style={styles.containerBarShow}>
          <TouchableOpacity onPress={changeToFavorite}>
            <AntDesign
              name={"hearto"}
              style={styles.icon}
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <MaterialIcons
              style={styles.icon}
              color="#fff"
              name="shopping-cart"
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("allChat")}>
            <MaterialIcons
              style={styles.icon}
              color="#fff"
              name="chat"
              size={25}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
  function Body() {
    return (
      <View>
        {console.log("render body")}
        <View style={{ margin: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.priceD]}>₫</Text>
            <Text style={styles.price}>
              {numberService(data[0].info[0].price)}
            </Text>
          </View>
          <Text style={styles.border}> Buy to received gift</Text>
        </View>
        {/*  */}
        <View style={styles.star}>
          <Text style={styles.like}> Favorite+ </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            style={{ marginRight: 10, fontSize: 18 }}
          >
            {data[0].productName}
          </Text>
        </View>
        {/*  */}
        <View style={styles.star}>
          <MaterialIcons name="star" color="#ADFF2F" size={20} />
          <Text> {data[0].rating} /5 </Text>
          <Text style={{ opacity: 0.2 }}> | </Text>
          <Text>Sold {data[0].sold}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.voucher}>
          <Text>Voucher of shop</Text>
          <MaterialIcons name="arrow-right" size={24} />
        </View>
        <View style={styles.line} />
        <View style={styles.voucher}>
          <Text>SPayLater</Text>
          <MaterialIcons name="arrow-right" size={24} />
        </View>
        <View style={styles.line} />
        <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
          <Text>Transport fee $0</Text>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ opacity: 0.5 }}>
              Free shipping for orders from $100.000
            </Text>
            <Text style={{ opacity: 0.5 }}>
              Receive goods as soon as possible
            </Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.voucher}>
          <Text>Products details</Text>
          <MaterialIcons name="arrow-right" size={24} />
        </View>
        <View style={styles.line} />
      </View>
    );
  }
  function ButtonForm() {
    return (
      <View style={[{ marginBottom: 5 }, styles.row]}>
        <Button
          style={styles.cart}
          onPress={() => {
            setStatus(true);
            onOpen();
          }}
        >
          <MaterialIcons
            style={{ textAlign: "center", marginTop: 6 }}
            name="shopping-cart"
            color="#fff"
            size={30}
          />
        </Button>
        <Button
          style={styles.buyNowBtn}
          onPress={() => {
            setStatus(false);
            onOpen();
          }}
        >
          <Text style={styles.buyNow}>Buy now</Text>
        </Button>
      </View>
    );
  }

  return (
    <>
      {console.log("render main")}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Animated.ScrollView
            onScroll={scrollHandle}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Image
              height={400}
              source={{ uri: data[0].imageUri }}
              resizeMode="cover"
            />
            <ScrollView>
              <View>
                <Body />
                <ActionSheetView />
              </View>
            </ScrollView>
            <View style={{ height: 500 }} />
          </Animated.ScrollView>
          <NavigationBarShow />
          <NavigationBar />
        </>
      )}
      {!loading ? <ButtonForm /> : false}
    </>
  );
}
const styles = StyleSheet.create({
  buyNowBtn: {
    width: width * 0.5,
    backgroundColor: "violet",
    height: 50,
    paddingTop: -10,
  },
  containerBar: {
    flexDirection: "row",
    marginHorizontal: 5,
    alignItems: "center",
  },
  container: {
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
  },
  icon: {
    backgroundColor: "#877E7E",
    borderRadius: 20,
    marginHorizontal: 5,
    padding: 5,
  },
  border: {
    width: 97,
    marginVertical: 5,
    padding: 1,
    borderColor: "red",
    borderWidth: 1,
    color: "red",
    fontSize: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: "red",
  },
  like: {
    width: 54,
    height: 17,
    marginRight: 5,
    fontSize: 11,
    color: "#fff",
    fontWeight: "700",
    backgroundColor: "red",
    marginTop: 4,
  },
  star: {
    flexDirection: "row",
    margin: 10,
  },
  voucher: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  line: {
    backgroundColor: "#877E7E",
    height: 20,
    opacity: 0.1,
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
  cart: {
    backgroundColor: "green",
    width: width * 0.5,
    height: 50,
    paddingTop: 0,
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
  containerNavigation: {
    width: "100%",
    flexDirection: "row",
    height: 100,
    alignItems: "center",
    position: "absolute",
    justifyContent: "space-between",
  },
  containerNavigationShow: {
    width: "100%",
    flexDirection: "row",
    height: 80,
    position: "absolute",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  containerBarShow: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginTop: 32,
  },
  textHeaderShow: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 20,
    width: "50%",
  },
});
