import React, { Component } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";

import HorizontalListItem from "../HorizontalListItem/HorizontalListItem";

import PickedType from "../PickedType/PickedType";
import NearLocation from "../NearLocations/NearLocations";
import geolib from "geolib";

export default class ListType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.places
    };
  }

  render() {
    return (
      <View>
        <FlatList
          style={styles.listContainer}
          data={this.state.data}
          extraData={this.state}
          renderItem={info => (
            <HorizontalListItem
              placeName={info.item.name}
              placeImage={info.item.image}
              placeType={info.item.type}
              placeRating={info.item.rating.value / info.item.rating.count}
              placeAdress={info.item.adress}
              onItemPressed={() => this.props.onItemSelected(info.item.key)}
            />
          )}
          // ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1
  },
  listContainer: {
    flex: 1
  },
  textName: {
    fontSize: 22,
    fontWeight: "600"
  },
  wrapper: {
    display: "flex"
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 21,
    paddingRight: 21
  }
});
