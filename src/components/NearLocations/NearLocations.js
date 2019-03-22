import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions } from "react-native";
import { connect } from "react-redux";
import MapView from "react-native-maps";

export default class NearLocations extends Component {
  state = {
    focusedLoction: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.0122
    },
    selectMarkerArray: [],
    locationChosen: false
  };
  getWithinDistance = () => {
    var selectedMarker = [];
    var lat1 = this.state.focusedLoction.latitude;
    var lon1 = this.state.focusedLoction.longitude;
    selectedMarker = this.props.places.map(place => {
      var lat2 = place.location.latitude;
      var lon2 = place.location.longitude;
      var R = 6371;
      var dLat = (lat2 - lat1) * (Math.PI / 180);
      var dLon = (lon2 - lon1) * (Math.PI / 180);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      if (d <= 2.0) {
        var latlng = {
          latitude: lat2,
          longitude: lon2
        };
      }
      this.props.onGetLocation(latlng);
      return latlng;
    });
    this.setState({
      selectMarkerArray: selectedMarker
    });
    console.log("selcted markers", selectedMarker);
  };
  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLoction,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLoction: {
          ...prevState.focusedLoction,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
  };
  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        };
        this.pickLocationHandler(coordsEvent);
        this.getWithinDistance();
      },
      err => {
        console.log(err);
        alert("Fetching the location faild");
      }
    );
  };
  render() {
    let marker = null;
    if (this.state.locationChosen) {
      marker = this.state.selectMarkerArray.map(marker => {
        return <MapView.Marker coordinate={marker} />;
      });
    }
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLoction}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => (this.map = ref)}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button
            title="Find locations near me"
            onPress={this.getLocationHandler}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: 250
  },
  button: {
    margin: 8
  }
});
