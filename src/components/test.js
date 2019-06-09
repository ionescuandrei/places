import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Dimensions } from "react-native";
// import MapView from "react-native-maps";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { getPlace } from "../../store/actions/index";
import NearLocation from "../../components/NearLocations/NearLocations";
import IconMap from "../../assets/AIM_AQUA.png";
class MapSearch extends Component {
  static options(passProps) {
    return {
      topBar: {
        rightButtons: {
          id: "buttonOne",
          icon: IconMap
        }
      }
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      focusedLoction: {
        latitude: 44.3077568,
        longitude: 23.7967414,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get("window").width / Dimensions.get("window").height) *
          0.0122
      },
      selectMarkerArray: [],
      locationChosen: false
    };
    Navigation.events().bindComponent(this);
    this.getLocationHandler = this.getLocationHandler.bind(this);
    this.getWithinDistance = this.getWithinDistance.bind(this);
  }
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    this.getLocationHandler();
  }
  getWithinDistance = () => {
    let latlng = {};
    let newData = null;
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
        selectedMarker.push(this.props.places[i]);
      }
    }

    this.setState({
      selectMarkerArray: selectedMarker
    });
    console.log("selcted markers", selectedMarker);
  };
  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState(prevState => {
          return {
            focusedLoction: {
              ...prevState.focusedLoction,
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          };
        });
        this.getWithinDistance();
      },
      err => {
        console.log(err);
        alert("Fetching the location faild");
      }
    );
  };
  navigationButtonPressed({ buttonId }) {
    this.getLocationHandler();
  }
  // navigationButtonPressed({ buttonTwo }) {
  //   Navigation.mergeOptions("Drawer", {
  //     sideMenu: {
  //       left: {
  //         visible: true
  //       }
  //     }
  //   });
  // }
  // itemSelectedHandler = key => {
  //   const selPlace = this.props.places.find(place => {
  //     return place.key === key;
  //   });
  //   Navigation.push("MyStack", {
  //     component: {
  //       name: "places.PlaceDetail",
  //       passProps: {
  //         text: "Pushed screen",
  //         selectedPlace: selPlace
  //       },
  //       options: {
  //         topBar: {
  //           title: {
  //             text: selPlace.name
  //           }
  //         }
  //       }
  //     }
  //   });
  // };

  render() {
    console.log("places from map", this.state.focusedLoction);
    return (
      <NearLocation
        selectedPlaces={this.state.selectMarkerArray}
        region={this.state.focusedLoction}
      />
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchButton: {
    borderColor: "orange",
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 26
  },
  textHeader: {
    fontSize: 30,
    color: "blue",
    textAlign: "center"
  }
});
const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlace())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapSearch);
