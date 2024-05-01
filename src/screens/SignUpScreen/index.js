import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import SignUpForm from "./components/form";
import { DarkViolet, Teal } from "../../../src/utils/colorUtils";
import { signUpImage } from "../../service/imageService";

export default function () {
  return (
    <View>
      <ScrollView>
        <View style={{ marginLeft: 20 }} />
        {/* header */}
        <View style={styles.header}>
          <Image style={styles.image} source={signUpImage} />
          <Text style={styles.textBig}>Create account</Text>
          <Text style={styles.textSmall}>Create account to login</Text>
        </View>
        {/* body */}
        <View style={styles.body}>
          <SignUpForm />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    alignItems: "center",
  },
  image: {
    width: 200,
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
