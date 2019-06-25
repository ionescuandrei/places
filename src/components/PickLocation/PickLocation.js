import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions } from "react-native";
import MapView from "react-native-maps";
export default class PickLocation extends Component {
  componentWillMount() {
    this.reset();
  }
  reset = () => {
    this.setState({
      focusedLoction: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get("window").width / Dimensions.get("window").height) *
          0.0122
      },
      locationChosen: false
    });
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
    this.props.onLocationPicked({
      latitude: coords.latitude,
      longitude: coords.longitude
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
      marker = <MapView.Marker coordinate={this.state.focusedLoction} />;
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
          <Button title="Localizeaza-ma!" onPress={this.getLocationHandler} />
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
