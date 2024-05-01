import React, { useEffect, useState } from "react";
import {
  Box,
  FlatList,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  Divider,
  NativeBaseProvider,
  View,
} from "native-base";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import axios from "axios";
import { ipChat } from "@env";
import { getStorage } from "../../service/storageService";
import { useNavigation } from "@react-navigation/native";

export default function () {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const getUser = async function () {
    const idUser = await getStorage("@infoUser");
    await axios
      .get(`${ipChat}/getAllUser`, {
        params: {
          id: idUser,
        },
      })
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUser();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <Center px="3">
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Box w="100%">
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("chat", {
                        receiver: item._id,
                      })
                    }
                  >
                    <Box
                      _dark={{
                        borderColor: "muted.50",
                      }}
                      pl={["0", "4"]}
                      pr={["0", "5"]}
                      py="2"
                    >
                      <HStack space={[2, 3]} justifyContent="space-between">
                        <Avatar
                          size="48px"
                          source={{
                            uri: item.avatar,
                          }}
                        />
                        <VStack>
                          <Text
                            _dark={{
                              color: "warmGray.50",
                            }}
                            color="coolGray.800"
                            bold
                          >
                            {item.fullname}
                          </Text>
                          <Text
                            color="coolGray.600"
                            _dark={{
                              color: "warmGray.200",
                            }}
                          >
                            {item.recentText}
                          </Text>
                        </VStack>
                        <Spacer />
                        <Text
                          fontSize="xs"
                          _dark={{
                            color: "warmGray.50",
                          }}
                          color="coolGray.800"
                          alignSelf="flex-start"
                        >
                          {item.timeStamp}
                        </Text>
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                  <Divider w="100%" backgroundColor="#333" marginY={1} />
                </View>
              )}
              keyExtractor={(item) => item._id}
            />
          </Box>
        )}
      </Center>
    </>
  );
}
