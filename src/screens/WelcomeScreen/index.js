import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { welcomeImage } from "../../service/imageService";
import { decryptionLogin } from "./api";
import { DarkViolet } from "../../utils/colorUtils";

export default function () {
  const navigation = useNavigation();
  async function verifyLogin() {
    const info = await decryptionLogin();
    info ? navigation.navigate("Main") : navigation.navigate("SignIn");
  }

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={welcomeImage} />
      <Text style={styles.textHeader}>Welcome To My App</Text>
      <Text style={styles.textBody}>Họ tên: Hoàng Quốc Quân</Text>
      <Text style={styles.textBody}>Mã sinh viên : PH33420</Text>

      <TouchableOpacity onPress={verifyLogin}>
        <View style={styles.containerBtn}>
          <Text style={styles.btnStart}>Get Started</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    width: 250,
    height: 350,
    resizeMode: "contain",
  },
  textHeader: {
    fontWeight: "800",
    fontSize: 30,
    marginVertical: 10,
  },
  textBody: {
    marginHorizontal: 20,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  btnStart: {
    fontSize: 16,
    color: "#fff",
  },
  containerBtn: {
    backgroundColor: DarkViolet,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 50,
  },
});
