import React, { Component } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import ListItem from "../ListItem/ListItem";
import { SearchBar } from "react-native-elements";
import PickedType from "../PickedType/PickedType";
<<<<<<< HEAD
import NearLocation from "../NearLocations/NearLocations";
=======
>>>>>>> 46d2e614fb4536d2f16e01f2589f2167d6d3d0b6

export default class placeList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.places, typeValue: "italian" };
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
<<<<<<< HEAD
          <Text style={styles.textName}>Location</Text>
          <NearLocation
            places={this.props.places}
            onGetLocation={this.getPlacesByLocation}
          />
=======
>>>>>>> 46d2e614fb4536d2f16e01f2589f2167d6d3d0b6
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
        style={styles.listContainer}
        data={this.state.data}
        renderItem={info => (
          <ListItem
            placeName={info.item.name}
            placeImage={info.item.image}
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
    color: "red"
  }
});
