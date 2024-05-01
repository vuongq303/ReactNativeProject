import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import ItemComment from "./ItemComment";
import { useSelector, useDispatch } from "react-redux";
import { getComment, sendComment } from "../../../redux/reducer/commentReducer";

export default function ({ itemId }) {
  const [text, setText] = useState("");
  const data = useSelector((s) => s.comment.data);
  const loading = useSelector((s) => s.comment.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComment({ itemId: itemId.itemId }));
  }, []);

  function addComment() {
    dispatch(sendComment({ itemId: itemId.itemId, text }));
    setText("");
  }

  return (
    <View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          defaultValue={text}
          placeholder="Add comment ..."
        />
        <TouchableOpacity onPress={addComment}>
          <MaterialIcons name="send" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {data.length == 0 ? (
            <View style={styles.containerViewComment}>
              <Text>Don't have comment :/ </Text>
            </View>
          ) : (
            <FlatList
              nestedScrollEnabled
              data={data}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <ItemComment item={item} />}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    width: "92%",
    padding: 10,
    color: "#333",
    fontSize: 15,
  },
  containerViewComment: {
    width: "100%",
    height: 200,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
  },
  line: {
    backgroundColor: "#877E7E",
    height: 20,
    opacity: 0.1,
    marginTop: 5,
  },
  card: {
    borderRadius: 20,
    marginBottom: 10,
  },
  name: {
    marginLeft: 10,
    fontWeight: "bold",
  },
  comment: {
    marginTop: 5,
  },
});
