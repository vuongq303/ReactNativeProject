import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import SignInForm from "./components/form";
import { DarkViolet, Teal } from "../../../src/utils/colorUtils";
import { loginImage } from "../../service/imageService";

export default function () {
  return (
    <ScrollView>
      {/* header */}
      <View style={styles.header}>
        <Image source={loginImage} style={styles.image} />
        <Text style={styles.textBig}>Welcome back</Text>
        <Text style={styles.textSmall}>Sign in to continue</Text>
      </View>
      {/* body */}
      <View style={styles.body}>
        <SignInForm />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    alignItems: "center",
  },
  image: {
    width: 170,
    height: 170,
    objectFit: "contain",
  },
  textBig: {
    fontSize: 35,
    fontWeight: "bold",
    color: DarkViolet,
  },
  textSmall: {
    color: Teal,
  },
  body: {
    marginTop: 50,
  },
});
