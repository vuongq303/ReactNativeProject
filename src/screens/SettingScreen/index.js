import React, { useEffect, useState } from "react";
import {
  Avatar,
  NativeBaseProvider,
  Center,
  View,
  AlertDialog,
  Button,
} from "native-base";
import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Card } from "react-native-elements";
import { setStorage } from "../../service/storageService";
import { useNavigation } from "@react-navigation/native";
import { avatar } from "../../service/imageService";

export default function UserScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "Setting",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("allChat")}>
          <MaterialIcons color="#877E7E" name="message" size={25} />
        </TouchableOpacity>
      ),
    });
  }, []);
  const ShowDialog = () => {
    const cancelRef = React.useRef(null);
    return (
      <Center>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Log out</AlertDialog.Header>
            <AlertDialog.Body>
              Are you sure you want to log out?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={async function () {
                    setIsOpen(false);
                    await setStorage("@keyUser", "");
                    console.log("Removed key");
                    navigation.navigate("SignIn");
                  }}
                >
                  Log out
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    );
  };
  function Body() {
    return (
      <ScrollView style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("profile")}>
          <View style={styles.bodyContainer}>
            <Avatar
              bg="amber.500"
              size={12}
              source={avatar}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "700" }}>
                Hoàngg Quânn
              </Text>
              <Text>View my profile</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.line} />
        {/* history */}
        <Card containerStyle={{ borderRadius: 20 }}>
          <Text style={styles.margin}>Họ tên: Hoàng Quốc Quân</Text>
          <Text style={styles.margin}>Mã sinh viên: PH33420</Text>
          <Text style={styles.margin}>Lớp: MD18306</Text>
        </Card>
        {/* Card */}
        <Card containerStyle={{ borderRadius: 20 }}>
          <Text style={styles.margin}>Loại điện thoại: Nox player 7.5.9</Text>
          <Text style={styles.margin}>Bộ nhớ trong: 32GB</Text>
          <Text style={styles.margin}>RAM: 16GB</Text>
        </Card>

        {/* Favorite */}
        <Card containerStyle={{ borderRadius: 20 }}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("favorite")}
          >
            <View style={styles.item}>
              <AntDesign name="hearto" size={20} />
              <Text style={styles.textItem}>Favorite</Text>
            </View>
            <MaterialIcons name="arrow-right" size={25} />
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity style={styles.item}>
            <View style={styles.item}>
              <MaterialCommunityIcons name="theme-light-dark" size={20} />
              <Text style={styles.textItem}>Theme</Text>
            </View>
            <MaterialIcons name="arrow-right" size={25} />
          </TouchableOpacity>
          {/* logout */}
          <TouchableOpacity
            style={styles.item}
            onPress={() => setIsOpen(!isOpen)}
          >
            <View style={styles.item}>
              <MaterialIcons name="logout" size={20} />
              <Text style={styles.textItem}>Log out</Text>
            </View>
            <MaterialIcons name="arrow-right" size={25} />
          </TouchableOpacity>
        </Card>
      </ScrollView>
    );
  }
  return (
    <>
      <Body />
      <ShowDialog />
    </>
  );
}
const styles = StyleSheet.create({
  bodyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  menu: {
    marginLeft: 8,
    paddingVertical: 3,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  textItem: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  line: {
    backgroundColor: "#333",
    height: 1,
    marginHorizontal: 8,
    marginVertical: 10,
    opacity: 0.5,
  },
  margin: {
    marginVertical: 5,
  },
});
