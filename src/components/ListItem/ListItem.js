import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const listItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Image
        resizeMode="cover"
        source={props.placeImage}
        style={styles.placeImage}
      />
      <Text>{props.placeName}</Text>
      <Text style={{ textAlign: "right" }}>{props.placeDistance} KM</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    height: 70,
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center"
  },
  placeImage: {
    marginRight: 8,
    height: 50,
    width: 50
  },
  textStyle: {}
});

export default listItem;
