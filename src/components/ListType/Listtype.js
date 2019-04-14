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
      data: this.props.places,
      typeValue: "italian"
    };
  }
  componentWillMount() {
    this.getDistances();
  }

  getDistances = () => {
    const newDistances = this.props.places.map(place => {
      const itemLocation = place.location;
      const dist = geolib.getDistance(itemLocation, this.props.mylocation);
      return { ...place, dist };
    });
    const sortData = newDistances.sort((a, b) => a.dist - b.dist);
    this.setState({
      data: sortData
    });
    console.log("Location", sortData);
  };
  searchFilterFunctionType = val => {
    const newData = this.props.places.filter(item => {
      const itemData = `${item.type}`;
      const textData = val;
      console.log("thius", item);
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData
    });

    if (val == "mixt") {
      this.setState({
        data: this.props.places
      });
    }
  };

  render() {
    return (
      <View>
        <View style={styles.containerHeader}>
          <View>
            <Text style={styles.textName}>Type</Text>
            <PickedType onTypePickedProp={this.searchFilterFunctionType} />
          </View>
        </View>
        <FlatList
          style={styles.listContainer}
          data={this.state.data}
          renderItem={info => (
            <HorizontalListItem
              placeName={info.item.name}
              placeImage={info.item.image}
              placeType={info.item.type}
              placeDistance={info.item.dist / 1000}
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
    fontSize: 24,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    color: "red"
  }
});
