import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { getPlace } from "../../store/actions/index";
import NearLocation from "../../components/NearLocations/NearLocations";

class MapSearch extends Component {
  constructor(props) {
    super(props);
  }

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

  navigationButtonPressed({ buttonTwo }) {
    Navigation.mergeOptions("Drawer", {
      sideMenu: {
        left: {
          visible: true
        }
      }
    });
  }
  itemSelectedHandler = key => {
    const selPlace = this.props.places.find(place => {
      return place.key === key;
    });
    Navigation.push("MyStack", {
      component: {
        name: "places.PlaceDetail",
        passProps: {
          text: "Pushed screen",
          selectedPlace: selPlace
        },
        options: {
          topBar: {
            title: {
              text: selPlace.name
            }
          }
        }
      }
    });
  };

  render() {
    return (
      <NearLocation
        places={this.props.places}
        onGetLocation={this.getPlacesByLocation}
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
