import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import ListItem from "../ListItem/ListItem";
import HorizontalListItem from "../HorizontalListItem/HorizontalListItem";
import { SearchBar } from "react-native-elements";
import PickedType from "../PickedType/PickedType";
import NearLocation from "../NearLocations/NearLocations";
import geolib from "geolib";
import Icon from "react-native-vector-icons/FontAwesome";

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
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
          />
        </View>
        <View style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Go out for launch or dinner</Text>
            <TouchableOpacity style={styles.seeAllBtn}>
              <Text style={styles.seeAllBtnText}>See all</Text>
              <Icon name="angle-right" size={18} />
            </TouchableOpacity>
          </View>
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
  },
  title: {
    fontSize: 22,
    fontWeight: "600"
  },
  seeAllBtn: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  seeAllBtnText: {
    color: "grey",
    marginRight: 5
  },
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
