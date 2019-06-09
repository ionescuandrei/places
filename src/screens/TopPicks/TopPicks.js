import React, { Component } from "react";
import { View, Text } from "react-native";
import ListType from "../../components/ListType/Listtype";

export default class TopPicks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log("din pick", this.props.places);
  }
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
      <View>
        <Text> TopPicks </Text>
        <ListType
          places={this.props.places}
          onItemSelected={this.itemSelectedHandler}
        />
      </View>
    );
  }
}
