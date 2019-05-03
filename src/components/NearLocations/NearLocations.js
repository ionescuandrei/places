import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions } from "react-native";
import MapView from "react-native-maps";
<<<<<<< HEAD

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
    let latlng = {};
    var selectedMarker = [];
    var lat1 = this.state.focusedLoction.latitude;
    var lon1 = this.state.focusedLoction.longitude;

    for (var i = 0; i < this.props.places.length; i++) {
      var lat2 = this.props.places[i].location.latitude;
      var lon2 = this.props.places[i].location.longitude;
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
        latlng = {
          latitude: lat2,
          longitude: lon2
        };
        selectedMarker.push(latlng);
        this.props.onGetLocation(latlng);
      }
    }

    this.setState({
      selectMarkerArray: selectedMarker
    });
    console.log("selcted markers", selectedMarker);
  };
=======
export default class NearLocations extends Component {
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
  //   getWithinDistance=()=>{
  //     var selectedMarker = [];
  //     var lat1 = this.state.region.latitude;
  //     var lon1 = this.state.region.longitude;
  //     for(var i = 0 ; i <= 3 ; i++)
  //       {
  //       var lat2 = this.state.a[i].latitude;
  //       var lon2 = this.state.a[i].longitude;
  //       var R = 6371;
  //       var dLat = (lat2-lat1) * (Math.PI/180);
  //       var dLon = (lon2-lon1) * (Math.PI/180);
  //       var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos((lat1) * (Math.PI/180)) * Math.cos((lat2) * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  //       var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //       var d = R * c;
  //       if(d <= 2.00){
  //         var latlng = {
  //           latitude: lat2,
  //           longitude: lon2
  //         }
  //         selectedMarker.push(latlng);
  //       }
  //       }
  //       console.log(selectedMarker);
  //       var at = selectedMarker.map(marker => {
  //         return(
  //           <MapView.Marker coordinate={marker.latlng} />
  //         );
  //       })

  //   }
>>>>>>> 46d2e614fb4536d2f16e01f2589f2167d6d3d0b6
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
<<<<<<< HEAD
=======
    this.props.onLocationPicked({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
>>>>>>> 46d2e614fb4536d2f16e01f2589f2167d6d3d0b6
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
<<<<<<< HEAD
        this.getWithinDistance();
=======
>>>>>>> 46d2e614fb4536d2f16e01f2589f2167d6d3d0b6
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
<<<<<<< HEAD
      marker = this.state.selectMarkerArray.map(marker => {
        return (
          <MapView.Marker
            coordinate={marker}
            title={marker.latitude.toString()}
          />
        );
      });
=======
      marker = <MapView.Marker coordinate={this.state.focusedLoction} />;
>>>>>>> 46d2e614fb4536d2f16e01f2589f2167d6d3d0b6
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
<<<<<<< HEAD
=======
const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};
export default connect(
    mapStateToProps,
    null
  )(NearLocations);
>>>>>>> 46d2e614fb4536d2f16e01f2589f2167d6d3d0b6
