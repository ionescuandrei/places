import React, { Component } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import ListItem from "../ListItem/ListItem";
import HorizontalListItem from "../HorizontalListItem/HorizontalListItem";
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

  getDistances = () => {
    const newDistances = this.props.places.map(place => {
      const itemLocation = place.location;
      const dist = geolib.getDistance(itemLocation, this.props.mylocation);
      return { ...place, dist };
      console.log("thius", item);
      return itemData.indexOf(textData) > -1;
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
