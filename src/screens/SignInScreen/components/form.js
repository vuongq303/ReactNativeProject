import React, { useState } from "react";
import {
  Input,
  Icon,
  Stack,
  Pressable,
  Center,
  View,
  Box,
  Button,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Toast from "../../../service/toastService";
import { Teal } from "../../../utils/colorUtils";
import { validateEmpty } from "../../../utils/validateUtils";
import { encryptionLogin, signIn } from "../api";
import { useNavigation } from "@react-navigation/native";

export default function () {
  var user = { username: "", password: "" };
  const navigation = useNavigation();

  function InputForm() {
    const [show, setShow] = useState(false);

    return (
      <Stack space={4} w="100%" alignItems="center">
        <Input
          w={{ base: "100%", md: "100%" }}
          size={12}
          InputLeftElement={
            <Icon as={<MaterialIcons name="person" />} size={7} ml="2" />
          }
          placeholder="Username"
          onChangeText={(newText) => (user.username = newText)}
        />

        <Input
          w={{ base: "100%", md: "100%" }}
          type={show ? "text" : "password"}
          size={12}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={6}
                mr="2"
              />
            </Pressable>
          }
          InputLeftElement={
            <Icon as={<MaterialIcons name="lock" />} size={6} ml="2" />
          }
          placeholder="Password"
          onChangeText={(newText) => (user.password = newText)}
        />
      </Stack>
    );
  }

  async function signIn_() {
    if (validateEmpty(user)) {
      Toast(validateEmpty(user) + " empty!");
    } else {
      const result = await signIn(user);
      if (result) {
        const savedKey = await encryptionLogin(
          {
            username: result.username,
            password: result.password,
          },
          result.id
        );
        console.log(savedKey);
        if (savedKey) {
          navigation.navigate("Main");
          console.log("Save key complete");
        }
      } else {
        Toast("Username or Password incorrect!");
      }
    }
  }

  function ButtonForm() {
    return (
      <Box style={styles.margin}>
        <Button style={{ marginVertical: 10 }} onPress={signIn_}>
          Sign In
        </Button>
        <Text style={{ textAlign: "center" }}>or</Text>
        <Button style={{ marginVertical: 10 }}>Sign In with Google</Button>
      </Box>
    );
  }

  return (
    <>
      <Center m={4}>
        <InputForm />
      </Center>
      <TouchableOpacity onPress={() => navigation.navigate("forgotPassword")}>
        <Text style={[styles.margin, styles.text]}>Forgot Password?</Text>
      </TouchableOpacity>
      <ButtonForm />
      <View style={styles.containerText}>
        <Text>Don't have account?</Text>
        <TouchableOpacity onPress={() => navigation.push("SignUp")}>
          <Text style={styles.btn_signUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  margin: {
    marginHorizontal: 20,
  },
  text: {
    textAlign: "right",
    marginVertical: 8,
    color: Teal,
    fontSize: 12,
  },
  containerText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  btn_signUp: {
    color: Teal,
    marginHorizontal: 5,
  },
});
