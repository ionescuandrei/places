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
      <Text>
        {props.placeName}-{props.placeDistance} KM
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    height: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee",
    position: "relative"
  },
  placeImage: {
    marginRight: 8,
    height: 150,
    width: 150
  },
  textTipe: {
    color: "black",
    fontSize: 14,
    fontFamily: "Times New Roman",
    position: "absolute"
  }
});

export default listItem;
