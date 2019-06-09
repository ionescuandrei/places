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
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <View>
          <Text style={styles.textName}>{props.placeName}</Text>
          <Text style={styles.textType}>Specific: {props.placeType}</Text>
        </View>
        <Text style={styles.textAdress}> {props.placeAdress}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.viewRating}>
          <Text style={styles.textRating}>{props.placeRating.toFixed(1)}</Text>
        </View>
      </View>
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
  textAdress: {
    fontSize: 15
  },
  placeImage: {
    marginRight: 8,
    height: 100,
    width: 100
  },
  textName: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24
  },
  ratingContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  viewRating: {
    justifyContent: "center",
    alignItems: "center",
    // bottom: 45,
    // right: 30,
    marginRight: 5,
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#258",
    alignSelf: "flex-end"
  },
  textRating: {
    // fontSize: 15,
    // textAlign: "center",
    // marginTop: 5
  },
  textDistance: { alignSelf: "flex-end" },
  textType: { fontStyle: "italic" }
});

export default HorizontallistItem;
