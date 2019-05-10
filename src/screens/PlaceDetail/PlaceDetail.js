import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  Linking,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { deletePlace } from "../../store/actions/index";
import GetDirections from "../../components/Direction/getDirections";
import { Badge, AirbnbRating, Divider } from "react-native-elements";
import { updatePlace } from "../../store/actions/places";

class PlaceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: "portrait",
      rating: props.selectedPlace.rating,
      starchoose: true,
      review: {
        numeUser: "",
        count: 0,
        comment: ""
      }
    };
  }
  componentDidMount() {
    Dimensions.addEventListener("change", this.updateStyles);
    this.ratingCompleted = this.ratingCompleted.bind(this);
    console.log("this is props", this.state.rating);
  }

  placeDeletedHandler = () => {
    Dimensions.removeEventListener("change", this.updateStyles);
    this.props.onDeletePlace(this.props.selectedPlace.key);
    Navigation.pop("MyStack");
  };
  ratingCompleted(rat) {
    if (this.state.starchoose) {
      this.setState(state => {
        return {
          rating: {
            value: state.rating.value + rat,
            count: state.rating.count + 1,
            starchoose: false
          }
        };
      });
    }

    this.props.onUpdateRating(this.props.selectedPlace.key, this.state.rating);
    console.log("state", this.state.rating);
  }
  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };
  callNumber = () => {
    let phone = this.props.selectedPlace.phone;
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    console.log("value", this.state.rating.value);
    console.log("Count", this.state.rating.count);
    const score = this.state.rating.value / this.state.rating.count;
    return (
      <ScrollView style={styles.scroll}>
        <View
          style={[
            styles.container,
            this.state.viewMode === "portrait"
              ? styles.portraitContainer
              : styles.landscapeContainer
          ]}
        >
          <View>
            <Image
              source={this.props.selectedPlace.image}
              style={styles.placeImage}
            />
          </View>
          <View style={styles.subContainer}>
            <View style={styles.textContainer}>
              <View style={styles.placeNameTitle}>
                <Text style={styles.placeName}>
                  {this.props.selectedPlace.name}
                </Text>
                <Text>Cusine: {this.props.selectedPlace.type}</Text>
              </View>

              <View style={styles.badgeContaniner}>
                <Text style={styles.badge}>{score.toFixed(1)}</Text>
              </View>
            </View>
            <Divider style={{ margin: 10, backgroundColor: "#333" }} />
            <View style={styles.adressContainer}>
              <Text style={styles.adressStyle}>
                {this.props.selectedPlace.adress}
              </Text>
              <TouchableOpacity onPress={this.callNumber}>
                <View style={styles.callButton}>
                  <Icon
                    size={30}
                    name={Platform.OS === "android" ? "md-call" : "ios-call"}
                    color="blue"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <Divider style={{ margin: 10, backgroundColor: "#333" }} />
            <View>
              <AirbnbRating
                count={5}
                reviews={[
                  "Bad",
                  "Good",
                  "Very Good",
                  "Amazing",
                  "Unbelievable"
                ]}
                defaultRating={2}
                size={15}
                onFinishRating={this.ratingCompleted}
              />
            </View>
            <GetDirections
              mylocation={this.props.mylocation}
              location={this.props.selectedPlace.location}
            />

            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                  color="red"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: { height: "100%", width: "100%" },
  container: {
    display: "flex"
  },
  subContainer: {
    flex: 1,
    margin: 15
  },
  portraitContainer: {
    flexDirection: "column"
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  placeImage: {
    width: 500,
    height: 250
  },
  placeNameTitle: {
    alignItems: "flex-start"
  },
  badgeContaniner: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 30,
    width: 40,
    borderRadius: 10,
    backgroundColor: "#258",
    alignSelf: "flex-start"
  },
  badge: { fontSize: 18 },
  placeName: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 28
  },
  adressStyle: {
    fontSize: 20,
    fontFamily: "Times New Roman"
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
    flexDirection: "row"
  },
  deleteButton: {
    alignItems: "center"
  },
  adressContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key)),
    onUpdateRating: (key, rating) => dispatch(updatePlace(key, rating))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PlaceDetail);
