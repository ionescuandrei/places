import React, { Component } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import ListItem from "../ListItem/ListItem";
import HorizontalListItem from "../HorizontalListItem/HorizontalListItem";
import { SearchBar } from "react-native-elements";
import PickedType from "../PickedType/PickedType";
<<<<<<< HEAD
import NearLocation from "../NearLocations/NearLocations";
<<<<<<< HEAD
import geolib from "geolib";
=======
=======
>>>>>>> 46d2e614fb4536d2f16e01f2589f2167d6d3d0b6
>>>>>>> 38a7d52b963a0cd776894c9b96646ee522e72ef2

export default class placeList extends Component {
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

  searchFilterFunction = text => {
    this.setState({
      value: text
    });

    const newData = this.props.places.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData
    });
<<<<<<< HEAD
  };
<<<<<<< HEAD

  getDistances = () => {
    const newDistances = this.props.places.map(place => {
      const itemLocation = place.location;
      const dist = geolib.getDistance(itemLocation, this.props.mylocation);
      return { ...place, dist };
=======
  getPlacesByLocation = loc => {
    const newData = this.props.places.filter(place => {
      const itemData = `${place.location}`;
      return itemData.indexOf(loc) > -1;
    });
    console.log("Location", loc);
    this.setState({
      data: newData
    });
  };
  searchFilterFunctionType = val => {
    const newData = this.props.places.filter(item => {
      const itemData = `${item.type}`;
      const textData = val;
=======
    console.log("thius", this.props.places);
  };
  searchFilterFunctionType = val => {
    console.log("thius", val);
    const newData = this.props.places.filter(item => {
      const itemData = `${item.type.toLowerCase()}`;
      const textData = val.toLowerCase();
>>>>>>> 46d2e614fb4536d2f16e01f2589f2167d6d3d0b6
      console.log("thius", item);
      return itemData.indexOf(textData) > -1;
>>>>>>> 38a7d52b963a0cd776894c9b96646ee522e72ef2
    });
    const sortData = newDistances.sort((a, b) => a.dist - b.dist);
    this.setState({
      data: sortData
    });
    console.log("Location", sortData);
  };

  render() {
    return (
      <View style={styles.containerHeader}>
        <View>
<<<<<<< HEAD
=======
<<<<<<< HEAD
          <Text style={styles.textName}>Location</Text>
          <NearLocation
            places={this.props.places}
            onGetLocation={this.getPlacesByLocation}
          />
=======
>>>>>>> 46d2e614fb4536d2f16e01f2589f2167d6d3d0b6
          <Text style={styles.textName}>Name</Text>
>>>>>>> 38a7d52b963a0cd776894c9b96646ee522e72ef2
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
          />
        </View>
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          style={styles.listContainer}
          data={this.state.data}
          renderItem={info => (
            <ListItem
              placeName={info.item.name}
              placeImage={info.item.image}
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
