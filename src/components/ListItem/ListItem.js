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
      <View style={styles.viewRating}>
        <Text style={styles.textRating}>{props.placeRating.toFixed(1)}</Text>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>
          {props.placeName.length > 13
            ? props.placeName.slice(0, 13) + "..."
            : props.placeName}
        </Text>
        <Text>{props.placeType}</Text>
      </View>
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
  nameContainer: {
    flex: 1,
    flexDirection: "column"
    //justifyContent: "space-between"
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  distText: {
    marginLeft: 5,
    alignSelf: "flex-end"
  },
  viewRating: {
    position: "absolute",
    bottom: 80,
    right: 30,
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#258"
  },
  textRating: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 5
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
