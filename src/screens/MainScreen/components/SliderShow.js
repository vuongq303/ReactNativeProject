import React from "react";
import { StyleSheet, View, Image } from "react-native";
import Swiper from "react-native-swiper";
import {
  loginImage,
  signUpImage,
  sliderImage1,
  sliderImage2,
} from "../../../service/imageService";

const styles = StyleSheet.create({
  img: {
    resizeMode: "center",
    height: 200,
    width: "auto",
  },
});

export default function () {
  return (
    <Swiper
      autoplay={true}
      height={200}
      style={styles.wrapper}
      showsButtons={true}
    >
      <View>
        <Image style={styles.img} source={loginImage} />
      </View>
      <View>
        <Image style={styles.img} source={sliderImage2} />
      </View>
      <View>
        <Image style={styles.img} source={signUpImage} />
      </View>
      <View>
        <Image style={styles.img} source={sliderImage1} />
      </View>
    </Swiper>
  );
}
