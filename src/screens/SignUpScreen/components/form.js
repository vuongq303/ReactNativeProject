import React from "react";
import {
  Input,
  Icon,
  Stack,
  Pressable,
  Center,
  NativeBaseProvider,
  View,
  Box,
  Button,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "../../../utils/toastUtils";
import {
  validateEmail,
  validateEmpty,
  validatePhone,
} from "../../../utils/validateUtils";
import { signUp } from "../api";
import { Teal } from "../../../utils/colorUtils";

export default function () {
  const navigation = useNavigation();

  var user = {
    username: "",
    email: "",
    fullname: "",
    phone: "",
    password: "",
  };
  var confirmPassword;
  // input
  function InputForm() {
    const [showPass, setShowPass] = React.useState(false);
    const [showConPass, setShowConPass] = React.useState(false);
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
          size={12}
          InputLeftElement={
            <Icon as={<MaterialIcons name="email" />} size={6} ml="2" />
          }
          placeholder="Email"
          onChangeText={(newText) => (user.email = newText)}
        />
        <Input
          w={{ base: "100%", md: "100%" }}
          size={12}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="drive-file-rename-outline" />}
              size={6}
              ml="2"
            />
          }
          placeholder="Fullname"
          onChangeText={(newText) => (user.fullname = newText)}
        />
        <Input
          w={{ base: "100%", md: "100%" }}
          size={12}
          InputLeftElement={
            <Icon as={<MaterialIcons name="local-phone" />} size={6} ml="2" />
          }
          placeholder="Phone"
          onChangeText={(newText) => (user.phone = newText)}
        />
        {/*  */}
        <Input
          w={{ base: "100%", md: "100%" }}
          type={showPass ? "text" : "password"}
          size={12}
          InputRightElement={
            <Pressable onPress={() => setShowPass(!showPass)}>
              <Icon
                as={
                  <MaterialIcons
                    name={showPass ? "visibility" : "visibility-off"}
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
        {/*  */}
        <Input
          w={{ base: "100%", md: "100%" }}
          type={showConPass ? "text" : "password"}
          size={12}
          InputRightElement={
            <Pressable onPress={() => setShowConPass(!showConPass)}>
              <Icon
                as={
                  <MaterialIcons
                    name={showConPass ? "visibility" : "visibility-off"}
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
          placeholder="Confirm Password"
          onChangeText={(newText) => (confirmPassword = newText)}
        />
      </Stack>
    );
  }

  // button
  function ButtonForm() {
    async function signUp_() {
      if (validateEmpty(user)) {
        Toast(validateEmpty(user).trim() + " is empty !");
      } else if (!validateEmail(user.email)) {
        Toast("Email invalid!");
      } else if (!validatePhone(user.phone)) {
        Toast("Phone number invalid!");
      } else if (user.password != confirmPassword) {
        Toast("Password and confirm Password different!");
      } else {
        const result = await signUp(user);
        if (result) {
          result == 1 ? Toast("Sign Up complete!") : Toast("Username exist!");
        }
      }
    }
    return (
      <Box style={styles.margin}>
        <TouchableOpacity onPress={() => navigation.navigate("forgotPassword")}>
          <Text style={[styles.margin, styles.text]}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button style={{ marginVertical: 10 }} onPress={signUp_}>
          Sign Up
        </Button>
        <View style={styles.containerText}>
          <Text>If have account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text
              style={{
                color: Teal,
                marginHorizontal: 5,
                marginBottom: 30,
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </Box>
    );
  }
  //
  return (
    <>
      <Center m={4}>
        <InputForm />
      </Center>
      <ButtonForm />
    </>
  );
}
const styles = StyleSheet.create({
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
});
