import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  FlatList
} from "react-native";
import { Navigation } from "react-native-navigation";
import ListItem from "../../components/ListItem/ListItem";

class TopPicks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeData: [],
      ratingData: []
    };
    Navigation.events().bindComponent(this);
  }
  componentWillMount() {
    this.setState({
      typeData: this.props.places
    });
  }
  componentDidMount() {
    this.searchFilterFunctionRating();
  }
  searchFilterFunctionRating = () => {
    const newData = this.props.places.sort((item1, item2) => {
      item1 = item1.rating.value / item1.rating.count;
      item2 = item2.rating.value / item2.rating.count;
      return item1 < item2;
    });
    console.log("sortare", newData);
    this.setState({
      ratingData: newData
    });
    console.log("sortare", this.state.ratingData);
  };
  itemSelectedHandler = key => {
    const selPlace = this.props.places.find(place => {
      return place.key === key;
    });
    Navigation.push("MyStack2", {
      component: {
        name: "places.PlaceDetail",
        passProps: {
          text: "Pushed screen",
          selectedPlace: selPlace,
          mylocation: this.state.mycoordonate
        },
        options: {
          topBar: {
            title: {
              visible: false,
              drawBehind: true,
              animate: false
            }
          }
        }
      }
    });
  };

  render() {
    return (
      <View style={styles.ComponentContainer}>
        <Text style={styles.textHeader}>Topul restaurantelor</Text>
        <FlatList
          horizontal={true}
          style={styles.listContainer}
          data={this.state.ratingData}
          renderItem={info => (
            <ListItem
              placeName={info.item.name}
              placeImage={info.item.image}
              placeType={info.item.type}
              placeRating={info.item.rating.value / info.item.rating.count}
              onItemPressed={() => this.itemSelectedHandler(info.item.key)}
            />
          )}
          // ListHeaderComponent={this.renderHeader}
        />
        <Text style={styles.textHeader}>Descoperă restaurante</Text>
        <FlatList
          horizontal={true}
          style={styles.listContainer}
          data={this.state.typeData}
          renderItem={info => (
            <ListItem
              placeName={info.item.name}
              placeImage={info.item.image}
              placeType={info.item.type}
              placeRating={info.item.rating.value / info.item.rating.count}
              onItemPressed={() => this.itemSelectedHandler(info.item.key)}
            />
          )}
          // ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ComponentContainer: {
    backgroundColor: "#999"
  },
  listContainer: {
    height: 230
  },
  textHeader: {
    fontSize: 30,
    color: "#001",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5
  }
});

export default TopPicks;
