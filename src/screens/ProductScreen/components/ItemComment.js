import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Avatar } from "native-base";
import { Card } from "react-native-elements";
import changeDate from "../../../service/dateService";

export default function ({ item }) {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.containerInput}>
        <Avatar source={{ uri: item.img }} size={8} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.comment}>
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.time}>{changeDate(item.date)}</Text>
      </View>
    </Card>
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
    fontSize: 16,
  },
  comment: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    opacity: 0.7,
    fontSize: 12,
  },
  text: {
    fontSize: 15,
  },
});
