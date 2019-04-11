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

import PlaceList from "../../components/PlaceList/PlaceList";
class FindPlaces extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: "Finder",
          fontSize: 25,
          color: "#039BE5",
          fontFamily: "Helvetica",
          alignment: "center"
        }
      }
    };
  }
  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0),
    mycoordonate: null
  };
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }
  componentDidMount() {
    this.props.onLoadPlaces();
  }
  componentDidAppear() {
    this.props.onLoadPlaces();
    this.getLocationHandler();
  }
  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.setState(prevState => {
      return {
        mycoordonate: {
          ...prevState.mycoordonate,
          latitude: coords.latitude,
          longitude: coords.longitude
        }
      };
    });
    console.log("My curent location is", this.state.mycoordonate.latitude);
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
  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    });
  };
  render() {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.placesLoaded) {
      content = (
        <Animated.View
          style={{
            opacity: this.state.placesAnim
          }}
        >
          <ScrollView>
            <Text style={styles.textHeader}>Search Restaurants by:</Text>
            <PlaceList
              places={this.props.places}
              onItemSelected={this.itemSelectedHandler}
              mylocation={this.state.mycoordonate}
            />
          </ScrollView>
        </Animated.View>
      );
    }
    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
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
    color: "#039BE5",
    textAlign: "center",
    paddingTop: 15
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
)(FindPlaces);
