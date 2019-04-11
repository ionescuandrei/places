import React, { Component } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import ListItem from "../ListItem/ListItem";
import { SearchBar } from "react-native-elements";
import PickedType from "../PickedType/PickedType";
import NearLocation from "../NearLocations/NearLocations";
import geolib from "geolib";

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
  };

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
  renderHeader = () => {
    return (
      <View>
        <View>
          <Text style={styles.textName}>Location</Text>
          <NearLocation
            places={this.props.places}
            onGetLocation={this.getPlacesByLocation}
          />
          <Text style={styles.textName}>Name</Text>
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
          />
        </View>
        <View>
          <Text style={styles.textName}>Type</Text>
          <PickedType onTypePickedProp={this.searchFilterFunctionType} />
        </View>
      </View>
    );
  };
  render() {
    return (
      <FlatList
        // horizontal
        // pagingEnabled={true}
        // showsHorizontalScrollIndicator={false}
        // legacyImplementation={false}
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
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  },
  textName: {
    fontSize: 24,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    color: "red"
  }
});
