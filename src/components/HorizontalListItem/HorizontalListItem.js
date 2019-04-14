import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const HorizontallistItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Image
        resizeMode="cover"
        source={props.placeImage}
        style={styles.placeImage}
      />
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={styles.textName}>{props.placeName}</Text>
        <Text style={styles.textType}>Cusine: {props.placeType}</Text>
      </View>
      <Text style={styles.textDistance}>{props.placeDistance} KM</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee"
  },
  placeImage: {
    marginRight: 8,
    height: 100,
    width: 100
  },
  textName: {
    alignSelf: "flex-start",
    color: "black",
    fontSize: 24
  },
  textDistance: {
    alignSelf: "flex-end"
  },
  textType: { alignSelf: "flex-start" }
});

export default HorizontallistItem;
