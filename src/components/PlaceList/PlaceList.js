import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Picker
} from "react-native";
import HorizontalListItem from "../HorizontalListItem/HorizontalListItem";
import { SearchBar } from "react-native-elements";
import PickedType from "../PickedType/PickedType";

import geolib from "geolib";

export default class placeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataSorted: [],
      typeValue: "mixt",
      tipSortare: "distanta"
    };
    this.getDistances = this.getDistances.bind(this);
    this.onTypePicked = this.onTypePicked.bind(this);
  }
  componentWillMount() {
    const sortData = this.getDistances();
    this.setState({ dataSorted: sortData, data: sortData });
  }
  componentDidMount() {
    const sortData = this.getDistances();
    this.setState({ dataSorted: sortData, data: sortData });
  }
  searchFilterFunctionRating = () => {
    let newData = [...this.state.dataSorted];

    let a = newData.sort((item1, item2) => {
      let i1 = (item1.rating.value * 1.1) / item1.rating.count;
      let i2 = (item2.rating.value * 1.1) / item2.rating.count;
      return i2 - i1;
    });
    return a;
  };

  searchFilterFunctionType = val => {
    const newData = this.state.dataSorted.filter(item => {
      const itemData = `${item.type}`;
      const textData = val;
      return itemData.indexOf(textData) > -1;
    });

    if (val == "mixt") {
      this.setState(state => ({
        data: state.dataSorted
      }));
    } else {
      this.setState({
        data: newData
      });
    }
  };
  searchFilterFunction = text => {
    const newData = this.state.dataSorted.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      value: text,
      data: newData
    });
  };
  onTypePicked = (itemValue, itemIndex) => {
    let sortedData = null;
    if (itemValue === "rating") {
      sortedData = this.searchFilterFunctionRating();
    } else {
      sortedData = this.getDistances();
    }
    this.setState({
      tipSortare: itemValue,
      dataSorted: sortedData,
      data: sortedData
    });
  };
  getDistances = () => {
    const newDistances = this.props.places.map(place => {
      const itemLocation = place.location;
      const dist = geolib.getDistance(itemLocation, this.props.mylocation);
      return { ...place, dist };
    });
    const sortData = newDistances.sort((a, b) => a.dist - b.dist);

    return sortData;
  };

  render() {
    return (
      <View style={styles.containerHeader}>
        <View>
          <SearchBar
            placeholder="Caută după nume..."
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
          />
        </View>
        <View style={styles.containerHeader}>
          <PickedType onTypePickedProp={this.searchFilterFunctionType} />
        </View>
        <View style={styles.ratingCont}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Sorteză după</Text>
          <Picker
            selectedValue={this.state.tipSortare}
            style={{ height: 50, width: 150, marginLeft: 40 }}
            onValueChange={this.onTypePicked}
          >
            <Picker.Item label="distanta" value="distanta" />
            <Picker.Item label="rating" value="rating" />
          </Picker>
          <Text />
        </View>

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
  ratingCont: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 25
  },
  containerHeader: {
    paddingTop: 1
  }
});
